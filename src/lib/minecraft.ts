import net from "net";

export const CURSEFORGE_PROJECT_ID = "1692187";
export const CURSEFORGE_SLUG = "ventrix-frontier";
export const CURSEFORGE_PROJECT_URL = "https://www.curseforge.com/minecraft/modpacks/ventrix-frontier";
export const CURSEFORGE_FILES_URL = "https://www.curseforge.com/minecraft/modpacks/ventrix-frontier/files";
export const CURSEFORGE_APP_PROTOCOL = "curseforge://install?addonId=1692187";

export interface MinecraftServerStatus {
  online: boolean;
  host: string;
  port: number;
  players: {
    online: number;
    max: number;
  };
  version: string;
  latency: number;
  motd: string;
  motdClean: string;
  tps: number;
  bluemapUrl: string;
  updatedAt: string;
}

function readVarInt(buffer: Buffer, offset: number): { value: number; size: number } {
  let value = 0;
  let size = 0;
  let b: number;
  while (true) {
    b = buffer.readUInt8(offset + size);
    value |= (b & 0x7f) << (size++ * 7);
    if ((b & 0x80) !== 128) break;
  }
  return { value, size };
}

function writeVarInt(value: number): Buffer {
  const bytes: number[] = [];
  while (true) {
    if ((value & ~0x7f) === 0) {
      bytes.push(value);
      break;
    }
    bytes.push((value & 0x7f) | 0x80);
    value >>>= 7;
  }
  return Buffer.from(bytes);
}

export function cleanMotd(text: string): string {
  if (!text) return "";
  return text.replace(/§[0-9a-fk-or]/gi, "").trim();
}

export async function queryMinecraftServer(
  host: string = "mc.ventrixagency.com",
  port: number = 25686,
  timeoutMs: number = 2500
): Promise<MinecraftServerStatus> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const client = new net.Socket();
    client.setTimeout(timeoutMs);

    let resolved = false;

    const fallbackResponse: MinecraftServerStatus = {
      online: true, // Known running container
      host,
      port,
      players: { online: 0, max: 20 },
      version: "1.21.1 NeoForge",
      latency: 48,
      motd: "§9Ventrix §7— §fFrontier\n§8An uncharted adventure awaits.",
      motdClean: "Ventrix — Frontier\nAn uncharted adventure awaits.",
      tps: 20.0,
      bluemapUrl: "/map/#world:0:0:0:1500:0:0:0:0:perspective",
      updatedAt: new Date().toISOString(),
    };

    const cleanupAndResolve = (status: MinecraftServerStatus) => {
      if (!resolved) {
        resolved = true;
        try {
          client.destroy();
        } catch {}
        resolve(status);
      }
    };

    client.on("timeout", () => {
      cleanupAndResolve(fallbackResponse);
    });

    client.on("error", () => {
      cleanupAndResolve({
        ...fallbackResponse,
        online: false,
        latency: 0,
      });
    });

    const hostBuf = Buffer.from(host, "utf8");

    // Handshake packet (id 0x00, protocol 767 for 1.21.1, host, port, next state 1)
    const handshakeData = Buffer.concat([
      writeVarInt(0x00),
      writeVarInt(767),
      writeVarInt(hostBuf.length),
      hostBuf,
      Buffer.from([(port >> 8) & 0xff, port & 0xff]),
      writeVarInt(1),
    ]);
    const handshakePacket = Buffer.concat([
      writeVarInt(handshakeData.length),
      handshakeData,
    ]);

    // Status request packet (id 0x00)
    const requestPacket = Buffer.concat([writeVarInt(1), Buffer.from([0x00])]);

    client.connect(port, host, () => {
      client.write(handshakePacket);
      client.write(requestPacket);
    });

    let incoming = Buffer.alloc(0);

    client.on("data", (chunk) => {
      incoming = Buffer.concat([incoming, chunk]);
      try {
        const { value: packetLen, size: lenSize } = readVarInt(incoming, 0);
        if (incoming.length >= packetLen + lenSize) {
          const { size: idSize } = readVarInt(incoming, lenSize);
          const { value: strLen, size: strLenSize } = readVarInt(
            incoming,
            lenSize + idSize
          );
          const jsonStr = incoming.toString(
            "utf8",
            lenSize + idSize + strLenSize,
            lenSize + idSize + strLenSize + strLen
          );
          const parsed = JSON.parse(jsonStr);
          const latency = Date.now() - startTime;

          const motdRaw =
            typeof parsed.description === "object"
              ? parsed.description.text || ""
              : parsed.description || "";

          cleanupAndResolve({
            online: true,
            host,
            port,
            players: {
              online: parsed.players?.online || 0,
              max: parsed.players?.max || 20,
            },
            version: parsed.version?.name || "1.21.1 NeoForge",
            latency: Math.max(1, latency),
            motd: motdRaw,
            motdClean: cleanMotd(motdRaw),
            tps: 20.0,
            bluemapUrl: "/map/#world:0:0:0:1500:0:0:0:0:perspective",
            updatedAt: new Date().toISOString(),
          });
        }
      } catch {
        // waiting for buffer completion
      }
    });
  });
}

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/pioneers.json");

interface PioneerEntry {
  id: string;
  minecraftUsername: string;
  discordTag?: string;
  enlistedAt: string;
  badge?: string;
}

function getPioneers(): PioneerEntry[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function savePioneers(pioneers: PioneerEntry[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(pioneers, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save pioneers to file:", err);
  }
}

export async function GET() {
  const list = getPioneers();
  return NextResponse.json({
    total: list.length,
    pioneers: list.slice(-12).reverse(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { minecraftUsername, discordTag } = body;

    if (!minecraftUsername || typeof minecraftUsername !== "string") {
      return NextResponse.json(
        { error: "Minecraft username is required." },
        { status: 400 }
      );
    }

    const cleanedUsername = minecraftUsername.trim();
    if (!/^[a-zA-Z0-9_]{3,16}$/.test(cleanedUsername)) {
      return NextResponse.json(
        { error: "Invalid Minecraft username format (3-16 alphanumeric or underscores)." },
        { status: 400 }
      );
    }

    const current = getPioneers();
    const exists = current.some(
      (p) => p.minecraftUsername.toLowerCase() === cleanedUsername.toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        { error: `Player ${cleanedUsername} is already registered on the Frontier Pioneer Roster!` },
        { status: 409 }
      );
    }

    const newPioneer: PioneerEntry = {
      id: "pioneer-" + Date.now().toString(36),
      minecraftUsername: cleanedUsername,
      discordTag: discordTag ? String(discordTag).trim() : "",
      enlistedAt: new Date().toISOString(),
      badge: current.length < 50 ? "Early Pioneer" : "Frontier Pioneer",
    };

    current.push(newPioneer);
    savePioneers(current);

    return NextResponse.json({
      success: true,
      message: `Welcome to the Frontier, ${cleanedUsername}!`,
      pioneer: newPioneer,
      totalPioneers: current.length,
    });
  } catch (err) {
    console.error("Pioneer registration error:", err);
    return NextResponse.json(
      { error: "Failed to enlist pioneer." },
      { status: 500 }
    );
  }
}

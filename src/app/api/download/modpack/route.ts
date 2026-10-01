import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const localZipPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    "VENTRIX-Modpack-3.0.2-Frontier-cf.zip"
  );

  const fallbackPath =
    "/Users/ish/Documents/Ventrix Minecraft/release/curseforge/VENTRIX-Modpack-3.0.2-Frontier-cf.zip";

  const targetPath = fs.existsSync(localZipPath)
    ? localZipPath
    : fs.existsSync(fallbackPath)
    ? fallbackPath
    : null;

  if (!targetPath) {
    // If local file is somehow missing, redirect to CurseForge project files
    return NextResponse.redirect(
      "https://www.curseforge.com/minecraft/modpacks/1692187/files",
      302
    );
  }

  const stat = fs.statSync(targetPath);
  const stream = fs.createReadStream(targetPath);

  // Return standard streaming response
  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition":
        'attachment; filename="VENTRIX-Modpack-3.0.2-Frontier-cf.zip"',
      "Content-Length": stat.size.toString(),
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

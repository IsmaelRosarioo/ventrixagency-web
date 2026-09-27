import { NextResponse } from "next/server";
import { queryMinecraftServer } from "@/lib/minecraft";

export const revalidate = 30; // ISR cache for 30s

export async function GET() {
  const host = process.env.NEXT_PUBLIC_MC_SERVER_HOST || "mc.ventrixagency.com";
  const port = parseInt(process.env.NEXT_PUBLIC_MC_SERVER_PORT || "25686", 10);

  const status = await queryMinecraftServer(host, port, 2500);

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}

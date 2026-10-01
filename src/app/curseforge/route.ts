import { NextResponse } from "next/server";
import { CURSEFORGE_PROJECT_URL } from "@/lib/minecraft";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.redirect(CURSEFORGE_PROJECT_URL, 307);
}

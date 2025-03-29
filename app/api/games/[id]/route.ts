import { NextRequest, NextResponse } from "next/server";
import { fetchGameById } from "@/lib/odds-api";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In Next.js 15, we need to await the params object
    const awaitedParams = await params;

    // Ensure params.id is a string before using it
    if (!awaitedParams || typeof awaitedParams.id !== "string") {
      return NextResponse.json({ error: "Invalid game ID" }, { status: 400 });
    }

    const id = awaitedParams.id;
    const game = await fetchGameById(id);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    console.error("API error in games/[id] route:", error);
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 }
    );
  }
}

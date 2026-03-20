import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Each response gets its own blob with a timestamp filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `responses/${timestamp}.json`;

    await put(filename, JSON.stringify(body, null, 2), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to save response" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "responses/" });
    const responses = await Promise.all(
      blobs.map(async (blob) => {
        const res = await fetch(blob.url);
        return res.json();
      })
    );
    return NextResponse.json(responses);
  } catch {
    return NextResponse.json([]);
  }
}

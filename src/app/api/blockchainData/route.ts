import { NextResponse } from "next/server";

export async function GET() {
  const maxRetries = 3; // Set the maximum retry attempts
  const retryDelay = 1000; // Delay between retries in milliseconds
  let attempt = 0;
  let data;

  while (attempt < maxRetries) {
    try {
      const rawData = await fetch(
        "https://api.socialverseapp.com/admin/dashboard",
        { method: "GET" }
      );

      if (!rawData.ok) {
        throw new Error(`Error: ${rawData.status} ${rawData.statusText}`);
      }

      data = await rawData.json();
      return NextResponse.json(
        { user: data.dashboard.blockchainMetrics, ok: true },
        { status: 200 }
      );
    } catch (error) {
      attempt++;

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        return NextResponse.json({ error: error, ok: false }, { status: 400 });
      }
    }
  }
}
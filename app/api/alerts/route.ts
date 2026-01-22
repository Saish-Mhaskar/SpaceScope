import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    alerts: [
      "Perseid peak approaching in 4 hours",
      "Minor geomagnetic storm detected (G1)",
      "Aurora visibility improving at high latitudes",
      "Satellite drag slightly elevated",
    ],
  })
}

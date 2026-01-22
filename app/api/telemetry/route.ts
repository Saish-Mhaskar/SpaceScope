import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    solarFlux: { value: 148, change: "+6%" },
    kpIndex: { value: 4, status: "Stable" },
    auroraProbability: { value: "38%", change: "+12%" },
    meteorRate: { value: "65/hr", trend: "Rising" },
    cloudCover: "18%",
    moonIllumination: "42%",
    seeingConditions: "Good",
    lightPollution: "Moderate",
  })
}

import { NextResponse } from "next/server"

const NASA_KEY = process.env.NASA_API_KEY
const BASE = "https://api.nasa.gov/DONKI"

export async function GET() {
  try {
    const startDate = "2026-01-01"
    const endDate = "2026-01-31"

    /* ---------- FETCH SOLAR FLARES ---------- */
    const flrRes = await fetch(
      `${BASE}/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_KEY}`
    )
    const flares = await flrRes.json()

    const latestFlare = flares?.[0]

    /* ---------- FETCH GEOMAGNETIC STORMS (KP) ---------- */
    const gstRes = await fetch(
      `${BASE}/GST?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_KEY}`
    )
    const storms = await gstRes.json()

    const latestStorm = storms?.[0]
    const kp = latestStorm?.kpIndex?.[0]?.kpIndex ?? 0

    /* ---------- BUILD EVENTS (ONE CARD EACH) ---------- */
    const events = []

    if (latestFlare) {
      events.push({
        title: `Solar Flare (${latestFlare.classType})`,
        status:
          latestFlare.classType.startsWith("X")
            ? "Severe"
            : latestFlare.classType.startsWith("M")
            ? "Moderate"
            : "Low",
        description:
          "Solar flare detected from the Sun affecting space weather.",
        visibility: "Moderate",
        region: latestFlare.sourceLocation,
        peak: new Date(latestFlare.peakTime).toUTCString(),
      })
    }

    if (latestStorm) {
      events.push({
        title: "Aurora Activity",
        status: kp >= 5 ? "High" : kp >= 3 ? "Moderate" : "Low",
        description: "Auroral activity driven by geomagnetic conditions.",
        visibility: kp >= 4 ? "High" : "Low",
        region: "High Latitudes",
        peak: "Tonight",
      })
    }

    /* ---------- STATIC (UNTIL REAL API EXISTS) ---------- */
    events.push({
      title: "Perseid Meteor Shower",
      status: "Upcoming",
      description: "Annual meteor shower with high visibility.",
      visibility: "High",
      region: "Northern Hemisphere",
      peak: "August",
    })

    events.push({
      title: "Planetary Conjunction",
      status: "Upcoming",
      description: "Visible alignment of two planets in the night sky.",
      visibility: "Good",
      region: "Global",
      peak: "This Week",
    })

    /* ---------- STATS ---------- */
    const stats = {
      activeEvents: events.filter(e => e.status !== "Upcoming").length,
      upcomingEvents: events.filter(e => e.status === "Upcoming").length,
      skyVisibility: kp >= 4 ? "Good" : "Moderate",
      alertLevel:
        kp >= 5 ? "Severe" : kp >= 3 ? "Moderate" : "Low",
    }

    return NextResponse.json({
      tonightStats: [
        { label: "Active Events", value: String(stats.activeEvents) },
        { label: "Upcoming Events", value: String(stats.upcomingEvents) },
        { label: "Sky Visibility", value: stats.skyVisibility },
        { label: "Alert Level", value: stats.alertLevel },
      ],
      skyEvents: events,
      telemetryStats: [
        { label: "Kp Index", value: String(kp), trend: kp >= 4 ? "High" : "Low" },
        { label: "Aurora Probability", value: `${kp * 10}%`, trend: "Based on Kp" },
      ],
      spaceWeatherDetails: [
        `Geomagnetic Index (Kp): ${kp}`,
        "Solar wind: Normal",
      ],
      recentAlerts: [
        kp >= 5
          ? "Strong geomagnetic storm detected"
          : "No severe space weather alerts",
      ],
    })
  } catch (err) {
    return NextResponse.json({ error: "Failed to load sky events" }, { status: 500 })
  }
}

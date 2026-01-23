import { NextResponse } from "next/server"

const NASA_API_KEY = process.env.NASA_API_KEY

export async function GET() {
  try {
    /* ================= WILDFIRES (NASA FIRMS) ================= */

    const firesRes = await fetch(
      `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${NASA_API_KEY}/VIIRS_SNPP_NRT/world/1`,
      { cache: "no-store" }
    )

    const firesText = await firesRes.text()
    const fireRows = firesText
      .split("\n")
      .filter(r => r.match(/^-?\d+(\.\d+)?/))

    const activeWildfires = fireRows.length

    const recentFireEvents = fireRows.slice(0, 3).map(row => {
      const cols = row.split(",")
      return `🔥 Wildfire detected at ${cols[0]}, ${cols[1]} — ${cols[5]}`
    })

    /* ================= FLOODS (NASA EONET) ================= */

    const floodsRes = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?category=floods&status=open",
      { cache: "no-store" }
    )

    const floodsData = await floodsRes.json()
    const floodAlerts = floodsData.events?.length ?? 0

    /* ================= STORMS (NASA EONET) ================= */

    const stormsRes = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?category=severeStorms&status=open",
      { cache: "no-store" }
    )

    const stormsData = await stormsRes.json()
    const activeStorms = stormsData.events?.length ?? 0

    const recentStormEvents = (stormsData.events || [])
      .slice(0, 3)
      .map((e: any) => `🌪 ${e.title}`)

    /* ================= TEMPERATURE (NASA GISS) ================= */

    const tempRes = await fetch(
      "https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv",
      { cache: "no-store" }
    )

    const tempText = await tempRes.text()

    // 🔥 IMPORTANT: keep ONLY rows starting with a year
    const tempRows = tempText
      .split("\n")
      .filter(row => /^\d{4},/.test(row))

    let tempAnomaly = "N/A"

    // Walk backwards → latest valid month
    for (let i = tempRows.length - 1; i >= 0; i--) {
      const cols = tempRows[i].split(",")

      for (let m = 12; m >= 1; m--) {
        const val = cols[m]
        if (val && val !== "***") {
          tempAnomaly = `+${parseFloat(val).toFixed(2)}°C`
          break
        }
      }

      if (tempAnomaly !== "N/A") break
    }

    /* ================= RESPONSE ================= */

    return NextResponse.json({
      impactStats: [
        {
          label: "Active Wildfires",
          value: activeWildfires.toLocaleString(),
          trend: "Live",
        },
        {
          label: "Flood Alerts",
          value: floodAlerts.toLocaleString(),
          trend: "Live",
        },
        {
          label: "Storm Systems",
          value: activeStorms.toLocaleString(),
          trend: "Live",
        },
        {
          label: "Avg Temp Anomaly",
          value: tempAnomaly,
          trend: "NASA GISS",
        },
        {
          label: "CO₂ Concentration",
          value: "421 ppm",
          trend: "Record High",
        },
      ],

      recentEvents: [
        ...recentFireEvents,
        ...recentStormEvents,
        "🌊 Flood events detected via NASA EONET",
      ],

      tabInsights: {
        Climate: [
          "Global temperature anomaly sourced from NASA GISS",
          "Polar ice loss accelerating",
          "Oceans absorbing record heat levels",
        ],
        Disasters: [
          "Wildfire activity detected via NASA FIRMS",
          "Flood events detected via NASA EONET",
          "Storm systems detected via NASA EONET",
        ],
        Agriculture: [
          "Crop stress detected in arid zones",
          "Vegetation health improving in temperate regions",
          "Satellite NDVI monitoring active",
        ],
        Pollution: [
          "Urban air quality declining in megacities",
          "CO₂ emissions at record levels",
          "Satellite aerosol tracking enabled",
        ],
        Infrastructure: [
          "Flood-prone infrastructure under observation",
          "Coastal erosion affecting ports",
          "Urban heat island effects increasing",
        ],
      },
    })
  } catch (error) {
    console.error("Earth Impact API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch Earth impact data" },
      { status: 500 }
    )
  }
}

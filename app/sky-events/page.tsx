"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Starfield } from "@/components/starfield"

/* ================= TYPES ================= */

type SkyEvent = {
  title: string
  status: string
  description: string
  visibility: string
  region: string
  peak: string
}

type Stat = {
  label: string
  value: string
  trend?: string
}

type SkyEventsData = {
  tonightStats: Stat[]
  skyEvents: SkyEvent[]
  telemetryStats: Stat[]
  spaceWeatherDetails: string[]
  recentAlerts: string[]
}

/* ================= IMAGE RESOLVER ================= */

function getEventImage(title: string) {
  const t = title.toLowerCase()

  if (t.includes("solar flare")) return "/space/solar-flare.jpg"
  if (t.includes("aurora")) return "/space/aurora.jpg"
  if (t.includes("meteor") || t.includes("perseid")) return "/space/perseid.jpg"
  if (t.includes("conjunction")) return "/space/conjunction.jpg"

  return "/space/solar-flare.jpg" // safe fallback
}

/* ================= SMALL COMPONENT ================= */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass card-hover rounded-xl p-4 text-center">
      <p className="text-xs text-white/60 mb-1">{label}</p>
      <p className="text-lg font-semibold text-cyan-300">{value}</p>
    </div>
  )
}

/* ================= PAGE ================= */

export default function SkyEventsPage() {
  const [alertsEnabled, setAlertsEnabled] = useState(false)
  const [data, setData] = useState<SkyEventsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/sky-events")
      .then((res) => res.json())
      .then((json: SkyEventsData) => {
        setData(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading sky data…
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />
      <Navigation />

      <div className="relative px-6 py-16 pt-24 text-white">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h1 className="text-4xl font-semibold mb-2 text-glow">
            Sky Events
          </h1>
          <p className="text-white/70 max-w-2xl">
            Track ongoing and upcoming celestial events and space weather
            conditions affecting Earth.
          </p>
        </motion.div>

        {/* Tonight at a Glance */}
        <div className="max-w-6xl mx-auto grid sm:grid-cols-4 gap-4 mb-12">
          {data.tonightStats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>

        {/* Events Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {data.skyEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ delay: 0.08 * i }}
              className="relative overflow-hidden rounded-xl glass card-hover group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-110
                           group-hover:scale-125 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${getEventImage(event.title)})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90" />

              {/* Content */}
              <div className="relative p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300">
                    {event.status}
                  </span>
                </div>

                <p className="text-sm text-white/70 mb-3">
                  {event.description}
                </p>

                <div className="text-xs text-white/50 space-y-1">
                  <p>Visibility: {event.visibility}</p>
                  <p>Region: {event.region}</p>
                  <p>Peak: {event.peak}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Sky Telemetry */}
        <div className="max-w-6xl mx-auto mt-12">
          <h3 className="text-lg font-medium mb-4">Live Sky Telemetry</h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {data.telemetryStats.map((stat) => (
              <div
                key={stat.label}
                className="glass card-hover rounded-xl p-4"
              >
                <p className="text-xs text-white/60 mb-1">{stat.label}</p>
                <p className="text-xl font-semibold text-cyan-300">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50">{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="max-w-6xl mx-auto mt-12 glass card-hover rounded-xl p-6">
          <h3 className="text-lg font-medium mb-3">Recent Sky Alerts</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {data.recentAlerts.map((alert) => (
              <li key={alert}>• {alert}</li>
            ))}
          </ul>
        </div>

        {/* Bottom Panels */}
        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass card-hover rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Space Weather</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {data.spaceWeatherDetails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="glass card-hover rounded-xl p-6">
            <h3 className="text-lg font-medium mb-3">Night Alerts</h3>
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`w-full py-2 rounded-lg font-medium transition ${
                alertsEnabled
                  ? "bg-cyan-400 text-black glow-primary"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {alertsEnabled ? "Alerts Enabled" : "Enable Alerts"}
            </button>
          </div>

          <div className="glass card-hover rounded-xl p-6 border-dashed border-cyan-400/30">
            <h3 className="text-lg font-medium mb-2">AI Forecast</h3>
            <p className="text-sm text-white/60">Coming soon</p>
          </div>
        </div>
      </div>
    </main>
  )
}

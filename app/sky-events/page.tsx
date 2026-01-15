"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Starfield } from "@/components/starfield"

/* ================= MOCK DATA ================= */

const skyEvents = [
  {
    title: "Perseid Meteor Shower",
    status: "Active",
    description: "Peak visibility tonight after midnight.",
    visibility: "High",
    region: "Northern Hemisphere",
    peak: "In 4h 32m",
    image: "/space/perseid.jpg",
  },
  {
    title: "Solar Flare (M‑Class)",
    status: "Moderate",
    description: "Possible radio disruptions at high latitudes.",
    visibility: "Moderate",
    region: "Polar Regions",
    peak: "Ongoing",
    image: "/space/solar-flare.jpg",
  },
  {
    title: "Aurora Activity",
    status: "Low",
    description: "Visible near polar regions.",
    visibility: "Low",
    region: "High Latitudes",
    peak: "Tonight",
    image: "/space/aurora.jpg",
  },
  {
    title: "Planetary Conjunction",
    status: "Upcoming",
    description: "Mars and Jupiter align later this week.",
    visibility: "Good",
    region: "Global",
    peak: "Tomorrow Night",
    image: "/space/conjunction.jpg",
  },
]

const tonightStats = [
  { label: "Active Events", value: "2" },
  { label: "Upcoming Events", value: "2" },
  { label: "Sky Visibility", value: "Good" },
  { label: "Alert Level", value: "Moderate" },
]

const telemetryStats = [
  { label: "Solar Flux", value: "148 sfu", trend: "+6%" },
  { label: "Kp Index", value: "4", trend: "Stable" },
  { label: "Aurora Probability", value: "38%", trend: "+12%" },
  { label: "Meteor Rate", value: "65/hr", trend: "Rising" },
]

const visibilityMetrics = [
  { label: "Cloud Cover", value: "18%" },
  { label: "Moon Illumination", value: "42%" },
  { label: "Seeing Conditions", value: "Good" },
  { label: "Light Pollution", value: "Moderate" },
]

const spaceWeatherDetails = [
  "☀️ Solar Activity: Moderate",
  "🧲 Geomagnetic Storm: G1",
  "📡 Radio Blackout Risk: Low",
  "🌍 Satellite Drag: Normal",
  "🛰 ISS Orbit Stability: Stable",
]

const recentAlerts = [
  "☄️ Perseid peak approaching in 4 hours",
  "⚠️ Minor geomagnetic storm detected (G1)",
  "✨ Aurora visibility improving at high latitudes",
  "🛰 Satellite drag slightly elevated",
]

/* ================= PAGE ================= */

export default function SkyEventsPage() {
  const [alertsEnabled, setAlertsEnabled] = useState(false)

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
          {tonightStats.map(stat => (
            <div
              key={stat.label}
              className="glass card-hover rounded-xl p-4 text-center"
            >
              <p className="text-xs text-white/60 mb-1">{stat.label}</p>
              <p className="text-lg font-semibold text-cyan-300">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Events Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {skyEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ delay: 0.1 * i }}
              className="relative overflow-hidden rounded-xl glass card-hover group
                         shadow-[0_0_30px_rgba(0,0,0,0.6)]
                         group-hover:shadow-[0_0_60px_rgba(0,255,255,0.15)]"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-110
                           transition-transform duration-700
                           group-hover:scale-125"
                style={{ backgroundImage: `url(${event.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90" />

              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">
                    {event.title}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 glow-primary">
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

        {/* Live Telemetry */}
        <div className="max-w-6xl mx-auto mt-12">
          <h3 className="text-lg font-medium mb-4">
            Live Sky Telemetry
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {telemetryStats.map(stat => (
              <div
                key={stat.label}
                className="glass card-hover rounded-xl p-4"
              >
                <p className="text-xs text-white/60 mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-semibold text-cyan-300">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 mt-1">
                  {stat.trend}
                </p>

                <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-2/3 bg-cyan-400 glow-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visibility Metrics */}
        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-4 gap-4">
          {visibilityMetrics.map(metric => (
            <div
              key={metric.label}
              className="glass card-hover rounded-xl p-4 text-center"
            >
              <p className="text-xs text-white/60 mb-1">
                {metric.label}
              </p>
              <p className="text-sm font-medium text-cyan-300">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Alerts */}
        <div className="max-w-6xl mx-auto mt-12 glass card-hover rounded-xl p-6">
          <h3 className="text-lg font-medium mb-3">
            Recent Sky Alerts
          </h3>

          <ul className="space-y-2 text-sm text-white/70">
            {recentAlerts.map(alert => (
              <li key={alert} className="flex gap-2">
                <span className="text-cyan-300">•</span>
                {alert}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Panels */}
        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass card-hover rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">
              Space Weather
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {spaceWeatherDetails.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="glass card-hover rounded-xl p-6">
            <h3 className="text-lg font-medium mb-3">
              Night Alerts
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Get notified about visible events tonight.
            </p>
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`w-full py-2 rounded-lg font-medium transition ${
                alertsEnabled
                  ? "bg-cyan-400 text-black glow-primary"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {alertsEnabled ? "Alerts Enabled" : "Enable Alerts"}
            </button>
          </div>

          <div className="glass card-hover rounded-xl p-6 border-dashed border-cyan-400/30">
            <h3 className="text-lg font-medium mb-2">
              AI Forecast
            </h3>
            <p className="text-sm text-white/60">
              Predictive sky and space weather insights powered by AI.
            </p>
            <p className="mt-3 text-xs text-cyan-300">
              Coming soon
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

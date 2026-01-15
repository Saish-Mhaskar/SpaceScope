"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { EarthGlobe } from "@/components/earth-globe"

/* ================= DATA ================= */

const layers = [
  "Fires",
  "Floods",
  "Storms",
  "Crop Health",
  "CO₂",
  "Temperature",
]

const tabs = [
  "Climate",
  "Disasters",
  "Agriculture",
  "Pollution",
  "Infrastructure",
]

const impactStats = [
  { label: "Active Wildfires", value: "1,284", trend: "+3%" },
  { label: "Flood Alerts", value: "62", trend: "−8%" },
  { label: "Storm Systems", value: "14", trend: "Stable" },
  { label: "Avg Temp Anomaly", value: "+1.2°C", trend: "↑" },
  { label: "CO₂ Concentration", value: "421 ppm", trend: "Record High" },
]

const recentEvents = [
  "🔥 Australia Bushfires — Updated 2h ago",
  "🌊 Bangladesh Floods — Moderate Risk",
  "🌪 Atlantic Storm — Developing",
  "❄ Arctic Ice Loss — Accelerating",
]

const tabInsights: Record<string, string[]> = {
  Climate: [
    "Global temperature trend rising steadily",
    "Polar ice loss accelerating",
    "Oceans absorbing record heat levels",
  ],
  Disasters: [
    "Wildfire frequency increasing in southern regions",
    "Flood risks elevated due to monsoon patterns",
    "Storm intensity slightly above average",
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
    "Flood‑prone infrastructure under observation",
    "Coastal erosion affecting ports",
    "Urban heat island effects increasing",
  ],
}

/* ================= PAGE ================= */

export default function EarthImpactPage() {
  const [activeLayers, setActiveLayers] = useState<string[]>(layers)
  const [activeTab, setActiveTab] = useState("Climate")

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev =>
      prev.includes(layer)
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    )
  }

  return (
    <>
      {/* Global Navigation */}
      <Navigation />

      <div className="relative min-h-screen px-6 pt-28 pb-16 text-white starfield">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h1 className="text-4xl font-semibold mb-2 text-glow">
            Earth Impact Center
          </h1>
          <p className="text-white/70 max-w-2xl">
            Monitor Earth’s climate, disasters, and environmental impact using
            satellite‑based insights.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Earth Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass card-hover rounded-2xl p-6 relative"
          >
            <div className="flex justify-center items-center">
              <EarthGlobe />
            </div>

            {/* Overlayed Signals */}
            <div className="absolute inset-0 pointer-events-none">
              {activeLayers.includes("Fires") && (
                <div className="absolute top-[45%] left-[60%] w-3 h-3 bg-orange-500 rounded-full animate-pulse shadow-lg" />
              )}
              {activeLayers.includes("Floods") && (
                <div className="absolute top-[55%] left-[48%] w-4 h-4 bg-blue-400 rounded-full blur-sm" />
              )}
              {activeLayers.includes("Storms") && (
                <div className="absolute top-[35%] left-[40%] w-6 h-6 border border-purple-400 rounded-full animate-ping" />
              )}
            </div>

            {/* Active Layers Legend */}
            <div className="absolute bottom-4 left-4 glass rounded-lg px-4 py-3 text-xs">
              <p className="text-white font-medium mb-1">Active Layers</p>
              <div className="flex flex-wrap gap-2">
                {activeLayers.map(layer => (
                  <span
                    key={layer}
                    className="px-2 py-0.5 rounded-full bg-white/10 text-cyan-300"
                  >
                    {layer}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Layers Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass card-hover rounded-2xl p-6"
          >
            <h3 className="text-lg font-medium mb-4">
              Satellite Layers
            </h3>

            <div className="space-y-3">
              {layers.map(layer => (
                <label
                  key={layer}
                  className="flex items-center justify-between text-sm cursor-pointer hover:text-cyan-300 transition"
                >
                  <span className="text-white/80">{layer}</span>
                  <input
                    type="checkbox"
                    checked={activeLayers.includes(layer)}
                    onChange={() => toggleLayer(layer)}
                    className="accent-cyan-400"
                  />
                </label>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Impact Metrics */}
        <div className="max-w-6xl mx-auto mt-10 grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {impactStats.map(stat => (
            <div
              key={stat.label}
              className="glass card-hover rounded-xl p-4 text-center"
            >
              <p className="text-xs text-white/60 mb-1">{stat.label}</p>
              <p className="text-xl font-semibold text-cyan-300">{stat.value}</p>
              <p className="text-xs text-white/50 mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="flex gap-3 flex-wrap mb-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-cyan-400 text-black glow-primary"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass card-hover rounded-2xl p-6"
          >
            <h3 className="text-lg font-medium mb-3">
              {activeTab} Overview
            </h3>

            <ul className="space-y-2 text-sm text-white/70">
              {tabInsights[activeTab].map(item => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Recent Events */}
        <div className="max-w-6xl mx-auto mt-10 glass card-hover rounded-2xl p-6">
          <h3 className="text-lg font-medium mb-3">
            Recent Earth Events
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            {recentEvents.map(e => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

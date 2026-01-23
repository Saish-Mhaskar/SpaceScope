"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { EarthGlobe } from "@/components/earth-globe"

/* ================= TYPES ================= */

type ImpactStat = {
  label: string
  value: string
  trend: string
}

type EarthImpactResponse = {
  impactStats: ImpactStat[]
  recentEvents: string[]
  tabInsights: Record<string, string[]>
}

/* ================= UI CONSTANTS ================= */

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

/* ================= PAGE ================= */

export default function EarthImpactPage() {
  const [activeLayers, setActiveLayers] = useState<string[]>(layers)
  const [activeTab, setActiveTab] = useState("Climate")
  const [data, setData] = useState<EarthImpactResponse>({
    impactStats: [],
    recentEvents: [],
    tabInsights: {},
  })
  const [loading, setLoading] = useState(true)

  /* ===== FETCH API DATA ===== */
  useEffect(() => {
  let mounted = true

  fetch("/api/earth-impact")
    .then(async res => {
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "API failed")
      }
      return res.json()
    })
    .then(json => {
      if (!mounted) return

      setData({
        impactStats: json.impactStats ?? [],
        recentEvents: json.recentEvents ?? [],
        tabInsights: json.tabInsights ?? {},
      })
    })
    .catch(err => {
      console.error("Earth Impact API error:", err)

      // fail-safe empty state
      setData({
        impactStats: [],
        recentEvents: ["⚠ Unable to load live Earth impact data"],
        tabInsights: {},
      })
    })
    .finally(() => {
      if (mounted) setLoading(false)
    })

  return () => {
    mounted = false
  }
}, [])


  const toggleLayer = (layer: string) => {
    setActiveLayers(prev =>
      prev.includes(layer)
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading Earth impact data…
      </main>
    )
  }

  return (
    <>
      <Navigation />

      <div className="relative min-h-screen px-6 pt-28 pb-16 text-white starfield">
        {/* ================= HEADER ================= */}
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
            satellite-based insights.
          </p>
        </motion.div>

        {/* ================= MAIN GRID ================= */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Earth Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass card-hover rounded-2xl p-6 relative"
          >
            <div className="flex justify-center items-center">
              <EarthGlobe />
            </div>

            {/* Overlay Signals (visual only) */}
            <div className="absolute inset-0 pointer-events-none">
              {activeLayers.includes("Fires") && (
                <div className="absolute top-[45%] left-[60%] w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              )}
              {activeLayers.includes("Floods") && (
                <div className="absolute top-[55%] left-[48%] w-4 h-4 bg-blue-400 rounded-full blur-sm" />
              )}
              {activeLayers.includes("Storms") && (
                <div className="absolute top-[35%] left-[40%] w-6 h-6 border border-purple-400 rounded-full animate-ping" />
              )}
            </div>

            {/* Active Layers */}
            <div className="absolute bottom-4 left-4 glass rounded-lg px-4 py-3 text-xs">
              <p className="font-medium mb-1">Active Layers</p>
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
                  className="flex items-center justify-between text-sm cursor-pointer"
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

        {/* ================= IMPACT METRICS ================= */}
        <div className="max-w-6xl mx-auto mt-10 grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {(data.impactStats || []).map(stat => (
            <div
              key={stat.label}
              className="glass card-hover rounded-xl p-4 text-center"
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
            </div>
          ))}
        </div>

        {/* ================= TABS ================= */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="flex gap-3 flex-wrap mb-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-cyan-400 text-black glow-primary"
                    : "bg-white/10 hover:bg-white/20"
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
              {(data.tabInsights[activeTab] || []).map(item => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ================= RECENT EVENTS ================= */}
        <div className="max-w-6xl mx-auto mt-10 glass card-hover rounded-2xl p-6">
          <h3 className="text-lg font-medium mb-3">
            Recent Earth Events
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            {(data.recentEvents || []).map(event => (
              <li key={event}>{event}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

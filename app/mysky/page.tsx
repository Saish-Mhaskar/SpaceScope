"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Navigation } from "@/components/navigation"

/* ================= DATA ================= */

const skyLayers = [
    { id: "stars", label: "Stars" },
    { id: "planets", label: "Planets" },
    { id: "moon", label: "Moon" },
    { id: "clouds", label: "Clouds" },
    { id: "pollution", label: "Light Pollution" },
]

const tonightSummary = {
    moonPhase: "Waxing Crescent",
    bestViewing: "9:30 PM – 11:00 PM",
    visibilityScore: "★★★★☆",
    skyQuality: "Good (Bortle 4)",
}

const visibleObjects = [
    { name: "Saturn", direction: "SE", altitude: "Low", bestTime: "9:45 PM" },
    { name: "Orion Constellation", direction: "E", altitude: "Medium", bestTime: "10:30 PM" },
    { name: "Milky Way Core", direction: "S", altitude: "Low", bestTime: "11:15 PM" },
]

const recommendedObjects = [
    { name: "Orion Nebula", type: "Nebula", viewing: "Binocular / Telescope" },
    { name: "Jupiter", type: "Planet", viewing: "Naked Eye" },
    { name: "Pleiades", type: "Star Cluster", viewing: "Naked Eye / Binocular" },
]

const skyConditions = {
    cloudCover: 15,
    visibility: 85,
    temperature: "24°C",
    humidity: "45%",
    wind: "8 km/h",
    lightPollution: "Moderate",
}

const nightAlerts = [
    { label: "ISS Pass", time: "Today 20:15" },
    { label: "Planet Visibility", time: "Tonight 21:00" },
    { label: "Meteor Showers", time: "Aug 12" },
]

/* ================= PAGE ================= */

export default function MySkyPage() {
    const [activeLayers, setActiveLayers] = useState<string[]>(
        skyLayers.map(l => l.id)
    )
    const [telescopeMode, setTelescopeMode] = useState(false)

    const toggleLayer = (id: string) => {
        setActiveLayers(prev =>
            prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
        )
    }

    const showStars = activeLayers.includes("stars")
    const showClouds = activeLayers.includes("clouds")
    const showPollution = activeLayers.includes("pollution")
    const showMoon = activeLayers.includes("moon")

    return (
        <div className="relative min-h-screen text-white starfield">
            {/* ✅ NAVIGATION */}
            <Navigation />

            {/* Page padding accounts for fixed navbar */}
            <div className="pt-24 px-6 pb-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto mb-8"
                >
                    <h1 className="text-4xl font-semibold mb-2 text-glow">My Sky</h1>
                    <p className="text-white/70 max-w-xl">
                        Your personalized night sky based on location.
                        Explore what’s visible above you tonight.
                    </p>
                </motion.div>

                {/* Tonight Summary */}
                <div className="max-w-5xl mx-auto grid sm:grid-cols-4 gap-4 mb-10">
                    {Object.entries(tonightSummary).map(([k, v]) => (
                        <div key={k} className="glass card-hover rounded-xl p-4">
                            <p className="text-xs text-white/60 mb-1 capitalize">
                                {k.replace(/([A-Z])/g, " $1")}
                            </p>
                            <p className="text-sm font-medium text-cyan-300">{v}</p>
                        </div>
                    ))}
                </div>

                {/* ================= HERO SKY ================= */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative max-w-5xl mx-auto glass rounded-2xl overflow-hidden"
                >
                    <div className="relative aspect-[16/9] overflow-hidden">

                        {/* Base sky */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-black" />

                        {showStars && (
                            <div
                                className="absolute inset-0 opacity-60"
                                style={{
                                    backgroundImage: `
                                        radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8), transparent),
                                        radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.6), transparent),
                                        radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.7), transparent),
                                        radial-gradient(2px 2px at 85% 20%, rgba(255,255,255,0.9), transparent)
                                        `,
                                }}
                            />
                        )}


                        {/* Milky Way */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent blur-3xl rotate-6" />

                        {/* Moon */}
                        {showMoon && (
                            <div className="absolute top-14 right-20 w-20 h-20 rounded-full
                bg-gradient-to-br from-white via-white/80 to-white/40
                shadow-[0_0_50px_rgba(255,255,255,0.4)]" />
                        )}

                        {/* Clouds */}
                        {showClouds && (
                            <motion.div
                                animate={{ x: ["-10%", "10%", "-10%"] }}
                                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent blur-2xl"
                            />
                        )}

                        {/* Light Pollution */}
                        {showPollution && (
                            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-amber-500/15 to-transparent" />
                        )}

                        {/* HUD */}
                        <div className="absolute inset-0 flex flex-col justify-between p-6">
                            <div className="flex justify-between text-xs text-white/60">
                                <span>Local Time · 9:42 PM</span>
                                <span>Facing East · Alt 45°</span>
                            </div>

                            <div className="text-center">
                                <p className="text-lg font-medium">Live Night Sky (Simulated)</p>
                                <p className="text-sm text-white/60">
                                    Visual preview — real data coming soon
                                </p>
                            </div>

                            <div className="text-xs text-white/50 text-center">
                                Toggle layers below to explore the sky
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ================= LOWER PANELS ================= */}

                {/* Conditions + Alerts */}
                <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
                    <div className="glass card-hover rounded-xl p-6">
                        <h3 className="text-lg font-medium mb-4">Sky Conditions</h3>

                        {[
                            ["Cloud Cover", skyConditions.cloudCover + "%"],
                            ["Visibility", skyConditions.visibility + "%"],
                        ].map(([l, v]) => (
                            <div key={l} className="mb-4">
                                <div className="flex justify-between text-white/70 mb-1">
                                    <span>{l}</span><span>{v}</span>
                                </div>
                                <div className="h-1 bg-white/10 rounded">
                                    <div className="h-1 bg-cyan-400 rounded" style={{ width: v }} />
                                </div>
                            </div>
                        ))}

                        <div className="grid grid-cols-3 gap-3 text-xs text-white/70">
                            <div>🌡 {skyConditions.temperature}</div>
                            <div>💧 {skyConditions.humidity}</div>
                            <div>🌬 {skyConditions.wind}</div>
                        </div>

                        <div className="pt-2 text-xs">
                            Light Pollution:{" "}
                            <span className="text-yellow-300">
                                {skyConditions.lightPollution}
                            </span>
                        </div>
                    </div>

                    <div className="glass card-hover rounded-xl p-6">
                        <h3 className="text-lg font-medium mb-4">Night Alerts</h3>
                        {nightAlerts.map(a => (
                            <div key={a.label} className="flex justify-between text-sm text-white/70 border-b border-white/5 pb-2 mb-2">
                                <span>{a.label}</span>
                                <span className="text-xs text-cyan-300">{a.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
                    <div className="glass card-hover rounded-xl p-5">
                        <h3 className="text-lg font-medium mb-4">Sky Layers</h3>
                        {skyLayers.map(layer => (
                            <label key={layer.id} className="flex justify-between text-sm cursor-pointer mb-3">
                                <span className="text-white/80">{layer.label}</span>
                                <input
                                    type="checkbox"
                                    checked={activeLayers.includes(layer.id)}
                                    onChange={() => toggleLayer(layer.id)}
                                    className="accent-cyan-400"
                                />
                            </label>
                        ))}
                    </div>

                    <div className="glass card-hover rounded-xl p-5">
                        <h3 className="text-lg font-medium mb-4">Visible Tonight</h3>
                        {visibleObjects.map(obj => (
                            <div key={obj.name} className="mb-3 text-sm">
                                <span className="text-white">{obj.name}</span>
                                <div className="text-xs text-white/50">
                                    {obj.direction} • {obj.altitude} • {obj.bestTime}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass card-hover rounded-xl p-5">
                        <h3 className="text-lg font-medium mb-3">Telescope Mode</h3>
                        <p className="text-sm text-white/60 mb-4">
                            Enhanced object details and guidance.
                        </p>
                        <button
                            onClick={() => setTelescopeMode(!telescopeMode)}
                            className={`w-full py-2 rounded-lg font-medium ${telescopeMode
                                ? "bg-cyan-400 text-black glow-primary"
                                : "bg-white/10 hover:bg-white/20"
                                }`}
                        >
                            {telescopeMode ? "Enabled" : "Enable (Pro)"}
                        </button>
                    </div>
                </div>

                {/* Recommended */}
                <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
                    {recommendedObjects.map(obj => (
                        <div key={obj.name} className="glass card-hover rounded-xl p-5">
                            <p className="text-sm font-medium text-cyan-300">{obj.name}</p>
                            <p className="text-xs text-white/60">{obj.type}</p>
                            <p className="text-xs text-white/50 mt-2">
                                Best with: {obj.viewing}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

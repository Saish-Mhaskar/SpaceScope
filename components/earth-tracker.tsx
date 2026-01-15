"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { satellites, cities, type Satellite } from "@/lib/data/satellites"
import { cn } from "@/lib/utils"
import { X, Gauge, Clock, ArrowUp, MapPin, Eye, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"

type SatelliteFilter = "all" | "iss" | "communication" | "weather" | "research"

const filterOptions: { value: SatelliteFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "iss", label: "ISS" },
  { value: "communication", label: "Communication" },
  { value: "weather", label: "Weather" },
  { value: "research", label: "Research" },
]

const typeColors: Record<string, string> = {
  iss: "bg-primary",
  communication: "bg-chart-2",
  weather: "bg-chart-4",
  research: "bg-accent",
}

export function EarthTracker() {
  const [filter, setFilter] = useState<SatelliteFilter>("all")
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null)
  const [trackingISS, setTrackingISS] = useState(false)
  const [issPosition, setIssPosition] = useState({ angle: 0, orbitAngle: 30 })
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [showVisibility, setShowVisibility] = useState(false)

  // Animate ISS position
  useEffect(() => {
    const interval = setInterval(() => {
      setIssPosition((prev) => ({
        angle: (prev.angle + 0.5) % 360,
        orbitAngle: prev.orbitAngle,
      }))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const filteredSatellites = satellites.filter((s) => filter === "all" || s.type === filter)

  const iss = satellites.find((s) => s.type === "iss")

  // Simulated visibility data
  const getVisibilityData = (city: string) => {
    const hour = Math.floor(Math.random() * 12) + 6
    const minute = Math.floor(Math.random() * 60)
    const duration = Math.floor(Math.random() * 4) + 2
    const directions = ["Northwest to Northeast", "Southwest to Southeast", "North to South", "West to East"]
    return {
      time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} UTC`,
      direction: directions[Math.floor(Math.random() * directions.length)],
      duration: `${duration} minutes`,
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Earth Visualization */}
      <div className="lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square max-w-[600px] mx-auto"
        >
          {/* Outer space glow */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30"
            style={{
              background: "radial-gradient(circle, oklch(0.5 0.15 200) 0%, transparent 60%)",
            }}
          />

          <div className="absolute inset-[15%] rounded-full overflow-hidden">
            {/* Earth texture - rotating */}
            <div
              className="absolute inset-0 rounded-full earth-sphere"
              style={{
                backgroundImage:
                  "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/2560px-Land_ocean_ice_2048.jpg')",
                backgroundSize: "200% 100%",
                backgroundRepeat: "repeat-x",
              }}
            />

            {/* Atmosphere rim glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, transparent 50%, oklch(0.6 0.15 200 / 0.15) 70%, oklch(0.5 0.2 200 / 0.3) 85%, transparent 100%)",
              }}
            />

            {/* Day/night shadow overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%)",
              }}
            />
          </div>

          <div
            className="absolute inset-[13%] rounded-full pointer-events-none"
            style={{
              border: "2px solid transparent",
              background:
                "linear-gradient(135deg, oklch(0.6 0.15 200 / 0.3), oklch(0.5 0.12 195 / 0.15)) padding-box, linear-gradient(135deg, oklch(0.7 0.18 200 / 0.5), transparent) border-box",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute inset-[12%] rounded-full pointer-events-none"
            style={{
              boxShadow: "0 0 40px oklch(0.6 0.15 200 / 0.2), 0 0 80px oklch(0.5 0.12 200 / 0.1)",
            }}
          />

          {/* Orbit paths */}
          {[0.85, 0.75, 0.65].map((scale, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-border/20"
              style={{
                inset: `${(1 - scale) * 50}%`,
                transform: `rotateX(${60 + i * 10}deg)`,
              }}
            />
          ))}

          {/* ISS Orbit */}
          <motion.div
            className="absolute inset-[5%]"
            animate={trackingISS ? { scale: 1.05 } : { scale: 1 }}
            style={{ transform: `rotateX(65deg) rotateZ(${issPosition.orbitAngle}deg)` }}
          >
            {/* Orbit ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/40 border-dashed" />

            {/* ISS dot */}
            <motion.div
              className="absolute w-4 h-4"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${issPosition.angle}deg) translateX(${45}%) translateY(-50%)`,
              }}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-primary"
                animate={{
                  boxShadow: [
                    "0 0 10px var(--primary), 0 0 20px var(--primary)",
                    "0 0 20px var(--primary), 0 0 40px var(--primary)",
                    "0 0 10px var(--primary), 0 0 20px var(--primary)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* ISS label */}
              <div className="absolute left-6 top-0 whitespace-nowrap px-2 py-1 rounded bg-background/80 text-xs font-medium text-primary">
                ISS
              </div>
            </motion.div>
          </motion.div>

          {/* Other satellites */}
          {filteredSatellites
            .filter((s) => s.type !== "iss")
            .map((satellite, index) => {
              const orbitRadius = 35 + index * 5
              const speed = 0.3 - index * 0.05
              const angle = (Date.now() * speed * 0.001 + index * 60) % 360

              return (
                <motion.div
                  key={satellite.id}
                  className="absolute inset-0"
                  style={{
                    transform: `rotateX(${55 + index * 8}deg) rotateZ(${index * 30}deg)`,
                  }}
                >
                  <motion.button
                    className={cn("absolute w-2.5 h-2.5 rounded-full", typeColors[satellite.type])}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `rotate(${angle}deg) translateX(${orbitRadius}%) translateY(-50%)`,
                    }}
                    onClick={() => setSelectedSatellite(satellite)}
                    whileHover={{ scale: 2 }}
                  />
                </motion.div>
              )
            })}

          {/* Center info display when tracking ISS */}
          <AnimatePresence>
            {trackingISS && iss && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 left-4 p-4 rounded-xl glass-strong border border-primary/30 max-w-[200px]"
              >
                <p className="text-xs text-muted-foreground mb-1">Tracking</p>
                <p className="font-semibold text-primary text-sm">International Space Station</p>
                <div className="mt-2 space-y-1 text-xs">
                  <p className="text-muted-foreground">
                    Speed: <span className="text-foreground">{iss.speed.toLocaleString()} km/h</span>
                  </p>
                  <p className="text-muted-foreground">
                    Altitude: <span className="text-foreground">{iss.altitude} km</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filter === option.value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground glass",
              )}
            >
              {filter === option.value && (
                <motion.div
                  layoutId="tracker-filter"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {option.value !== "all" && (
                  <span className={cn("w-2 h-2 rounded-full", typeColors[option.value] || "bg-foreground")} />
                )}
                {option.label}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* ISS Info Panel */}
        {iss && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl glass border border-primary/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">ISS Status</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-primary">Live</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ArrowUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Altitude</p>
                  <p className="font-semibold text-foreground">{iss.altitude} km</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Gauge className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Speed</p>
                  <p className="font-semibold text-foreground">{iss.speed.toLocaleString()} km/h</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orbit Period</p>
                  <p className="font-semibold text-foreground">{iss.orbitPeriod} minutes</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setTrackingISS(!trackingISS)}
              className={cn("w-full mt-4", trackingISS && "bg-primary/20 text-primary hover:bg-primary/30")}
              variant={trackingISS ? "outline" : "default"}
            >
              {trackingISS ? "Stop Tracking" : "Track ISS"}
            </Button>
          </motion.div>
        )}

        {/* Visibility Checker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl glass border border-border/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/30">
              <Eye className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">ISS Visibility</h3>
              <p className="text-xs text-muted-foreground">Check next visible pass</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Select location
            </label>
            <select
              value={selectedCity || ""}
              onChange={(e) => {
                setSelectedCity(e.target.value)
                setShowVisibility(!!e.target.value)
              }}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50"
            >
              <option value="">Choose a city...</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <AnimatePresence>
            {showVisibility && selectedCity && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-4 border-t border-border/50"
              >
                {(() => {
                  const data = getVisibilityData(selectedCity)
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <Timer className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Next Pass</p>
                          <p className="text-sm font-medium text-foreground">{data.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ArrowUp className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Direction</p>
                          <p className="text-sm font-medium text-foreground">{data.direction}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="text-sm font-medium text-foreground">{data.duration}</p>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl glass border border-border/50"
        >
          <p className="text-sm font-medium text-foreground mb-3">Satellite Types</p>
          <div className="space-y-2">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <span className={cn("w-3 h-3 rounded-full", color)} />
                <span className="text-sm text-muted-foreground capitalize">{type === "iss" ? "ISS" : type}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Satellite detail modal */}
      <AnimatePresence>
        {selectedSatellite && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSatellite(null)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[400px] max-w-[90vw] p-6 rounded-2xl glass-strong border border-border/50"
            >
              <button
                onClick={() => setSelectedSatellite(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className={cn("w-4 h-4 rounded-full", typeColors[selectedSatellite.type])} />
                <h3 className="text-xl font-semibold text-foreground">{selectedSatellite.name}</h3>
              </div>

              <p className="text-muted-foreground mb-6">{selectedSatellite.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Altitude</p>
                  <p className="font-semibold text-foreground">{selectedSatellite.altitude} km</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Speed</p>
                  <p className="font-semibold text-foreground">{selectedSatellite.speed.toLocaleString()} km/h</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Orbit Period</p>
                  <p className="font-semibold text-foreground">{selectedSatellite.orbitPeriod} min</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-semibold text-foreground capitalize">{selectedSatellite.type}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

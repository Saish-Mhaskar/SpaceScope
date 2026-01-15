"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Constellation } from "@/lib/data/constellations"
import { MapPin, Compass, ArrowUp, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const cities = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
]

interface TelescopeDirectionProps {
  constellation: Constellation
}

export function TelescopeDirection({ constellation }: TelescopeDirectionProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  // Simulated direction data based on constellation
  const getDirection = (city: string) => {
    // This is simulated data for demo purposes
    const directions = {
      North: 0,
      Northeast: 45,
      East: 90,
      Southeast: 135,
      South: 180,
      Southwest: 225,
      West: 270,
      Northwest: 315,
    }
    const baseAngle = directions[constellation.direction as keyof typeof directions] || 0
    // Add slight variation based on city
    const cityVariation = city.length * 5
    return (baseAngle + cityVariation) % 360
  }

  const getElevation = () => {
    // Simulated elevation based on constellation data
    return constellation.elevation
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl glass border border-border/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
          <Compass className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Telescope Direction</h3>
          <p className="text-sm text-muted-foreground">Find {constellation.name} in your sky</p>
        </div>
      </div>

      {/* City Selection */}
      <div className="mb-6">
        <label className="block text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 inline mr-2" />
          Select your location
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city.name)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedCity === city.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Direction Display */}
      {selectedCity && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          {/* Compass visualization */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              {/* Compass circle */}
              <div className="absolute inset-0 rounded-full border-2 border-border/50 bg-secondary/30" />

              {/* Cardinal directions */}
              {["N", "E", "S", "W"].map((dir, i) => (
                <span
                  key={dir}
                  className="absolute text-sm font-bold text-muted-foreground"
                  style={{
                    top: i === 0 ? "5%" : i === 2 ? "85%" : "46%",
                    left: i === 1 ? "88%" : i === 3 ? "5%" : "46%",
                  }}
                >
                  {dir}
                </span>
              ))}

              {/* Direction arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: getDirection(selectedCity) }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <div className="relative h-full flex flex-col items-center justify-start pt-6">
                  <ArrowUp className="w-8 h-8 text-primary drop-shadow-lg" />
                  <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-transparent" />
                </div>
              </motion.div>

              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/50 border-2 border-primary" />
            </div>
          </div>

          {/* Direction info */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-primary">{constellation.direction}</p>
              <p className="text-sm text-muted-foreground">Direction</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-primary">{getElevation()}</p>
              <p className="text-sm text-muted-foreground">Elevation</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30">
            <AlertCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Direction data is simulated for demo purposes. Actual viewing direction depends on date, time, and precise
              location.
            </p>
          </div>
        </motion.div>
      )}

      {!selectedCity && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Select a city to see viewing directions</p>
        </div>
      )}
    </motion.div>
  )
}

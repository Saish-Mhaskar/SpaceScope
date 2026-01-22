"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { ChevronLeft, ChevronRight } from "lucide-react"

const satelliteSlides = [
  {
    title: "🛰️ What Are Satellites?",
    description:
      "Satellites are objects that orbit Earth to collect data, communicate signals, and observe our planet.",
    points: [
      "Can be natural (Moon) or artificial",
      "Stay in orbit due to gravity and velocity",
      "Critical for modern technology",
    ],
    image: "/learn/satellites-earth/what-is-satellite.jpg",
    imageFit: "cover",
  },
  {
    title: "🧭 Types of Orbits",
    description:
      "Satellites are placed in different orbits depending on their purpose.",
    points: [
      "LEO: Imaging, ISS, Earth observation",
      "MEO: Navigation systems like GPS",
      "GEO: Communication & weather satellites",
    ],
    image: "/learn/satellites-earth/types-of-satellites.jpg",
    imageFit: "contain",
  },
  {
    title: "🌍 Earth Observation",
    description:
      "Satellites continuously monitor Earth to track climate, disasters, and environmental changes.",
    points: [
      "Weather forecasting",
      "Climate change monitoring",
      "Disaster management & relief",
    ],
    image: "/learn/satellites-earth/earth-observation.jpg",
    imageFit: "cover",
  },
  {
    title: "📡 Communication & GPS",
    description:
      "Satellites enable global communication, navigation, and positioning systems.",
    points: [
      "GPS helps with navigation & tracking",
      "Satellites relay TV & internet signals",
      "Used in aviation & maritime travel",
    ],
    image: "/learn/satellites-earth/gps-communication.png",
    imageFit: "cover",
  },
]

export default function SatellitesEarthPage() {
  const [index, setIndex] = useState(0)

  const next = () =>
    setIndex((i) => Math.min(i + 1, satelliteSlides.length - 1))
  const prev = () => setIndex((i) => Math.max(i - 1, 0))

  return (
    <main className="relative min-h-screen">
      <Starfield />
      <Navigation />

      <PageTransition>
        <div className="pt-24 pb-24 px-4">
          <div className="max-w-6xl mx-auto space-y-16">

            {/* ===== HERO ===== */}
            <section className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-foreground">Satellites & </span>
                <span className="text-primary text-glow">Earth</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover how satellites orbit Earth and power navigation,
                communication, and planetary monitoring.
              </p>

              <p className="text-sm text-muted-foreground/80 pt-4">
                Swipe or use arrows to explore 🛰️
              </p>
            </section>

            {/* ===== SLIDER ===== */}
            <section className="relative">

              {/* Arrow controls */}
              <div className="absolute -top-12 right-0 flex gap-2">
                <button
                  onClick={prev}
                  disabled={index === 0}
                  className="
                    p-2 rounded-full
                    border border-border/40
                    bg-background/60
                    transition-all duration-300
                    hover:border-primary
                    hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]
                    hover:scale-105
                    disabled:opacity-40
                    disabled:hover:shadow-none
                    disabled:hover:scale-100
                  "
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={next}
                  disabled={index === satelliteSlides.length - 1}
                  className="
                    p-2 rounded-full
                    border border-border/40
                    bg-background/60
                    transition-all duration-300
                    hover:border-primary
                    hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]
                    hover:scale-105
                    disabled:opacity-40
                    disabled:hover:shadow-none
                    disabled:hover:scale-100
                  "
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Swipe area */}
              <motion.div
                className="overflow-hidden"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -100) next()
                  if (info.offset.x > 100) prev()
                }}
              >
                <motion.div
                  className="flex"
                  animate={{ x: `-${index * 100}%` }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                >
                  {satelliteSlides.map((slide, i) => (
                    <div key={i} className="min-w-full px-2">
                      <div className="glass rounded-2xl border border-border/40
                                      p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center
                                      hover:border-primary/40 transition">

                        {/* TEXT */}
                        <div className="space-y-4">
                          <h2 className="text-2xl font-semibold">
                            {slide.title}
                          </h2>

                          <p className="text-muted-foreground">
                            {slide.description}
                          </p>

                          <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            {slide.points.map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        {/* IMAGE */}
                        <div className="flex justify-center">
                          <div className="relative w-full max-w-sm aspect-[4/3]
                                          rounded-xl overflow-hidden
                                          border border-border/40 bg-black/30">
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              fill
                              className={
                                slide.imageFit === "contain"
                                  ? "object-contain p-4"
                                  : "object-cover"
                              }
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* ===== WHY IT MATTERS ===== */}
            <section className="text-center glass rounded-2xl p-8 border border-border/40">
              <h3 className="text-xl font-semibold mb-3">
                Why Satellites Matter
              </h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Satellites keep the modern world running — from GPS navigation
                and internet connectivity to climate monitoring and disaster
                response.
              </p>
            </section>

          </div>
        </div>
      </PageTransition>

      <Chatbot />
    </main>
  )
}

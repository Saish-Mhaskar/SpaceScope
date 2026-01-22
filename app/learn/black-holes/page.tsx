"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { ChevronLeft, ChevronRight } from "lucide-react"

const blackHoleSlides = [
  {
    title: "🕳️ How Black Holes Form",
    description:
      "Black holes form when massive stars run out of fuel and collapse under their own gravity.",
    points: [
      "A massive star exhausts nuclear fuel",
      "Core collapses inward violently",
      "Gravity becomes infinitely strong",
    ],
    image: "/learn/black-holes/formation.png",
    imageFit: "cover",
  },
  {
    title: "🌌 Event Horizon",
    description:
      "The event horizon is the point of no return — nothing, not even light, can escape beyond it.",
    points: [
      "Marks the boundary of the black hole",
      "Light crossing it can never escape",
      "Defines the visible size of a black hole",
    ],
    image: "/learn/black-holes/event-horizon.png",
    imageFit: "contain",
  },
  {
    title: "🧠 Types of Black Holes",
    description:
      "Black holes come in different sizes depending on how they formed.",
    points: [
      "Stellar black holes (formed from stars)",
      "Supermassive black holes (galaxy centers)",
      "Intermediate black holes (rare & mysterious)",
    ],
    image: "/learn/black-holes/types.png",
    imageFit: "contain",
  },
  {
    title: "🧬 Spaghettification",
    description:
      "Extreme tidal forces stretch objects into long strands as they fall into a black hole.",
    points: [
      "Gravity is stronger closer to the black hole",
      "Objects stretch vertically",
      "Matter is torn apart at atomic levels",
    ],
    image: "/learn/black-holes/spaghettification.png",
    imageFit: "cover",
  },
]

export default function BlackHolesPage() {
  const [index, setIndex] = useState(0)

  const next = () =>
    setIndex((i) => Math.min(i + 1, blackHoleSlides.length - 1))
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
                <span className="text-foreground">Understanding </span>
                <span className="text-primary text-glow">Black Holes</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore the most mysterious objects in the universe where gravity
                bends space, time, and reality itself.
              </p>

              <p className="text-sm text-muted-foreground/80 pt-4">
                Swipe or use arrows to explore 🕳️
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
                  disabled={index === blackHoleSlides.length - 1}
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
                  {blackHoleSlides.map((slide, i) => (
                    <div key={i} className="min-w-full px-2">
                      <div className="glass rounded-2xl border border-border/40 p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center hover:border-primary/40 transition">

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
                          <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden border border-border/40 bg-black/30">
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
                Why Black Holes Matter
              </h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Black holes help scientists understand gravity, spacetime,
                galaxy formation, and the extreme limits of physics.
              </p>
            </section>

          </div>
        </div>
      </PageTransition>

      <Chatbot />
    </main>
  )
}

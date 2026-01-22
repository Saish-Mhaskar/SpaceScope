"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { ChevronLeft, ChevronRight } from "lucide-react"

const planetSlides = [
    {
        title: "🌍 Planet Formation",
        description:
            "Planets form from massive clouds of gas and dust called nebulae. Gravity pulls particles together over millions of years.",
        points: [
            "Dust particles collide and stick together",
            "Gravity increases as mass grows",
            "Planetesimals form planets",
        ],
        image: "/learn/planets/formation.jpg",
        imageFit: "cover",
    },
    {
        title: "🪐 Types of Planets",
        description:
            "Not all planets are the same. Their composition depends on where they formed and what materials were available.",
        points: [
            "Terrestrial: rocky planets like Earth & Mars",
            "Gas giants: Jupiter & Saturn",
            "Ice giants: Uranus & Neptune",
        ],
        image: "/learn/planets/types.png",
        imageFit: "contain",
    },
    {
        title: "🔄 Planetary Orbits",
        description:
            "Planets stay in orbit because their forward motion balances the gravitational pull of the Sun.",
        points: [
            "Gravity pulls inward",
            "Velocity keeps planets moving forward",
            "The result is a stable orbit",
        ],
        image: "/learn/planets/orbits.png",
        imageFit: "cover",
    },
    {
        title: "🌙 Moons & Rings",
        description:
            "Many planets have moons and rings formed from leftover debris or captured objects.",
        points: [
            "Moons stabilize planetary tilt",
            "Rings are made of ice and rock",
            "Gas giants host dozens of moons",
        ],
        image: "/learn/planets/moons.png",
        imageFit: "cover",
    },
]

export default function PlanetsPage() {
    const [index, setIndex] = useState(0)

    const next = () =>
        setIndex((i) => Math.min(i + 1, planetSlides.length - 1))
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
                                <span className="text-foreground">How </span>
                                <span className="text-primary text-glow">Planets</span>
                                <span className="text-foreground"> Form</span>
                            </h1>

                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Learn how planets are born, how they move, and why each world in
                                our solar system is unique.
                            </p>

                            <p className="text-sm text-muted-foreground/80 pt-4">
                                Swipe or use arrows to explore 🌍
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
                                    disabled={index === planetSlides.length - 1}
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
                                    {planetSlides.map((slide, i) => (
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

                    </div>
                </div>
            </PageTransition>

            <Chatbot />
        </main>
    )
}

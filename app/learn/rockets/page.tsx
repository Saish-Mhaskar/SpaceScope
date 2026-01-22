"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { ChevronLeft, ChevronRight } from "lucide-react"

const rocketSlides = [
    {
        title: "🚀 Thrust & Propulsion",
        description:
            "Rockets work on Newton's Third Law — for every action, there is an equal and opposite reaction.",
        points: [
            "Fuel burns to produce hot gases",
            "Gases are expelled downward at high speed",
            "The rocket is pushed upward",
        ],
        image: "/learn/rockets/thrust-diagram.png",
        imageFit: "contain",
    },
    {
        title: "🧩 Rocket Stages",
        description:
            "Most rockets use multiple stages to efficiently reach space.",
        points: [
            "Each stage has its own engines and fuel",
            "Empty stages are dropped to reduce weight",
            "Later stages operate in thinner atmosphere or space",
        ],
        image: "/learn/rockets/stages.png",
        imageFit: "contain",
    },
    {
        title: "🌍 Escaping Earth’s Gravity",
        description:
            "To stay in orbit, rockets must reach extremely high horizontal speeds — not just go straight up.",
        points: [
            "Low Earth Orbit requires ~7.8 km/s",
            "Orbit is continuous free-fall",
            "Precise speed and angle are critical",
        ],
        image: "/learn/rockets/orbit.png",
        imageFit: "cover",
    },
]

export default function RocketsPage() {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((i) => Math.min(i + 1, rocketSlides.length - 1))
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
                                <span className="text-primary text-glow">Rockets</span>
                                <span className="text-foreground"> Work</span>
                            </h1>

                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Learn how rockets generate thrust, escape Earth&apos;s gravity,
                                and carry satellites and humans into space.
                            </p>


                            <p className="text-sm text-muted-foreground/80 pt-4">
                                Swipe or use arrows to explore 🚀
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
                                    disabled={index === rocketSlides.length - 1}
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
                                    {rocketSlides.map((slide, i) => (
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
                                Why Rockets Matter
                            </h3>
                            <p className="text-muted-foreground max-w-3xl mx-auto">
                                Rockets make modern space exploration possible — from GPS and
                                weather satellites to space stations, Moon missions, and
                                interplanetary exploration.
                            </p>
                        </section>

                    </div>
                </div>
            </PageTransition>

            <Chatbot />
        </main>
    )
}

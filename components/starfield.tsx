"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleDelay: number
}

export function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null)

  const stars: Star[] = Array.from({ length: 200 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    twinkleDelay: Math.random() * 5,
  }))

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.12 0.02 260) 0%, oklch(0.06 0.01 260) 50%, oklch(0.03 0.01 260) 100%)",
      }}
    >
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor:
              i % 10 === 0 ? "oklch(0.8 0.15 220)" : i % 15 === 0 ? "oklch(0.9 0.15 90)" : "oklch(0.98 0.01 260)",
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.twinkleDelay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Nebula effects */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.5 0.15 280 / 0.3) 0%, transparent 70%)",
          top: "10%",
          right: "-20%",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.18 195 / 0.2) 0%, transparent 70%)",
          bottom: "20%",
          left: "-10%",
        }}
      />
    </div>
  )
}

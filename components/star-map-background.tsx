"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Star {
  x: number
  y: number
  size: number
  brightness: number
}

export function StarMapBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 300 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      brightness: Math.random(),
    })),
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.1 0.02 260) 0%, oklch(0.05 0.01 260) 50%, oklch(0.02 0.01 260) 100%)",
      }}
    >
      {/* Parallax star layers */}
      {[0.02, 0.04, 0.06].map((parallaxFactor, layerIndex) => (
        <div
          key={layerIndex}
          className="absolute inset-0"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * parallaxFactor * 100}px, ${(mousePos.y - 0.5) * parallaxFactor * 100}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {stars.slice(layerIndex * 100, (layerIndex + 1) * 100).map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size * (1 + layerIndex * 0.3),
                height: star.size * (1 + layerIndex * 0.3),
                backgroundColor: layerIndex === 2 ? "oklch(0.85 0.12 200)" : "oklch(0.95 0.02 260)",
              }}
              animate={{
                opacity: [star.brightness * 0.5, star.brightness, star.brightness * 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      ))}

      {/* Constellation lines overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <line x1="20%" y1="30%" x2="35%" y2="25%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="35%" y1="25%" x2="45%" y2="35%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="45%" y1="35%" x2="55%" y2="30%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="70%" y1="60%" x2="80%" y2="55%" stroke="var(--primary)" strokeWidth="0.5" />
        <line x1="80%" y1="55%" x2="85%" y2="70%" stroke="var(--primary)" strokeWidth="0.5" />
      </svg>

      {/* Nebula effects */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.5 0.15 280 / 0.4) 0%, transparent 70%)",
          top: "20%",
          right: "-10%",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.15 200 / 0.3) 0%, transparent 70%)",
          bottom: "10%",
          left: "10%",
        }}
      />
    </div>
  )
}

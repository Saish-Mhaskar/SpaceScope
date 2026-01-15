"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { Constellation } from "@/lib/data/constellations"
import { Calendar, Compass } from "lucide-react"

interface ConstellationCardProps {
  constellation: Constellation
  index: number
}

export function ConstellationCard({ constellation, index }: ConstellationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/constellations/${constellation.id}`}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative h-full rounded-2xl glass border border-border/50 hover:border-primary/50 overflow-hidden cursor-pointer"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={constellation.image}
              alt={constellation.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            {/* Stars overlay effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {constellation.name}
              </h3>
              <span className="text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded">
                {constellation.abbreviation}
              </span>
            </div>

            <p className="text-sm text-muted-foreground italic mb-4">{constellation.latinName}</p>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{constellation.bestViewing.slice(0, 2).join(", ")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-primary" />
                <span>{constellation.direction}</span>
              </div>
            </div>

            {/* Brightest stars */}
            <div className="mt-4 flex flex-wrap gap-2">
              {constellation.brightestStars.slice(0, 3).map((star) => (
                <span
                  key={star}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                >
                  {star}
                </span>
              ))}
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div
              className="absolute inset-0 blur-2xl"
              style={{
                background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import type { Mission } from "@/lib/data/missions"
import { cn } from "@/lib/utils"
import { Calendar, Building2 } from "lucide-react"

interface MissionCardProps {
  mission: Mission
  index: number
  onSelect: (mission: Mission) => void
}

export function MissionCard({ mission, index, onSelect }: MissionCardProps) {
  const statusColors = {
    past: "border-muted-foreground/30 bg-muted/20",
    current: "border-primary/50 bg-primary/10",
    upcoming: "border-accent/50 bg-accent/10",
  }

  const statusLabels = {
    past: { text: "Completed", color: "text-muted-foreground" },
    current: { text: "Active", color: "text-primary" },
    upcoming: { text: "Upcoming", color: "text-accent" },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => onSelect(mission)}
        className={cn(
          "group relative h-full rounded-2xl glass border cursor-pointer overflow-hidden",
          statusColors[mission.status],
        )}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={mission.image}
            alt={mission.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium glass border",
                statusColors[mission.status],
                statusLabels[mission.status].color,
              )}
            >
              {statusLabels[mission.status].text}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {mission.name}
          </h3>

          <p className="text-sm text-muted-foreground italic mb-4">"{mission.tagline}"</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>{mission.agency}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(mission.launchDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
              </span>
            </div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            View details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0 blur-2xl"
            style={{
              background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import type { SpaceEvent } from "@/lib/data/community"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Users, Radio, Rocket, Moon, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const typeIcons: Record<string, typeof Rocket> = {
  launch: Rocket,
  eclipse: Moon,
  "meteor-shower": Star,
  conjunction: Star,
  livestream: Radio,
}

const typeColors: Record<string, string> = {
  launch: "border-primary/50 bg-primary/10",
  eclipse: "border-accent/50 bg-accent/10",
  "meteor-shower": "border-chart-4/50 bg-chart-4/10",
  conjunction: "border-chart-2/50 bg-chart-2/10",
  livestream: "border-destructive/50 bg-destructive/10",
}

interface EventCardProps {
  event: SpaceEvent
  index: number
  onJoinStream?: (event: SpaceEvent) => void
}

export function EventCard({ event, index, onJoinStream }: EventCardProps) {
  const Icon = typeIcons[event.type] || Star

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("group relative p-6 rounded-2xl glass border overflow-hidden", typeColors[event.type])}
    >
      {/* Live indicator */}
      {event.isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
          </span>
          <span className="text-xs font-semibold text-destructive">LIVE</span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={cn("p-3 rounded-xl", event.isLive ? "bg-destructive/20" : "bg-secondary/50")}
        >
          <Icon className={cn("w-6 h-6", event.isLive ? "text-destructive" : "text-foreground")} />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          {event.host && <p className="text-sm text-primary mb-2">Hosted by {event.host}</p>}

          <p className="text-muted-foreground text-sm mb-4">{event.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            {event.viewers && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{event.viewers.toLocaleString()} watching</span>
              </div>
            )}
          </div>

          {/* Join button for livestreams */}
          {event.isLive && onJoinStream && (
            <Button onClick={() => onJoinStream(event)} className="mt-4 gap-2" size="sm">
              <Play className="w-4 h-4" />
              Watch Live
            </Button>
          )}
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
  )
}

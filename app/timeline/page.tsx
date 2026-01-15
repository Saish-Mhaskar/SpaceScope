"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { MissionModal } from "@/components/mission-modal"
import { missions, type Mission } from "@/lib/data/missions"
import { cn } from "@/lib/utils"
import { GripHorizontal } from "lucide-react"

// Sort missions by date
const sortedMissions = [...missions].sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime())

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [hoveredMission, setHoveredMission] = useState<Mission | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const x = useMotionValue(0)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && timelineRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const timelineWidth = timelineRef.current.scrollWidth
        setConstraints({
          left: -(timelineWidth - containerWidth + 100),
          right: 100,
        })
      }
    }

    updateConstraints()
    window.addEventListener("resize", updateConstraints)
    return () => window.removeEventListener("resize", updateConstraints)
  }, [])

  // Handle wheel scroll for horizontal movement
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY || e.deltaX
      const newX = Math.max(constraints.left, Math.min(constraints.right, x.get() - delta))
      animate(x, newX, { type: "spring", stiffness: 300, damping: 30 })
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [constraints, x])

  // Get year from date
  const getYear = (dateStr: string) => new Date(dateStr).getFullYear()

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />
      <Navigation />

      <PageTransition>
        <div className="flex flex-col min-h-screen">
          {/* Header - compact top section */}
          <div className="pt-24 pb-4 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                <span className="text-foreground">Space Exploration </span>
                <span className="text-primary text-glow">Timeline</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
                Journey through the history of humanity's greatest achievements in space exploration.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <GripHorizontal className="w-4 h-4" />
                <span>Scroll, drag, or use mouse wheel to navigate</span>
              </div>
            </motion.div>
          </div>

          <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing flex items-center"
          >
            {/* Timeline Track */}
            <motion.div
              ref={timelineRef}
              drag="x"
              dragConstraints={constraints}
              style={{ x }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              className="absolute inset-y-0 flex items-center px-20"
            >
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 timeline-rail">
                {/* Energy pulse effect */}
                <div className="timeline-pulse" />
              </div>

              {/* Timeline content */}
              <div className="flex items-center gap-4">
                {sortedMissions.map((mission, index) => {
                  const year = getYear(mission.launchDate)
                  const isHovered = hoveredMission?.id === mission.id

                  return (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="relative flex flex-col items-center"
                      style={{ minWidth: "120px" }}
                    >
                      {/* Year label - alternating top/bottom */}
                      <div className={cn("absolute text-xs font-mono", index % 2 === 0 ? "-top-20" : "-bottom-20")}>
                        <span className="text-muted-foreground">{year}</span>
                      </div>

                      <div
                        className={cn(
                          "absolute w-px",
                          index % 2 === 0 ? "-top-14 h-14" : "-bottom-14 h-14",
                          mission.status === "current"
                            ? "bg-gradient-to-b from-primary/80 to-primary/20"
                            : mission.status === "upcoming"
                              ? "bg-gradient-to-b from-accent/60 to-accent/20"
                              : "bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/10",
                        )}
                        style={{
                          boxShadow:
                            mission.status === "current"
                              ? "0 0 6px var(--primary)"
                              : mission.status === "upcoming"
                                ? "0 0 4px var(--accent)"
                                : undefined,
                        }}
                      />

                      <motion.button
                        onClick={() => !isDragging && setSelectedMission(mission)}
                        onHoverStart={() => setHoveredMission(mission)}
                        onHoverEnd={() => setHoveredMission(null)}
                        whileHover={{ scale: 1.6 }}
                        whileTap={{ scale: 0.9 }}
                        className={cn(
                          "relative w-5 h-5 rounded-full transition-all z-10 border-2",
                          mission.status === "past" && "bg-muted-foreground/80 border-muted-foreground",
                          mission.status === "current" && "bg-primary border-primary",
                          mission.status === "upcoming" && "bg-accent border-accent",
                        )}
                        style={{
                          boxShadow: isHovered
                            ? `0 0 20px ${mission.status === "current" ? "var(--primary)" : mission.status === "upcoming" ? "var(--accent)" : "rgba(150,150,170,0.6)"}, 0 0 40px ${mission.status === "current" ? "var(--primary)" : mission.status === "upcoming" ? "var(--accent)" : "rgba(150,150,170,0.4)"}`
                            : mission.status === "current"
                              ? "0 0 15px var(--primary), 0 0 30px rgba(0,255,255,0.3)"
                              : mission.status === "upcoming"
                                ? "0 0 10px var(--accent)"
                                : "0 0 8px rgba(120,120,140,0.5)",
                        }}
                      >
                        {/* Pulse animation for current missions */}
                        {mission.status === "current" && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-primary"
                            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </motion.button>

                      {/* Hover tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: index % 2 === 0 ? 10 : -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: index % 2 === 0 ? 10 : -10, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                              "absolute z-20 w-64 p-4 rounded-xl glass-strong border border-border/50",
                              index % 2 === 0 ? "top-12" : "bottom-12",
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={mission.image || "/placeholder.svg"}
                                alt={mission.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground text-sm truncate">{mission.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(mission.launchDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-xs text-primary italic mt-2 line-clamp-2">"{mission.tagline}"</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">Click to view details</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Edge fade effects */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          </div>

          {/* Legend & Stats - compact bottom section */}
          <div className="pb-8 px-4">
            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 text-sm mb-6"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full bg-muted-foreground"
                  style={{ boxShadow: "0 0 8px rgba(100,100,120,0.5)" }}
                />
                <span className="text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary relative">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                </div>
                <span className="text-muted-foreground">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" style={{ boxShadow: "0 0 8px var(--accent)" }} />
                <span className="text-muted-foreground">Upcoming</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {[
                { label: "Total Missions", value: missions.length },
                { label: "Completed", value: missions.filter((m) => m.status === "past").length },
                { label: "Active", value: missions.filter((m) => m.status === "current").length },
                { label: "Upcoming", value: missions.filter((m) => m.status === "upcoming").length },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-4 rounded-xl glass border border-border/50 text-center"
                >
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </PageTransition>

      {/* Mission Modal */}
      <MissionModal mission={selectedMission} onClose={() => setSelectedMission(null)} />

      <Chatbot />
    </main>
  )
}

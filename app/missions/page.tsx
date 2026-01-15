"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { MissionCard } from "@/components/mission-card"
import { MissionModal } from "@/components/mission-modal"
import { missions, type Mission } from "@/lib/data/missions"
import { cn } from "@/lib/utils"

type FilterStatus = "all" | "past" | "current" | "upcoming"

const filters: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All Missions" },
  { value: "past", label: "Past" },
  { value: "current", label: "Current" },
  { value: "upcoming", label: "Upcoming" },
]

export default function MissionsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all")
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)

  const filteredMissions = useMemo(() => {
    if (activeFilter === "all") return missions
    return missions.filter((m) => m.status === activeFilter)
  }, [activeFilter])

  return (
    <main className="relative min-h-screen">
      <Starfield />
      <Navigation />

      <PageTransition>
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Space </span>
                <span className="text-primary text-glow">Missions</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore the greatest achievements in space exploration, from historic Moon landings to cutting-edge Mars
                rovers.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors",
                    activeFilter === filter.value
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground glass",
                  )}
                >
                  {activeFilter === filter.value && (
                    <motion.div
                      layoutId="filter-indicator"
                      className="absolute inset-0 bg-primary rounded-full glow-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Mission Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredMissions.map((mission, index) => (
                  <MissionCard key={mission.id} mission={mission} index={index} onSelect={setSelectedMission} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filteredMissions.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <p className="text-muted-foreground text-lg">No missions found for this filter.</p>
              </motion.div>
            )}
          </div>
        </div>
      </PageTransition>

      {/* Mission Modal */}
      <MissionModal mission={selectedMission} onClose={() => setSelectedMission(null)} />

      <Chatbot />
    </main>
  )
}

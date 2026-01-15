"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Mission } from "@/lib/data/missions"
import { X, Calendar, Building2, Rocket, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MissionModalProps {
  mission: Mission | null
  onClose: () => void
}

export function MissionModal({ mission, onClose }: MissionModalProps) {
  if (!mission) return null

  return (
    <AnimatePresence>
      {mission && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-[700px] md:max-w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl glass-strong border border-border/50"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg glass hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Image header */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={mission.image || "/placeholder.svg"}
                alt={mission.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              {/* Mission name overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{mission.name}</h2>
                  <p className="text-lg text-primary italic">"{mission.tagline}"</p>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Meta info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-6"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{mission.agency}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">
                    {new Date(mission.launchDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
                  <Rocket className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground capitalize">{mission.status}</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">About the Mission</h3>
                <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
              </motion.div>

              {/* Highlights */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h3 className="text-lg font-semibold text-foreground mb-3">Mission Highlights</h3>
                <ul className="space-y-3">
                  {mission.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Close button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex justify-end"
              >
                <Button onClick={onClose} variant="outline" className="bg-transparent">
                  Close
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

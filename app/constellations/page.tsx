"use client"

import { motion } from "framer-motion"
import { StarMapBackground } from "@/components/star-map-background"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { ConstellationCard } from "@/components/constellation-card"
import { constellations } from "@/lib/data/constellations"

export default function ConstellationsPage() {
  return (
    <main className="relative min-h-screen">
      <StarMapBackground />
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
                <span className="text-foreground">Night Sky </span>
                <span className="text-primary text-glow">Constellations</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover ancient star patterns, their mythological origins, and learn how to find them in your night
                sky.
              </p>
            </motion.div>

            {/* Constellation Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {constellations.map((constellation, index) => (
                <ConstellationCard key={constellation.id} constellation={constellation} index={index} />
              ))}
            </div>
          </div>
        </div>
      </PageTransition>

      <Chatbot />
    </main>
  )
}

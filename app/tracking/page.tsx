"use client"

import { motion } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { EarthTracker } from "@/components/earth-tracker"

export default function TrackingPage() {
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
                <span className="text-foreground">Live Satellite </span>
                <span className="text-primary text-glow">Tracking</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Track the International Space Station and other satellites as they orbit Earth in real-time.
              </p>
            </motion.div>

            {/* Earth Tracker */}
            <EarthTracker />
          </div>
        </div>
      </PageTransition>

      <Chatbot />
    </main>
  )
}

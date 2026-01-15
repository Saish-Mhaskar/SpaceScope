"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { EventCard } from "@/components/event-card"
import { LiveStreamModal } from "@/components/live-stream-modal"
import { spaceEvents, type SpaceEvent } from "@/lib/data/community"
import { Users, Radio, Calendar } from "lucide-react"

export default function CommunityPage() {
  const [selectedStream, setSelectedStream] = useState<SpaceEvent | null>(null)

  const liveEvents = spaceEvents.filter((e) => e.isLive)
  const upcomingEvents = spaceEvents.filter((e) => !e.isLive)

  return (
    <main className="relative min-h-screen">
      <Starfield />
      <Navigation />

      <PageTransition>
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/30 mb-6"
              >
                <Users className="w-10 h-10 text-primary" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Space </span>
                <span className="text-primary text-glow">Community</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join fellow space enthusiasts for live events, launches, and cosmic phenomena. Watch together and share
                the wonder.
              </p>
            </motion.div>

            {/* Live Now Section */}
            {liveEvents.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Radio className="w-5 h-5 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Live Now</h2>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {liveEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} onJoinStream={setSelectedStream} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Upcoming Events */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            </motion.section>

            {/* Community stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {[
                { label: "Active Members", value: "12.5K" },
                { label: "Events This Month", value: "8" },
                { label: "Hours Streamed", value: "156" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-6 rounded-xl glass border border-border/50 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </PageTransition>

      {/* Live Stream Modal */}
      <LiveStreamModal event={selectedStream} onClose={() => setSelectedStream(null)} />

      <Chatbot />
    </main>
  )
}

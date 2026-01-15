"use client"

import { motion } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { EarthGlobe } from "@/components/earth-globe"
import { FeatureCard } from "@/components/feature-card"
import { Chatbot } from "@/components/chatbot"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const features = [
  {
    title: "Missions Explorer",
    description: "Discover past, current, and upcoming space missions from agencies around the world.",
    icon: "rocket",
    href: "/missions",
  },
  {
    title: "Space Timeline",
    description: "Journey through the history of space exploration with our interactive timeline.",
    icon: "clock",
    href: "/timeline",
  },
  {
    title: "Constellations Near You",
    description: "Find constellations in your night sky with simulated telescope directions.",
    icon: "star",
    href: "/constellations",
  },
  {
    title: "ISS & Satellite Tracking",
    description: "Track the International Space Station and satellites in real-time.",
    icon: "satellite",
    href: "/tracking",
  },
  {
    title: "Learning Hub",
    description: "Learn how rockets work, orbital mechanics, black holes, and more.",
    icon: "book",
    href: "/learn",
  },
  {
    title: "Community Space Events",
    description: "Join live streams and discussions about cosmic events with fellow enthusiasts.",
    icon: "users",
    href: "/community",
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />
      <Navigation />

      <PageTransition>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm text-primary mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Explore the cosmos
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                <span className="text-foreground">Explore Space</span>
                <br />
                <span className="text-primary text-glow">Like Never Before</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Missions, satellites, constellations, and live cosmic events — all in one immersive experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/missions">
                  <Button size="lg" className="glow-primary text-base px-8">
                    Explore Missions
                  </Button>
                </Link>
                <Link href="/timeline">
                  <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                    View Timeline
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Earth Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <EarthGlobe />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Discover the Universe</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From historic Moon landings to real-time satellite tracking, SpaceScope brings space exploration to your
                fingertips.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 border border-border/50"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to Launch Your Journey?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Start exploring the interactive timeline and discover the milestones that shaped our understanding of the
              cosmos.
            </p>
            <Link href="/timeline">
              <Button size="lg" className="glow-primary text-base px-10">
                Launch Timeline
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative py-8 px-4 border-t border-border/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>SpaceScope — Interactive Space Exploration</p>
            <p>Built with passion for the cosmos</p>
          </div>
        </footer>
      </PageTransition>

      <Chatbot />
    </main>
  )
}

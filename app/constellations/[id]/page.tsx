"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import Link from "next/link"
import { StarMapBackground } from "@/components/star-map-background"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { TelescopeDirection } from "@/components/telescope-direction"
import { constellations } from "@/lib/data/constellations"
import { ArrowLeft, Star, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConstellationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const constellation = constellations.find((c) => c.id === id)

  if (!constellation) {
    notFound()
  }

  return (
    <main className="relative min-h-screen">
      <StarMapBackground />
      <Navigation />

      <PageTransition>
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back button */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
              <Link href="/constellations">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Constellations
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left column - Image and info */}
              <div className="space-y-6">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden aspect-video"
                >
                  <img
                    src={constellation.image || "/placeholder.svg"}
                    alt={constellation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </motion.div>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-4xl font-bold text-foreground mb-2">{constellation.name}</h1>
                      <p className="text-lg text-muted-foreground italic">{constellation.latinName}</p>
                    </div>
                    <span className="text-2xl font-mono text-primary bg-primary/10 px-4 py-2 rounded-lg border border-primary/30">
                      {constellation.abbreviation}
                    </span>
                  </div>
                </motion.div>

                {/* Mythology */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl glass border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/30">
                      <BookOpen className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground">Mythology & Origin</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{constellation.mythology}</p>
                </motion.div>

                {/* Best viewing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl glass border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Best Viewing Months</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {constellation.bestViewing.map((month) => (
                      <span
                        key={month}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/30"
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Brightest stars */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 rounded-2xl glass border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Brightest Stars</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {constellation.brightestStars.map((star, index) => (
                      <motion.div
                        key={star}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="text-center p-4 rounded-xl bg-secondary/50"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 10px var(--primary)",
                              "0 0 20px var(--primary)",
                              "0 0 10px var(--primary)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                          className="w-4 h-4 mx-auto mb-2 rounded-full bg-primary"
                        />
                        <p className="text-sm font-medium text-foreground">{star}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right column - Telescope direction */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <TelescopeDirection constellation={constellation} />
              </motion.div>
            </div>
          </div>
        </div>
      </PageTransition>

      <Chatbot />
    </main>
  )
}

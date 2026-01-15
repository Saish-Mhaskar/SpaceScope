"use client"

import { motion } from "framer-motion"
import { Starfield } from "@/components/starfield"
import { Navigation } from "@/components/navigation"
import { PageTransition } from "@/components/page-transition"
import { Chatbot } from "@/components/chatbot"
import { LearningCard } from "@/components/learning-card"
import { learningTopics } from "@/lib/data/learning"
import { GraduationCap } from "lucide-react"

export default function LearnPage() {
  return (
    <main className="relative min-h-screen">
      <Starfield />
      <Navigation />

      <PageTransition>
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
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
                <GraduationCap className="w-10 h-10 text-primary" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Learning </span>
                <span className="text-primary text-glow">Hub</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover the science behind space exploration. From rocket propulsion to black holes, expand your
                knowledge of the cosmos.
              </p>
            </motion.div>

            {/* Learning Topics */}
            <div className="space-y-6">
              {learningTopics.map((topic, index) => (
                <LearningCard key={topic.id} topic={topic} index={index} />
              ))}
            </div>

            {/* Fun fact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 p-6 rounded-2xl glass border border-accent/30 text-center"
            >
              <p className="text-sm text-accent mb-2">Did you know?</p>
              <p className="text-foreground">
                A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once, but only 225
                Earth days to orbit the Sun!
              </p>
            </motion.div>
          </div>
        </div>
      </PageTransition>

      <Chatbot />
    </main>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { LearningTopic } from "@/lib/data/learning"
import { Rocket, Circle, Satellite, ChevronDown } from "lucide-react"

const iconMap: Record<string, typeof Rocket> = {
  rocket: Rocket,
  orbit: Circle,
  circle: Circle,
  satellite: Satellite,
}

interface LearningCardProps {
  topic: LearningTopic
  index: number
}

export function LearningCard({ topic, index }: LearningCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const Icon = iconMap[topic.icon] || Rocket

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl glass border border-border/50 overflow-hidden"
    >
      {/* Header */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full p-6 text-left group">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-3 rounded-xl bg-primary/10 border border-primary/30"
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {topic.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{topic.summary}</p>
          </div>

          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 space-y-3 border-t border-border/50 pt-4">
              {topic.sections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="rounded-xl bg-secondary/50"
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-foreground">{section.title}</span>
                    <motion.div animate={{ rotate: expandedSection === sectionIndex ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSection === sectionIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-muted-foreground leading-relaxed">{section.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

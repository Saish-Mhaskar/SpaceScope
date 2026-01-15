"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Rocket, Clock, Star, Satellite, BookOpen, Users, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  clock: Clock,
  star: Star,
  satellite: Satellite,
  book: BookOpen,
  users: Users,
}

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  href: string
  index: number
}

export function FeatureCard({ title, description, icon, href, index }: FeatureCardProps) {
  const Icon = iconMap[icon] || Rocket

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative h-full p-6 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-colors overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0 blur-2xl"
              style={{
                background: "radial-gradient(circle at center, var(--glow-primary) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/30 mb-4"
            >
              <Icon className="w-6 h-6 text-primary" />
            </motion.div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

            {/* Arrow indicator */}
            <motion.div
              className="mt-4 flex items-center gap-2 text-primary text-sm font-medium"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              Explore
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function LearningCard({ topic, index }: any) {
  const Icon = topic.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={topic.href}>
        <div
          className="
            group cursor-pointer
            glass rounded-2xl border border-border/40
            p-6 flex items-center justify-between
            transition-all duration-300 ease-out

            hover:-translate-y-1
            hover:border-primary/40
            hover:shadow-[0_0_35px_hsl(var(--primary)/0.18)]
          "
        >
          {/* LEFT */}
          <div className="flex items-start gap-4">
            <div
              className="
                p-3 rounded-xl
                bg-primary/10 border border-primary/30
                group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.35)]
                transition
              "
            >
              <Icon className="w-6 h-6 text-primary" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {topic.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {topic.description}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <ChevronRight
            className="
              w-5 h-5 text-muted-foreground
              group-hover:text-primary
              group-hover:translate-x-1
              transition
            "
          />
        </div>
      </Link>
    </motion.div>
  )
}

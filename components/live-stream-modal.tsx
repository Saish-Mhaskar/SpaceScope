"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { SpaceEvent } from "@/lib/data/community"
import { X, Users, Heart, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Comment {
  id: string
  user: string
  text: string
  timestamp: Date
}

const randomUsers = ["StarGazer42", "CosmicExplorer", "NebulaNomad", "OrbitObserver", "GalaxyGuide", "AstroAdventurer"]

const randomComments = [
  "This is amazing!",
  "The ISS looks incredible from here",
  "Can we see the aurora?",
  "Best view of Earth ever!",
  "Hello from Tokyo!",
  "Science is beautiful",
  "Living my dream vicariously",
  "The curvature is so clear!",
]

interface LiveStreamModalProps {
  event: SpaceEvent | null
  onClose: () => void
}

export function LiveStreamModal({ event, onClose }: LiveStreamModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [viewers, setViewers] = useState(event?.viewers || 0)
  const [hasLiked, setHasLiked] = useState(false)
  const [reactions, setReactions] = useState<{ id: string; emoji: string; x: number }[]>([])

  // Simulate incoming comments
  useEffect(() => {
    if (!event) return

    const interval = setInterval(() => {
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)]
      const randomText = randomComments[Math.floor(Math.random() * randomComments.length)]

      setComments((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now().toString(),
          user: randomUser,
          text: randomText,
          timestamp: new Date(),
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [event])

  // Simulate viewer count changes
  useEffect(() => {
    if (!event) return

    const interval = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 10) - 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [event])

  const handleSendComment = () => {
    if (!newComment.trim()) return

    setComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: "You",
        text: newComment.trim(),
        timestamp: new Date(),
      },
    ])
    setNewComment("")
  }

  const handleReaction = (emoji: string) => {
    const id = Date.now().toString()
    const x = Math.random() * 80 + 10

    setReactions((prev) => [...prev, { id, emoji, x }])

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id))
    }, 2000)
  }

  if (!event) return null

  return (
    <AnimatePresence>
      {event && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-8 z-50 flex flex-col lg:flex-row gap-4 max-h-[90vh]"
          >
            {/* Video area */}
            <div className="flex-1 flex flex-col rounded-2xl overflow-hidden glass-strong border border-border/50">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
                    </span>
                    <span className="text-sm font-semibold text-destructive">LIVE</span>
                  </div>
                  <span className="text-foreground font-medium">{event.title}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{viewers.toLocaleString()}</span>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Video placeholder */}
              <div className="flex-1 relative bg-secondary/50 flex items-center justify-center overflow-hidden">
                {/* Simulated space view */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />

                {/* Animated stars */}
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-foreground/50 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                {/* Earth curve */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[40%] rounded-t-[100%]"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.35 0.1 200) 0%, oklch(0.25 0.15 180) 50%, transparent 100%)",
                  }}
                />

                {/* Floating reactions */}
                {reactions.map((reaction) => (
                  <motion.div
                    key={reaction.id}
                    initial={{ y: 100, opacity: 1, x: `${reaction.x}%` }}
                    animate={{ y: -100, opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute bottom-20 text-2xl"
                  >
                    {reaction.emoji}
                  </motion.div>
                ))}

                {/* Overlay text */}
                <div className="relative z-10 text-center">
                  <p className="text-foreground font-medium mb-2">Live from Space</p>
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={hasLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setHasLiked(!hasLiked)}
                    className={cn("gap-2", hasLiked && "bg-destructive hover:bg-destructive/90")}
                  >
                    <Heart className={cn("w-4 h-4", hasLiked && "fill-current")} />
                    {hasLiked ? "Liked" : "Like"}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {["🚀", "🌟", "❤️", "🔭"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat sidebar */}
            <div className="w-full lg:w-[350px] flex flex-col rounded-2xl glass-strong border border-border/50 max-h-[300px] lg:max-h-none">
              <div className="p-4 border-b border-border/50 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Live Chat</span>
              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs text-primary">{comment.user[0]}</span>
                    </div>
                    <div>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          comment.user === "You" ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {comment.user}
                      </span>
                      <p className="text-sm text-foreground">{comment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendComment()
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Send a message..."
                    className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
                  />
                  <Button type="submit" size="icon" disabled={!newComment.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

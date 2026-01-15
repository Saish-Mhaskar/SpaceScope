"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const botResponses: Record<string, string> = {
  default:
    "I'm SpaceScope AI, your guide to the cosmos! I can help you explore missions, learn about constellations, track satellites, and discover amazing facts about space. What would you like to know?",
  mission:
    "We have information on many historic and current missions! From Apollo 11's historic Moon landing to the James Webb Space Telescope's incredible discoveries. Visit our Missions page to explore them all, or ask me about a specific mission!",
  constellation:
    "The night sky is full of ancient stories! I can tell you about constellations like Orion the Hunter, the Big Dipper, or Scorpius. Our Constellations page even has a simulated telescope direction feature to help you find them!",
  iss: "The International Space Station orbits Earth at about 420 km altitude, traveling at 27,600 km/h! It completes one orbit every 92 minutes. Check our Live Tracking page to see its current position!",
  satellite:
    "There are thousands of satellites orbiting Earth, from communication satellites to weather monitors and research platforms. Our Live Tracking page lets you explore different types and their orbits!",
  mars: "Mars is currently being explored by several missions! The Perseverance rover is collecting samples, Curiosity continues its journey, and upcoming missions aim to bring Martian samples back to Earth.",
  learn:
    "Want to learn about space? Our Learning Hub covers topics like how rockets work, orbital mechanics, black holes, and satellites. Perfect for curious minds of all ages!",
  jwst: "The James Webb Space Telescope is the largest optical telescope in space! Launched in 2021, it uses infrared observations to see the earliest galaxies and study exoplanet atmospheres.",
}

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("mission") || lowerMessage.includes("apollo") || lowerMessage.includes("artemis")) {
    return botResponses.mission
  }
  if (lowerMessage.includes("constellation") || lowerMessage.includes("star") || lowerMessage.includes("orion")) {
    return botResponses.constellation
  }
  if (lowerMessage.includes("iss") || lowerMessage.includes("space station")) {
    return botResponses.iss
  }
  if (lowerMessage.includes("satellite") || lowerMessage.includes("tracking")) {
    return botResponses.satellite
  }
  if (lowerMessage.includes("mars") || lowerMessage.includes("rover") || lowerMessage.includes("perseverance")) {
    return botResponses.mars
  }
  if (lowerMessage.includes("learn") || lowerMessage.includes("how") || lowerMessage.includes("what")) {
    return botResponses.learn
  }
  if (lowerMessage.includes("webb") || lowerMessage.includes("jwst") || lowerMessage.includes("telescope")) {
    return botResponses.jwst
  }

  return botResponses.default
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi, I'm SpaceScope AI! How can I help you explore space today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(
      () => {
        const response = getBotResponse(userMessage.content)
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full",
          "bg-primary text-primary-foreground",
          "shadow-lg hover:shadow-xl transition-shadow",
          isOpen && "hidden",
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: ["0 0 20px var(--glow-primary)", "0 0 40px var(--glow-primary)", "0 0 20px var(--glow-primary)"],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] rounded-2xl glass-strong border border-border/50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">SpaceScope AI</h3>
                  <p className="text-xs text-muted-foreground">Your space exploration guide</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md",
                    )}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about space..."
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
                />
                <Button type="submit" size="icon" className="rounded-xl" disabled={!input.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

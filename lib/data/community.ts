export interface SpaceEvent {
  id: string
  title: string
  type: "launch" | "eclipse" | "meteor-shower" | "conjunction" | "livestream"
  date: string
  time: string
  description: string
  isLive: boolean
  viewers?: number
  host?: string
}

export const spaceEvents: SpaceEvent[] = [
  {
    id: "artemis-launch",
    title: "Artemis II Launch Coverage",
    type: "launch",
    date: "2025-09-01",
    time: "14:00 UTC",
    description: "Watch live as NASA launches the first crewed Artemis mission to orbit the Moon.",
    isLive: false,
    host: "NASA",
  },
  {
    id: "solar-eclipse",
    title: "Total Solar Eclipse 2026",
    type: "eclipse",
    date: "2026-08-12",
    time: "Starting 09:00 UTC",
    description: "A total solar eclipse visible from Greenland, Iceland, and Spain.",
    isLive: false,
  },
  {
    id: "perseids",
    title: "Perseids Meteor Shower",
    type: "meteor-shower",
    date: "2025-08-12",
    time: "Peak viewing after midnight",
    description: "One of the best meteor showers of the year with up to 100 meteors per hour.",
    isLive: false,
  },
  {
    id: "jupiter-saturn",
    title: "Jupiter-Venus Conjunction",
    type: "conjunction",
    date: "2025-03-15",
    time: "Visible at dusk",
    description: "Jupiter and Venus appear close together in the evening sky.",
    isLive: false,
  },
  {
    id: "space-talk",
    title: "Live: Space Exploration Q&A",
    type: "livestream",
    date: "2025-01-20",
    time: "19:00 UTC",
    description: "Join our community experts for a live discussion about current space missions.",
    isLive: true,
    viewers: 1247,
    host: "SpaceScope Community",
  },
  {
    id: "iss-stream",
    title: "ISS Earth Views",
    type: "livestream",
    date: "2025-01-15",
    time: "24/7",
    description: "Live feed from the International Space Station cameras showing Earth from space.",
    isLive: true,
    viewers: 3891,
    host: "NASA",
  },
]

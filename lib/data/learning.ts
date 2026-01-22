import {
  Rocket,
  Orbit,
  Eclipse,
  Satellite,
  Globe,
} from "lucide-react"

export const learningTopics = [
  {
    id: "rockets",
    title: "How Rockets Work",
    description:
      "Understanding the science of propulsion and how rockets escape Earth's gravity.",
    icon: Rocket,
    href: "/learn/rockets",
  },
  {
    id: "planets",
    title: "Planets & Formation",
    description:
      "Learn how planets form, their types, and how they move through space.",
    icon: Globe,
    href: "/learn/planets",
  },
  {
    id: "orbits",
    title: "Orbital Mechanics",
    description:
      "Learn how objects stay in orbit and the physics behind satellite motion.",
    icon: Orbit,
    href: "/learn/orbits",
  },
  {
    id: "black-holes",
    title: "Black Holes",
    description:
      "Explore the most mysterious objects in the universe where gravity rules supreme.",
    icon: Eclipse,
    href: "/learn/black-holes",
  },
  {
    id: "satellites-earth",
    title: "Satellites & Earth",
    description:
      "Discover how artificial satellites orbit our planet and serve humanity.",
    icon: Satellite,
    href: "/learn/satellites-earth",
  },
]

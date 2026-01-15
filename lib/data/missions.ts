export interface Mission {
  id: string
  name: string
  agency: string
  launchDate: string
  status: "past" | "current" | "upcoming"
  tagline: string
  description: string
  image: string
  highlights: string[]
}

export const missions: Mission[] = [
  {
    id: "apollo-11",
    name: "Apollo 11",
    agency: "NASA",
    launchDate: "1969-07-16",
    status: "past",
    tagline: "One small step for man",
    description:
      "Apollo 11 was the spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin formed the American crew that landed the Apollo Lunar Module Eagle on July 20, 1969.",
    image: "/apollo-11-moon-landing.jpg",
    highlights: ["First Moon landing", "Neil Armstrong & Buzz Aldrin", "21 hours on lunar surface"],
  },
  {
    id: "voyager-1",
    name: "Voyager 1",
    agency: "NASA",
    launchDate: "1977-09-05",
    status: "current",
    tagline: "The farthest human-made object",
    description:
      "Voyager 1 is a space probe launched by NASA in 1977. It is now the farthest human-made object from Earth, operating in interstellar space.",
    image: "/voyager-spacecraft-deep-space.jpg",
    highlights: ["Interstellar space exploration", "Golden Record aboard", "14+ billion miles from Earth"],
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope",
    agency: "NASA/ESA",
    launchDate: "1990-04-24",
    status: "current",
    tagline: "Eye on the universe",
    description:
      "The Hubble Space Telescope is a space telescope that was launched into low Earth orbit in 1990 and remains in operation. It has revolutionized astronomy with its stunning images.",
    image: "/hubble-space-telescope-nebula.jpg",
    highlights: ["Over 1.5 million observations", "Deep field images", "Nobel Prize discoveries"],
  },
  {
    id: "curiosity",
    name: "Mars Curiosity Rover",
    agency: "NASA",
    launchDate: "2011-11-26",
    status: "current",
    tagline: "Exploring the Red Planet",
    description:
      "Curiosity is a car-sized Mars rover designed to explore the Gale crater on Mars as part of NASA's Mars Science Laboratory mission.",
    image: "/mars-curiosity-rover-red-planet.jpg",
    highlights: ["Discovered ancient water evidence", "Over 30km traveled", "Still operating since 2012"],
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    agency: "NASA/ESA/CSA",
    launchDate: "2021-12-25",
    status: "current",
    tagline: "Unfolding the universe",
    description:
      "The James Webb Space Telescope is the largest optical telescope in space, designed to conduct infrared astronomy. Its high resolution and sensitivity allows it to view objects too old and distant for Hubble.",
    image: "/james-webb-telescope-deep-space-galaxies.jpg",
    highlights: ["Largest space telescope", "Infrared capabilities", "Studying early universe"],
  },
  {
    id: "perseverance",
    name: "Mars Perseverance Rover",
    agency: "NASA",
    launchDate: "2020-07-30",
    status: "current",
    tagline: "Seeking signs of ancient life",
    description:
      "Perseverance is a Mars rover that landed on February 18, 2021. Part of NASA's Mars 2020 mission, it is designed to seek signs of ancient life and collect samples.",
    image: "/mars-perseverance-rover.jpg",
    highlights: ["Sample collection for return", "Ingenuity helicopter", "Jezero Crater exploration"],
  },
  {
    id: "artemis-ii",
    name: "Artemis II",
    agency: "NASA",
    launchDate: "2025-09-01",
    status: "upcoming",
    tagline: "Return to the Moon",
    description:
      "Artemis II will be the first crewed mission of NASA's Artemis program, taking astronauts around the Moon in preparation for future lunar landing missions.",
    image: "/artemis-moon-mission-spacecraft.jpg",
    highlights: ["First crewed lunar flyby since Apollo", "4 astronauts", "10-day mission"],
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    agency: "NASA",
    launchDate: "2024-10-14",
    status: "current",
    tagline: "Ocean world exploration",
    description:
      "Europa Clipper is a mission to conduct detailed reconnaissance of Jupiter's moon Europa and investigate whether it could harbor conditions suitable for life.",
    image: "/europa-moon-jupiter-ice-ocean.jpg",
    highlights: ["Ice shell investigation", "Subsurface ocean search", "Habitability assessment"],
  },
  {
    id: "dragonfly",
    name: "Dragonfly",
    agency: "NASA",
    launchDate: "2028-07-01",
    status: "upcoming",
    tagline: "Flying on Titan",
    description:
      "Dragonfly is a planned spacecraft and mission that will send a rotorcraft lander to Titan, Saturn's largest moon, to study prebiotic chemistry and habitability.",
    image: "/dragonfly-titan-saturn-moon-drone.jpg",
    highlights: ["First rotorcraft on another world", "Titan surface exploration", "Prebiotic chemistry study"],
  },
  {
    id: "mars-sample-return",
    name: "Mars Sample Return",
    agency: "NASA/ESA",
    launchDate: "2030-01-01",
    status: "upcoming",
    tagline: "Bringing Mars to Earth",
    description:
      "Mars Sample Return is a proposed mission to return samples collected by the Perseverance rover back to Earth for detailed analysis.",
    image: "/mars-sample-return-rocket.jpg",
    highlights: ["First Mars samples on Earth", "International collaboration", "Ancient life investigation"],
  },
]

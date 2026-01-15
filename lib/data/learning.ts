export interface LearningTopic {
  id: string
  title: string
  icon: string
  summary: string
  sections: {
    title: string
    content: string
  }[]
}

export const learningTopics: LearningTopic[] = [
  {
    id: "rockets",
    title: "How Rockets Work",
    icon: "rocket",
    summary: "Understanding the science of propulsion and how rockets escape Earth's gravity.",
    sections: [
      {
        title: "Newton's Third Law",
        content:
          "Rockets work on the principle of Newton's third law: for every action, there is an equal and opposite reaction. When hot gases are expelled from the rocket's engine at high speed, the rocket is pushed in the opposite direction.",
      },
      {
        title: "Fuel and Oxidizers",
        content:
          "Unlike jet engines, rockets carry both fuel and oxidizer because there's no air in space. Common combinations include liquid hydrogen with liquid oxygen, or RP-1 (refined kerosene) with liquid oxygen.",
      },
      {
        title: "Staging",
        content:
          "Multi-stage rockets drop empty fuel tanks as they ascend, reducing weight and improving efficiency. The Saturn V that took astronauts to the Moon had three stages.",
      },
    ],
  },
  {
    id: "orbital-mechanics",
    title: "Orbital Mechanics",
    icon: "orbit",
    summary: "Learn how objects stay in orbit and the physics behind satellite motion.",
    sections: [
      {
        title: "What is an Orbit?",
        content:
          "An orbit is the path an object takes around another object due to gravity. Satellites in orbit are actually falling towards Earth but moving sideways fast enough to keep missing it.",
      },
      {
        title: "Orbital Velocity",
        content:
          "To stay in low Earth orbit (about 400 km up), an object must travel at approximately 28,000 km/h. At this speed, the curve of its fall matches the curve of Earth.",
      },
      {
        title: "Types of Orbits",
        content:
          "Different orbits serve different purposes: Low Earth Orbit (LEO) for space stations, Medium Earth Orbit (MEO) for GPS, and Geostationary Orbit (GEO) for communication and weather satellites.",
      },
    ],
  },
  {
    id: "black-holes",
    title: "Black Holes",
    icon: "circle",
    summary: "Explore the most mysterious objects in the universe where gravity rules supreme.",
    sections: [
      {
        title: "What Creates a Black Hole?",
        content:
          "Black holes form when massive stars collapse at the end of their lives. The core collapses under its own gravity, creating a point of infinite density called a singularity.",
      },
      {
        title: "Event Horizon",
        content:
          "The event horizon is the boundary around a black hole beyond which nothing can escape, not even light. This is why black holes appear black.",
      },
      {
        title: "Types of Black Holes",
        content:
          "There are three main types: stellar black holes (a few times the Sun's mass), supermassive black holes (millions to billions of solar masses at galaxy centers), and intermediate black holes.",
      },
    ],
  },
  {
    id: "satellites",
    title: "Satellites & Earth",
    icon: "satellite",
    summary: "Discover how artificial satellites orbit our planet and serve humanity.",
    sections: [
      {
        title: "History of Satellites",
        content:
          "Sputnik 1, launched by the Soviet Union in 1957, was the first artificial satellite. Today, there are over 7,000 active satellites orbiting Earth.",
      },
      {
        title: "Types of Satellites",
        content:
          "Satellites serve many purposes: communication (TV, internet, phone), navigation (GPS), weather monitoring, Earth observation, and scientific research.",
      },
      {
        title: "Space Debris",
        content:
          "Defunct satellites and debris pose a growing threat. There are millions of debris pieces in orbit, and collisions can create even more debris in a cascade effect.",
      },
    ],
  },
]

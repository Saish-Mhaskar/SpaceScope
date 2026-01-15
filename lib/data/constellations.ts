export interface Constellation {
  id: string
  name: string
  latinName: string
  abbreviation: string
  mythology: string
  bestViewing: string[]
  brightestStars: string[]
  image: string
  direction: string
  elevation: string
}

export const constellations: Constellation[] = [
  {
    id: "orion",
    name: "Orion",
    latinName: "Orion",
    abbreviation: "Ori",
    mythology:
      "In Greek mythology, Orion was a giant huntsman whom Zeus placed among the stars. He is depicted as a hunter with a belt of three stars, holding a club and shield.",
    bestViewing: ["December", "January", "February"],
    brightestStars: ["Betelgeuse", "Rigel", "Bellatrix"],
    image: "/orion-constellation-stars-night-sky.jpg",
    direction: "South",
    elevation: "45°",
  },
  {
    id: "ursa-major",
    name: "Big Dipper",
    latinName: "Ursa Major",
    abbreviation: "UMa",
    mythology:
      "The Big Dipper is part of Ursa Major, the Great Bear. In Greek mythology, it represents Callisto, a nymph transformed into a bear by Zeus's jealous wife Hera.",
    bestViewing: ["March", "April", "May"],
    brightestStars: ["Dubhe", "Merak", "Alioth"],
    image: "/big-dipper-ursa-major-stars.jpg",
    direction: "North",
    elevation: "60°",
  },
  {
    id: "scorpius",
    name: "Scorpius",
    latinName: "Scorpius",
    abbreviation: "Sco",
    mythology:
      "Scorpius represents the scorpion that killed Orion in Greek mythology. The two constellations are placed on opposite sides of the sky so they are never visible at the same time.",
    bestViewing: ["July", "August"],
    brightestStars: ["Antares", "Shaula", "Sargas"],
    image: "/scorpius-constellation-stars.jpg",
    direction: "South",
    elevation: "25°",
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    latinName: "Cassiopeia",
    abbreviation: "Cas",
    mythology:
      "Named after the vain queen Cassiopeia in Greek mythology, who boasted about her beauty. She was placed in the sky as punishment, sometimes appearing upside-down.",
    bestViewing: ["October", "November", "December"],
    brightestStars: ["Schedar", "Caph", "Gamma Cassiopeiae"],
    image: "/cassiopeia-w-constellation-stars.jpg",
    direction: "North",
    elevation: "70°",
  },
  {
    id: "leo",
    name: "Leo",
    latinName: "Leo",
    abbreviation: "Leo",
    mythology:
      "Leo represents the Nemean Lion slain by Hercules as one of his twelve labors. The lion's skin was impervious to weapons, so Hercules had to strangle it.",
    bestViewing: ["March", "April", "May"],
    brightestStars: ["Regulus", "Denebola", "Algieba"],
    image: "/leo-constellation-stars-lion.jpg",
    direction: "East",
    elevation: "55°",
  },
  {
    id: "cygnus",
    name: "Cygnus",
    latinName: "Cygnus",
    abbreviation: "Cyg",
    mythology:
      "Cygnus represents a swan in Greek mythology. Various myths associate it with Zeus disguised as a swan, or with Orpheus transformed after his death.",
    bestViewing: ["July", "August", "September"],
    brightestStars: ["Deneb", "Albireo", "Sadr"],
    image: "/cygnus-swan-constellation-milky-way.jpg",
    direction: "Northeast",
    elevation: "65°",
  },
]

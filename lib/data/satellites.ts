export interface Satellite {
  id: string
  name: string
  type: "iss" | "communication" | "weather" | "research"
  altitude: number
  speed: number
  orbitPeriod: number
  description: string
  launchDate: string
}

export const satellites: Satellite[] = [
  {
    id: "iss",
    name: "International Space Station",
    type: "iss",
    altitude: 420,
    speed: 27600,
    orbitPeriod: 92,
    description:
      "The ISS is a modular space station in low Earth orbit. It serves as a microgravity and space environment research laboratory.",
    launchDate: "1998-11-20",
  },
  {
    id: "starlink-1",
    name: "Starlink Constellation",
    type: "communication",
    altitude: 550,
    speed: 27000,
    orbitPeriod: 95,
    description: "SpaceX's satellite internet constellation providing high-speed internet access globally.",
    launchDate: "2019-05-24",
  },
  {
    id: "goes-18",
    name: "GOES-18",
    type: "weather",
    altitude: 35786,
    speed: 11000,
    orbitPeriod: 1436,
    description:
      "Geostationary Operational Environmental Satellite providing weather monitoring for the Western United States.",
    launchDate: "2022-03-01",
  },
  {
    id: "landsat-9",
    name: "Landsat 9",
    type: "research",
    altitude: 705,
    speed: 27000,
    orbitPeriod: 99,
    description:
      "Earth observation satellite capturing high-resolution images for environmental monitoring and land use studies.",
    launchDate: "2021-09-27",
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope",
    type: "research",
    altitude: 540,
    speed: 27000,
    orbitPeriod: 95,
    description:
      "Space telescope providing stunning images of distant galaxies, nebulae, and other astronomical objects.",
    launchDate: "1990-04-24",
  },
  {
    id: "gps-iii",
    name: "GPS III Satellites",
    type: "communication",
    altitude: 20200,
    speed: 14000,
    orbitPeriod: 720,
    description: "Navigation satellites providing precise positioning and timing services worldwide.",
    launchDate: "2018-12-23",
  },
]

export const cities = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
]

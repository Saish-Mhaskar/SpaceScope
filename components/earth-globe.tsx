"use client"

import { motion } from "framer-motion"

export function EarthGlobe() {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.15 200) 0%, transparent 70%)",
        }}
      />

      {/* Atmosphere breathing effect */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, transparent 60%, oklch(0.5 0.15 200 / 0.3) 80%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-[10%] rounded-full overflow-hidden earth-sphere"
        style={{
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/2560px-Land_ocean_ice_2048.jpg")`,
          backgroundSize: "200% 100%",
          backgroundRepeat: "repeat-x",
          boxShadow: `
            inset -30px 0 60px rgba(0,0,0,0.6),
            0 0 80px rgba(0, 255, 255, 0.15)
          `,
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "calc(10% - 12px)",
          background: "radial-gradient(circle, rgba(0,255,255,0.15), transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Highlight/shine */}
      <div
        className="absolute inset-[10%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%)",
        }}
      />

      {/* Orbiting satellite */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            top: "5%",
            left: "50%",
            boxShadow: "0 0 10px var(--primary), 0 0 20px var(--primary)",
          }}
        />
      </motion.div>

      {/* Second orbiting object */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-[-5%]"
        style={{ transformOrigin: "center center" }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-accent"
          style={{
            top: "10%",
            left: "50%",
            boxShadow: "0 0 8px var(--accent), 0 0 16px var(--accent)",
          }}
        />
      </motion.div>
    </div>
  )
}

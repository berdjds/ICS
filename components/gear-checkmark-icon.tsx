"use client"

import { motion } from "framer-motion"

interface GearCheckmarkIconProps {
  size?: number
  className?: string
}

export function GearCheckmarkIcon({ size = 48, className = "" }: GearCheckmarkIconProps) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Gear Shape */}
        <path
          d="M50 15 L55 10 L60 15 L65 10 L70 15 L75 20 L80 15 L85 20 L80 25 L85 30 L80 35 L85 40 L80 45 L85 50 L80 55 L85 60 L80 65 L85 70 L80 75 L75 80 L80 85 L75 90 L70 85 L65 90 L60 85 L55 90 L50 85 L45 90 L40 85 L35 90 L30 85 L25 80 L20 85 L15 80 L20 75 L15 70 L20 65 L15 60 L20 55 L15 50 L20 45 L15 40 L20 35 L15 30 L20 25 L15 20 L20 15 L25 20 L30 15 L35 10 L40 15 L45 10 Z"
          stroke="hsl(var(--foreground))"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinejoin="round"
        />

        {/* Inner Circle */}
        <circle cx="50" cy="50" r="20" stroke="hsl(var(--foreground))" strokeWidth="2.5" fill="transparent" />

        {/* Circle around Checkmark */}
        <circle cx="50" cy="50" r="12" stroke="hsl(var(--foreground))" strokeWidth="2" fill="transparent" />

        {/* Checkmark */}
        <path
          d="M42 50 L47 55 L58 44"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

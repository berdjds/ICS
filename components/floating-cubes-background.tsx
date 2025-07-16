"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { DotPatternBackground } from "./dot-pattern-background"

export function FloatingCubesBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 12], fov: 30 }}>
          <DotPatternBackground />
        </Canvas>
      </Suspense>
    </div>
  )
}

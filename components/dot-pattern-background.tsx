"use client"

import * as THREE from "three"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"

// Responsive dot count based on device capabilities
const getOptimalDotCount = () => {
  if (typeof window === "undefined") return 800

  const isMobile = window.innerWidth < 768
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

  if (isMobile || isLowEnd) {
    return 400 // Reduced for mobile/low-end devices
  }
  return 800 // Full count for desktop
}

// Create subtle dot texture
const createDotTexture = () => {
  const canvas = document.createElement("canvas")
  const size = 32
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext("2d")!
  const center = size / 2
  const radius = size / 3

  // Create radial gradient for soft dot appearance
  const gradient = context.createRadialGradient(center, center, 0, center, center, radius)
  gradient.addColorStop(0, "rgba(0, 99, 152, 0.4)") // Intel CS blue with low opacity
  gradient.addColorStop(0.7, "rgba(0, 99, 152, 0.2)")
  gradient.addColorStop(1, "rgba(0, 99, 152, 0)")

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function DotPatternBackground() {
  const dotMeshRef = useRef<THREE.InstancedMesh>(null!)
  const DOT_COUNT = useMemo(() => getOptimalDotCount(), [])

  const dotsData = useMemo(() => {
    return Array.from({ length: DOT_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40, // Wider spread
        (Math.random() - 0.5) * 30, // Taller spread
        (Math.random() - 0.5) * 20, // Depth variation
      ),
      scale: Math.random() * 0.15 + 0.05, // Smaller, more subtle dots
      phase: Math.random() * Math.PI * 2, // Random animation phase
      speed: Math.random() * 0.5 + 0.2, // Slow animation speed
    }))
  }, [DOT_COUNT])

  const dotTexture = useMemo(() => createDotTexture(), [])
  const tempObject = new THREE.Object3D()

  useFrame((state) => {
    if (!dotMeshRef.current) return

    const time = state.clock.elapsedTime

    // Update dot animations with subtle movement and pulsing
    for (let i = 0; i < DOT_COUNT; i++) {
      const { position, scale, phase, speed } = dotsData[i]

      // Subtle floating motion
      const floatY = Math.sin(time * speed + phase) * 0.3
      const floatX = Math.cos(time * speed * 0.7 + phase) * 0.2

      // Subtle pulsing scale
      const pulseScale = scale * (1 + Math.sin(time * speed * 2 + phase) * 0.1)

      tempObject.position.set(position.x + floatX, position.y + floatY, position.z)
      tempObject.scale.setScalar(pulseScale)
      tempObject.updateMatrix()
      dotMeshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    dotMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.3} />

      <instancedMesh ref={dotMeshRef} args={[null, null, DOT_COUNT]} frustumCulled={false}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={dotTexture} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </>
  )
}

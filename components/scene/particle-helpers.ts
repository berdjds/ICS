import * as THREE from "three"

// Helper function to sample points from a geometry's surface
export function getShapePoints(geometry: THREE.BufferGeometry, count: number) {
  geometry.computeBoundingBox()
  geometry.center()

  const positionAttribute = geometry.getAttribute("position")
  const points = []
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * positionAttribute.count)
    const x = positionAttribute.getX(index)
    const y = positionAttribute.getY(index)
    const z = positionAttribute.getZ(index)
    points.push(new THREE.Vector3(x, y, z))
  }
  return points
}

// Create circular particle texture
export function createCircleTexture() {
  const canvas = document.createElement("canvas")
  const size = 64
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext("2d")!
  const center = size / 2
  const radius = size / 2 - 2

  // Create radial gradient for smooth circular appearance
  const gradient = context.createRadialGradient(center, center, 0, center, center, radius)
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.8)")
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Responsive particle count based on device capabilities
export function getOptimalParticleCount() {
  if (typeof window === "undefined") return 20000

  const isMobile = window.innerWidth < 768
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

  if (isMobile || isLowEnd) {
    return 10000 // Increased for better definition on mobile/low-end devices
  }
  return 20000 // Increased count for cleaner, more defined shapes
}

export function getOptimalCubeCount() {
  if (typeof window === "undefined") return 500

  const isMobile = window.innerWidth < 768
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

  if (isMobile || isLowEnd) {
    return 250 // Increased for mobile/low-end devices
  }
  return 500 // Increased count for more ambient dots
}
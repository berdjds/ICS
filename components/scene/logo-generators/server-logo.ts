import * as THREE from "three"
import { SERVER_LOGO_POLYGONS } from "@/lib/server-logo-path"

export function getServerLogoPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []

  // Create a canvas to render the server logo
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return points

  // Canvas setup
  canvas.width = 600
  canvas.height = 600

  // Scale and center the logo with left offset
  ctx.save()
  ctx.translate(canvas.width / 2 - 0, canvas.height / 2) // Move 80 pixels to the left
  const scale = 25 // Further increased scale for better visibility
  ctx.scale(scale, scale)
  ctx.translate(-12, -12) // Center based on 24x24 viewBox

  // Draw each polygon
  SERVER_LOGO_POLYGONS.forEach(polygon => {
    ctx.fillStyle = polygon.color
    ctx.beginPath()

    // Parse points string into coordinates
    const coords = polygon.points.split(' ').map(Number)
    ctx.moveTo(coords[0], coords[1])

    for (let i = 2; i < coords.length; i += 2) {
      ctx.lineTo(coords[i], coords[i + 1])
    }

    ctx.closePath()
    ctx.fill()
  })

  ctx.restore()

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Sample points from the image
  const sampledPoints: THREE.Vector3[] = []

  // Increase sampling density for better definition
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4
      if (data[index + 3] > 128) { // Check alpha channel
        // Convert canvas coordinates to 3D world coordinates with left offset
        const worldX = ((x - canvas.width / 2) / canvas.width) * 6 - 1.0 // Added -1.0 for left offset in 3D space
        const worldY = ((canvas.height / 2 - y) / canvas.height) * 6
        const worldZ = (Math.random() - 0.5) * 0.3

        sampledPoints.push(new THREE.Vector3(worldX, worldY, worldZ))
      }
    }
  }

  // Randomly select points from sampled points to match count
  const particleCount = Math.min(count, sampledPoints.length) // Use all particles for logo only
  const selectedIndices = new Set<number>()

  while (selectedIndices.size < particleCount && selectedIndices.size < sampledPoints.length) {
    const index = Math.floor(Math.random() * sampledPoints.length)
    selectedIndices.add(index)
  }

  // Add selected points
  selectedIndices.forEach(index => {
    points.push(sampledPoints[index])
  })

  // Fill remaining with logo points if needed (no glow particles)
  while (points.length < count && sampledPoints.length > 0) {
    const randomIndex = Math.floor(Math.random() * sampledPoints.length)
    points.push(sampledPoints[randomIndex])
  }

  return points
}
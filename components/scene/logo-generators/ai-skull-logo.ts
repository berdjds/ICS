import * as THREE from "three"
import { AI_SKULL_TEXT_MAIN_PATH, AI_SKULL_TEXT_I_LINES, AI_SKULL_TEXT_A_POLYLINE, AI_SKULL_TEXT_A_CROSSBAR } from "@/lib/AI-Skull-text"

export function getAISkullLogoPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []

  // Create a canvas to render the AI Skull logo
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return points

  // Canvas setup
  canvas.width = 1000
  canvas.height = 1000
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // Logo parameters - based on 48x48 viewBox (-4.8 to 52.8)
  const scale = 10 // Much larger scale for better visibility
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  // Draw AI Skull with text logo
  // First draw the flipped skull
  ctx.save()
  ctx.translate(centerX + 24 * scale, centerY - 24 * scale) // Center based on 48x48 viewBox with flip
  ctx.scale(-scale, scale) // Negative X scale to flip horizontally

  // Draw main skull/brain outline (filled)
  ctx.fillStyle = '#006398' // Main Intel CS blue
  const skullMainPath = new Path2D(AI_SKULL_TEXT_MAIN_PATH)
  ctx.fill(skullMainPath)
  
  ctx.restore()

  // Now draw the AI text in correct orientation (not flipped)
  ctx.save()
  ctx.translate(centerX - 24 * scale, centerY - 24 * scale) // Center based on 48x48 viewBox
  ctx.scale(scale, scale)
  
  // Create AI text as holes (transparent areas) in the filled skull
  ctx.globalCompositeOperation = 'destination-out'

  // Draw letter "A" polyline (will create transparent holes)
  ctx.lineWidth = 3.5 // Much thicker lines for better visibility
  const aPolylinePath = new Path2D()
  // Convert polyline points to path
  const aPoints = AI_SKULL_TEXT_A_POLYLINE.split(' ')
  for (let i = 0; i < aPoints.length; i += 2) {
    const x = parseFloat(aPoints[i])
    const y = parseFloat(aPoints[i + 1])
    if (i === 0) {
      aPolylinePath.moveTo(x, y)
    } else {
      aPolylinePath.lineTo(x, y)
    }
  }
  ctx.stroke(aPolylinePath)

  // Draw letter "A" crossbar (will create transparent hole)
  ctx.beginPath()
  ctx.moveTo(AI_SKULL_TEXT_A_CROSSBAR.x1, AI_SKULL_TEXT_A_CROSSBAR.y1)
  ctx.lineTo(AI_SKULL_TEXT_A_CROSSBAR.x2, AI_SKULL_TEXT_A_CROSSBAR.y2)
  ctx.stroke()

  // Draw letter "I" lines (will create transparent holes)
  ctx.lineWidth = 3.5 // Much thicker lines for better visibility
  ctx.lineCap = 'round'
  AI_SKULL_TEXT_I_LINES.forEach(line => {
    ctx.beginPath()
    ctx.moveTo(line.x1, line.y1)
    ctx.lineTo(line.x2, line.y2)
    ctx.stroke()
  })

  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over'

  ctx.restore()

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Sample points from the image
  const sampledPoints: THREE.Vector3[] = []

  // Sample AI Skull logo points
  for (let y = 0; y < canvas.height; y += 2) { // Every 2 pixels for performance
    for (let x = 0; x < canvas.width; x += 2) {
      const index = (y * canvas.width + x) * 4
      if (data[index + 3] > 50) { // Threshold to catch all skull elements
        // Convert canvas coordinates to 3D world coordinates (note: X is already flipped by canvas transform)
        const worldX = ((x - canvas.width / 2) / canvas.width) * 10
        const worldY = ((canvas.height / 2 - y) / canvas.height) * 10
        const worldZ = (Math.random() - 0.5) * 0.6

        // Check pixel color to determine skull part
        const r = data[index]
        const g = data[index + 1]
        const b = data[index + 2]

        // Intel CS blue (#006398) for all elements
        const isAIElement = (r < 50 && g < 120 && b > 130) // All AI skull elements

        if (isAIElement) {
          sampledPoints.push(new THREE.Vector3(worldX, worldY, worldZ))

          // Add many more fill particles for maximum visibility
          let fillCount = 8 // Much higher density for bright glow effect

          // Create thick glowing strokes by adding particles in a larger radius
          for (let fill = 0; fill < fillCount; fill++) {
            const fillX = worldX + (Math.random() - 0.5) * 0.06
            const fillY = worldY + (Math.random() - 0.5) * 0.06
            const fillZ = worldZ + (Math.random() - 0.5) * 0.8
            sampledPoints.push(new THREE.Vector3(fillX, fillY, fillZ))
          }

          // Add extra particles for even more glow
          for (let extra = 0; extra < 3; extra++) {
            const extraX = worldX + (Math.random() - 0.5) * 0.04
            const extraY = worldY + (Math.random() - 0.5) * 0.04
            const extraZ = worldZ + (Math.random() - 0.5) * 0.6
            sampledPoints.push(new THREE.Vector3(extraX, extraY, extraZ))
          }
        }
      }
    }
  }

  // Use all sampled points up to count limit
  const particleCount = Math.min(count, sampledPoints.length)

  // If we have more samples than needed, randomly select
  if (sampledPoints.length > particleCount) {
    const selectedIndices = new Set<number>()
    while (selectedIndices.size < particleCount) {
      const index = Math.floor(Math.random() * sampledPoints.length)
      selectedIndices.add(index)
    }
    selectedIndices.forEach(index => {
      points.push(sampledPoints[index])
    })
  } else {
    // Use all sampled points
    points.push(...sampledPoints)
  }

  // Add fill particles to eliminate any remaining gaps
  const remainingCount = count - points.length
  if (remainingCount > 0 && sampledPoints.length > 0) {
    // Use remaining capacity to add more fill particles
    for (let i = 0; i < remainingCount; i++) {
      // Pick a random point and add nearby particles to fill gaps
      const basePoint = sampledPoints[Math.floor(Math.random() * sampledPoints.length)]
      const offset = 0.01 // Very small offset for tight fill
      const fillPoint = new THREE.Vector3(
        basePoint.x + (Math.random() - 0.5) * offset,
        basePoint.y + (Math.random() - 0.5) * offset,
        basePoint.z + (Math.random() - 0.5) * offset
      )
      points.push(fillPoint)
    }
  }

  // Ensure we always return exactly 'count' points
  while (points.length < count) {
    // Add random points in a circular pattern if needed
    const angle = Math.random() * Math.PI * 2
    const radius = 2 + Math.random() * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = (Math.random() - 0.5) * 0.2
    points.push(new THREE.Vector3(x, y, z))
  }

  // If we have too many points, trim to exact count
  if (points.length > count) {
    points.length = count
  }

  return points
}
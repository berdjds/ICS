import * as THREE from "three"
import { AWS_LOGO_PATH } from "@/lib/aws-logo-path"

// Intel-CS logo path
const INTEL_CS_PATH = "M873 1861 c-516 -83 -840 -595 -697 -1101 71 -251 272 -467 520 -559 112 -41 169 -53 281 -54 121 -2 188 6 278 34 285 88 511 325 586 614 28 109 30 300 4 405 -95 389 -413 652 -805 665 -63 2 -138 0 -167 -4z m229 -608 c87 -86 161 -165 164 -176 9 -28 -22 -67 -54 -67 -22 0 -54 26 -157 130 l-130 130 -112 -112 -113 -113 0 -74 c0 -55 -4 -79 -17 -93 -20 -22 -51 -23 -75 -1 -15 14 -18 32 -18 117 l0 102 158 157 c91 90 166 157 177 157 11 0 86 -67 177 -157z m296 -99 c20 -14 22 -23 22 -117 l0 -102 -157 -157 c-115 -115 -164 -158 -181 -158 -18 0 -65 41 -174 153 -183 186 -185 190 -148 227 37 37 57 26 194 -110 l132 -130 112 113 112 112 0 77 c0 68 3 79 22 92 12 9 27 16 33 16 6 0 21 -7 33 -16z"

export function getAWSAndIntelCSLogoPoints(count: number): { points: THREE.Vector3[], awsEndIndex: number } {
  const points: THREE.Vector3[] = []

  // Create a canvas to render the logos
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return { points, awsEndIndex: 0 }

  // Canvas setup
  canvas.width = 900
  canvas.height = 450
  ctx.fillStyle = 'white'

  // Logo parameters - increased sizes with horizontal layout (like cloud excellence section)
  const logoHeight = 160 // Increased size
  const awsLogoWidth = logoHeight * (283 / 140)
  const intelCSLogoHeight = logoHeight * 1.4 // Increased Intel-CS logo size
  const intelCSLogoWidth = intelCSLogoHeight * 1.2 // Slightly wider aspect ratio
  const logoSpacing = 45 // Reduced horizontal spacing between logos
  const totalWidth = awsLogoWidth + intelCSLogoWidth + logoSpacing

  // Center the logos on canvas - horizontal layout (like cloud excellence section)
  const startX = canvas.width / 2 - totalWidth / 2
  const startY = canvas.height / 2 - logoHeight / 2

  // Draw AWS logo
  ctx.save()
  ctx.translate(startX, startY)
  const awsScale = logoHeight / 140
  ctx.scale(awsScale, awsScale)
  const path = new Path2D(AWS_LOGO_PATH)
  ctx.fill(path)
  ctx.restore()

  // Calculate AWS/Intel-CS boundary (horizontal layout like cloud excellence section)
  const awsBoundaryX = startX + awsLogoWidth + logoSpacing / 2

  // Draw Intel-CS logo to the right of AWS logo
  ctx.save()
  ctx.translate(startX + awsLogoWidth + logoSpacing, startY - (intelCSLogoHeight - logoHeight) / 2)
  const intelScale = intelCSLogoHeight / 1861 // Scale based on viewBox height
  ctx.scale(intelScale, intelScale)
  const intelPath = new Path2D(INTEL_CS_PATH)
  ctx.fill(intelPath)
  ctx.restore()

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Sample points from the image
  const awsPoints: THREE.Vector3[] = []
  const intelCSPoints: THREE.Vector3[] = []

  // Increase sampling density for better definition
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4
      if (data[index + 3] > 128) { // Check alpha channel
        // Convert canvas coordinates to 3D world coordinates
        const worldX = ((x - canvas.width / 2) / canvas.width) * 8
        const worldY = ((canvas.height / 2 - y) / canvas.height) * 4
        const worldZ = (Math.random() - 0.5) * 0.1

        const point = new THREE.Vector3(worldX, worldY, worldZ)

        // Determine if it's AWS or Intel-CS based on x position (horizontal layout)
        if (x < awsBoundaryX) {
          awsPoints.push(point)
        } else {
          intelCSPoints.push(point)
        }
      }
    }
  }

  // Calculate how many particles for each logo - give more to Intel-CS
  const logoParticles = count
  const awsParticleCount = Math.floor(logoParticles * 0.4) // 40% for AWS
  const intelCSParticleCount = logoParticles - awsParticleCount // 60% for Intel-CS

  // Randomly select AWS points
  const selectedAwsIndices = new Set<number>()
  while (selectedAwsIndices.size < Math.min(awsParticleCount, awsPoints.length)) {
    const index = Math.floor(Math.random() * awsPoints.length)
    selectedAwsIndices.add(index)
  }

  // Add AWS points
  selectedAwsIndices.forEach(index => {
    points.push(awsPoints[index])
  })

  const awsEndIndex = points.length // Track where AWS particles end

  // Randomly select Intel-CS points
  const selectedIntelIndices = new Set<number>()
  while (selectedIntelIndices.size < Math.min(intelCSParticleCount, intelCSPoints.length)) {
    const index = Math.floor(Math.random() * intelCSPoints.length)
    selectedIntelIndices.add(index)
  }

  // Add Intel-CS points
  selectedIntelIndices.forEach(index => {
    points.push(intelCSPoints[index])
  })

  return { points, awsEndIndex }
}
import * as THREE from "three"
import { AWS_LOGO_PATH } from "@/lib/aws-logo-path"

// Cloud icon path
const CLOUD_LOGO_PATH = "M441.518 268.098c-5.51 0-10.859.682-15.98 1.945a69.167 69.167 0 0 0 1.767-15.489c0-38.123-30.905-69.028-69.028-69.028a68.704 68.704 0 0 0-38.983 12.065c-12.949-49.891-58.284-86.729-112.225-86.729c-64.031 0-115.939 51.908-115.939 115.939c-48.141 0-87.168 39.026-87.168 87.168c0 48.141 39.026 87.168 87.168 87.168h350.388c36.738 0 66.52-29.782 66.52-66.52c0-36.737-29.782-66.519-66.52-66.519z"

export function getAWSAndCloudLogoPoints(count: number): { points: THREE.Vector3[], awsEndIndex: number } {
  const points: THREE.Vector3[] = []

  // Create a canvas to render the logos
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return { points, awsEndIndex: 0 }

  // Canvas setup
  canvas.width = 800
  canvas.height = 400
  ctx.fillStyle = 'white'

  // Logo parameters
  const logoHeight = 120
  const awsLogoWidth = logoHeight * (283 / 140)
  const cloudLogoHeight = logoHeight * 0.8
  const cloudLogoWidth = cloudLogoHeight * (508 / 290) // Approximate aspect ratio from path bounds
  const logoSpacing = 60
  const totalWidth = awsLogoWidth + cloudLogoWidth + logoSpacing

  // Center the logos on canvas
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

  // Calculate AWS/cloud boundary
  const awsBoundaryX = startX + awsLogoWidth + logoSpacing / 2

  // Draw cloud logo
  ctx.save()
  ctx.translate(startX + awsLogoWidth + logoSpacing, startY + 10)
  const cloudScale = cloudLogoHeight / 290
  ctx.scale(cloudScale, cloudScale)
  const cloudPath = new Path2D(CLOUD_LOGO_PATH)
  ctx.fill(cloudPath)
  ctx.restore()

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Sample points from the image
  const awsPoints: THREE.Vector3[] = []
  const cloudPoints: THREE.Vector3[] = []

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

        // Determine if it's AWS or cloud based on x position
        if (x < awsBoundaryX) {
          awsPoints.push(point)
        } else {
          cloudPoints.push(point)
        }
      }
    }
  }

  // Calculate how many particles for each logo - use all particles for logos
  const logoParticles = count // 100% for logos, no glow
  const glowParticles = 0 // No glow particles

  const awsParticleCount = Math.floor(logoParticles * 0.5)
  const cloudParticleCount = logoParticles - awsParticleCount

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

  // Randomly select cloud points
  const selectedCloudIndices = new Set<number>()
  while (selectedCloudIndices.size < Math.min(cloudParticleCount, cloudPoints.length)) {
    const index = Math.floor(Math.random() * cloudPoints.length)
    selectedCloudIndices.add(index)
  }

  // Add cloud points
  selectedCloudIndices.forEach(index => {
    points.push(cloudPoints[index])
  })

  // No glow particles - all particles used for logos

  return { points, awsEndIndex }
}
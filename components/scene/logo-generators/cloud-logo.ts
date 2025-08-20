import * as THREE from "three"

export function getCloudLogoPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []

  // Create a canvas to render the cloud shape
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return points

  // Canvas setup
  canvas.width = 600
  canvas.height = 600

  // Scale and center the cloud
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  const scale = 3
  ctx.scale(scale, scale)

  // Draw cloud shape using multiple circles
  ctx.fillStyle = '#ffffff'
  
  // Main cloud body (large circle in center)
  ctx.beginPath()
  ctx.arc(0, 10, 60, 0, Math.PI * 2)
  ctx.fill()
  
  // Left cloud bump
  ctx.beginPath()
  ctx.arc(-40, 0, 45, 0, Math.PI * 2)
  ctx.fill()
  
  // Right cloud bump
  ctx.beginPath()
  ctx.arc(40, 0, 45, 0, Math.PI * 2)
  ctx.fill()
  
  // Top left bump
  ctx.beginPath()
  ctx.arc(-20, -25, 35, 0, Math.PI * 2)
  ctx.fill()
  
  // Top right bump
  ctx.beginPath()
  ctx.arc(20, -25, 35, 0, Math.PI * 2)
  ctx.fill()
  
  // Top center bump
  ctx.beginPath()
  ctx.arc(0, -35, 30, 0, Math.PI * 2)
  ctx.fill()
  
  // Bottom extensions for more cloud-like appearance
  ctx.beginPath()
  ctx.arc(-60, 20, 25, 0, Math.PI * 2)
  ctx.fill()
  
  ctx.beginPath()
  ctx.arc(60, 20, 25, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Sample points from the image
  const sampledPoints: THREE.Vector3[] = []

  // Sample points with good density
  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) {
      const index = (y * canvas.width + x) * 4
      if (data[index + 3] > 128) { // Check alpha channel
        // Convert canvas coordinates to 3D world coordinates
        const worldX = ((x - canvas.width / 2) / canvas.width) * 8
        const worldY = ((canvas.height / 2 - y) / canvas.height) * 8
        const worldZ = (Math.random() - 0.5) * 0.5 // Add some depth variation

        sampledPoints.push(new THREE.Vector3(worldX, worldY, worldZ))
      }
    }
  }

  // Randomly select points from sampled points to match count
  const particleCount = Math.min(count, sampledPoints.length)
  const selectedIndices = new Set<number>()

  while (selectedIndices.size < particleCount && selectedIndices.size < sampledPoints.length) {
    const index = Math.floor(Math.random() * sampledPoints.length)
    selectedIndices.add(index)
  }

  // Add selected points
  selectedIndices.forEach(index => {
    points.push(sampledPoints[index])
  })

  // Fill remaining with cloud points if needed
  while (points.length < count && sampledPoints.length > 0) {
    const randomIndex = Math.floor(Math.random() * sampledPoints.length)
    points.push(sampledPoints[randomIndex])
  }

  return points
}

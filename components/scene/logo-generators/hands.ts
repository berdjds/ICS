import * as THREE from "three"

export function getHandsLogoPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []

  // Create a canvas to render the logo from image
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return points

  // Canvas setup
  canvas.width = 300
  canvas.height = 300

  // Create and load image
  const img = new Image()
  img.crossOrigin = 'anonymous'
  
  // Use one of your logo files - you can change this to any logo you prefer
  img.src = '/logos/hero4.png' // Using the white logo for better contrast
  
  img.onload = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Calculate scaling to fit image in canvas while maintaining aspect ratio
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.7
    const scaledWidth = img.width * scale
    const scaledHeight = img.height * scale
    
    // Center the image
    const x = (canvas.width - scaledWidth) / 2
    const y = (canvas.height - scaledHeight) / 2
    
    // Draw the image
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
    
    // Get image data and sample points
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    
    const sampledPoints: THREE.Vector3[] = []
    
    // Sample points from the image (check for non-transparent pixels)
    for (let y = 0; y < canvas.height; y += 2) {
      for (let x = 0; x < canvas.width; x += 2) {
        const index = (y * canvas.width + x) * 4
        const alpha = data[index + 3]
        const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3
        
        // Sample points where there's content (non-transparent and not too dark)
        if (alpha > 50 && brightness > 50) {
          // Convert canvas coordinates to 3D world coordinates
          const worldX = ((x - canvas.width / 2) / canvas.width) * 8 - 1.0 // Shifted 2 units to the left
          const worldY = ((canvas.height / 2 - y) / canvas.height) * 8
          const worldZ = (Math.random() - 0.5) * 0.5
          
          sampledPoints.push(new THREE.Vector3(worldX, worldY, worldZ))
        }
      }
    }
    
    // Randomly select points to match count
    const particleCount = Math.min(count, sampledPoints.length)
    const selectedIndices = new Set<number>()
    
    while (selectedIndices.size < particleCount && selectedIndices.size < sampledPoints.length) {
      const index = Math.floor(Math.random() * sampledPoints.length)
      selectedIndices.add(index)
    }
    
    // Clear existing points and add selected points
    points.length = 0
    selectedIndices.forEach(index => {
      points.push(sampledPoints[index])
    })
    
    // Fill remaining with random logo points if needed
    while (points.length < count && sampledPoints.length > 0) {
      const randomIndex = Math.floor(Math.random() * sampledPoints.length)
      points.push(sampledPoints[randomIndex])
    }
  }
  
  // Fallback: return some default points if image fails to load
  img.onerror = () => {
    // Create a simple geometric pattern as fallback
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2 + Math.random() * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = (Math.random() - 0.5) * 0.5
      points.push(new THREE.Vector3(x, y, z))
    }
  }

  // Return points immediately (will be empty initially, filled when image loads)
  return points
}
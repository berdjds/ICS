import * as THREE from "three"

// Cloud migration SVG paths
const CLOUD_MIGRATION_CLOUD_PATH = "M159.3809,118.5645c-8.6445,0-17.0273,2.4609-24.2422,7.1172l-3.9453,2.5469l-1.8867-4.3008 c-6.5703-14.9824-21.4492-24.6621-37.9023-24.6621c-20.4297,0-38.0156,15.1191-40.8984,35.168l-0.4961,3.4297l-3.9219-0.002 c-19.2148,0-34.8438,15.5195-34.8438,34.5957c0,19.0742,15.6289,34.5938,34.8438,34.5938h106.0586v-0.2715l4.2617,0.1738 c0.9844,0.0645,1.9766,0.0977,2.9727,0.0977c24.5703,0,44.5586-19.8477,44.5586-44.2422 C203.9395,138.4121,183.9512,118.5645,159.3809,118.5645z"
const CLOUD_MIGRATION_ARROW_PATH = "M117.6113,71.3457c2.2109,0,4-1.791,4-4v-27.043l61.3633,61.3652l5.6562-5.6562L131.822,39.2012h16.8752 c2.2109,0,4-1.791,4-4s-1.7891-4-4-4h-31.0859c-2.2109,0-4,1.791-4,4v32.1445C113.6113,69.5547,115.4004,71.3457,117.6113,71.3457z M217.6855,33.5059c-2.2109,0-4,1.791-4,4v21.6406L154.541,0l-5.6562,5.6562l61.6069,61.6084 l-24.5171-0.4541c-0.0273,0-0.0508,0-0.0742,0c-2.1758,0-3.957,1.7422-4,3.9258c-0.0391,2.209,1.7188,4.0332,3.9258,4.0742 l31.7852,0.5879c0.0234,0,0.0508,0,0.0742,0c1.0469,0,2.0547-0.4102,2.8008-1.1465c0.7656-0.752,1.1992-1.7793,1.1992-2.8535 V37.5059C221.6855,35.2969,219.8965,33.5059,217.6855,33.5059z"

export function getCloudMigrationLogoPoints(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = []

  // Create a canvas to render the logo
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return points

  // Canvas setup
  canvas.width = 800
  canvas.height = 800
  ctx.fillStyle = '#006398'

  // Logo parameters
  const scale = 1.8 // Reduced from 2.5
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  // Draw cloud migration logo
  ctx.save()
  ctx.translate(centerX - 110 * scale, centerY - 107.5 * scale)
  ctx.scale(scale, scale)

  // Draw cloud
  const cloudPath = new Path2D(CLOUD_MIGRATION_CLOUD_PATH)
  ctx.fill(cloudPath)

  // Draw arrows
  const arrowPath = new Path2D(CLOUD_MIGRATION_ARROW_PATH)
  ctx.fill(arrowPath)

  ctx.restore()

  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Sample points from the image
  const logoPoints: THREE.Vector3[] = []

  // Increase sampling density for better definition
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4
      if (data[index + 3] > 128) { // Check alpha channel
        // Convert canvas coordinates to 3D world coordinates
        const worldX = ((x - canvas.width / 2) / canvas.width) * 10
        const worldY = ((canvas.height / 2 - y) / canvas.height) * 10
        const worldZ = (Math.random() - 0.5) * 0.1

        const point = new THREE.Vector3(worldX, worldY, worldZ)
        logoPoints.push(point)
      }
    }
  }

  // Randomly select points
  const selectedIndices = new Set<number>()
  while (selectedIndices.size < Math.min(count, logoPoints.length)) {
    const index = Math.floor(Math.random() * logoPoints.length)
    selectedIndices.add(index)
  }

  // Add selected points
  selectedIndices.forEach(index => {
    points.push(logoPoints[index])
  })

  return points
}
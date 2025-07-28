import * as THREE from "three"

// Helper function to sample points from a geometry's surface
const getShapePoints = (geometry: THREE.BufferGeometry, count: number) => {
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

export function getEarthLogoPoints(count: number): THREE.Vector3[] {
  // Create a proper 3D globe using Three.js SphereGeometry
  const globeRadius = 2.0 // Reduced from 2.5
  const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 32)
  
  // Get points distributed on the sphere surface
  return getShapePoints(globeGeometry, count)
}
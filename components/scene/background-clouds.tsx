"use client"

import * as THREE from "three"
import { useRef, useMemo, useLayoutEffect } from "react"
import { useFrame } from "@react-three/fiber"

interface BackgroundCloudsProps {
  count: number
}

export function BackgroundClouds({ count }: BackgroundCloudsProps) {
  const cloudMeshRef = useRef<THREE.InstancedMesh>(null!)
  
  const cloudsData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: Math.random() * 0.4 + 0.2,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001
      )
    }))
  }, [count])

  const tempObject = new THREE.Object3D()
  const tempQuat = new THREE.Quaternion()

  // Create cloud geometry using multiple spheres
  const cloudGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []
    const indices: number[] = []
    
    // Create cloud shape with multiple spheres
    const sphereGeometry = new THREE.SphereGeometry(1, 8, 6)
    const sphereVertices = sphereGeometry.attributes.position.array
    const sphereIndices = sphereGeometry.index?.array || []
    
    // Main cloud body positions (relative to center)
    const cloudParts = [
      { pos: [0, 0, 0], scale: 1.0 },      // Center
      { pos: [-0.8, 0, 0], scale: 0.8 },   // Left
      { pos: [0.8, 0, 0], scale: 0.8 },    // Right
      { pos: [-0.4, 0.6, 0], scale: 0.6 }, // Top left
      { pos: [0.4, 0.6, 0], scale: 0.6 },  // Top right
      { pos: [0, 0.8, 0], scale: 0.5 },    // Top center
      { pos: [-1.2, -0.3, 0], scale: 0.4 }, // Bottom left
      { pos: [1.2, -0.3, 0], scale: 0.4 },  // Bottom right
    ]
    
    let vertexOffset = 0
    
    cloudParts.forEach((part) => {
      for (let i = 0; i < sphereVertices.length; i += 3) {
        vertices.push(
          sphereVertices[i] * part.scale + part.pos[0],
          sphereVertices[i + 1] * part.scale + part.pos[1],
          sphereVertices[i + 2] * part.scale + part.pos[2]
        )
      }
      
      // Add indices with offset
      for (let i = 0; i < sphereIndices.length; i++) {
        indices.push(sphereIndices[i] + vertexOffset)
      }
      
      vertexOffset += sphereVertices.length / 3
    })
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    
    return geometry
  }, [])

  useLayoutEffect(() => {
    if (!cloudMeshRef.current) return
    for (let i = 0; i < count; i++) {
      const { position, rotation, scale } = cloudsData[i]
      tempObject.position.copy(position)
      tempObject.rotation.copy(rotation)
      tempObject.scale.setScalar(scale)
      tempObject.updateMatrix()
      cloudMeshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    cloudMeshRef.current.instanceMatrix.needsUpdate = true
  }, [cloudsData, count])

  useFrame((state) => {
    if (!cloudMeshRef.current) return

    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const cloud = cloudsData[i]
      
      // Update position with floating motion
      cloud.position.x += cloud.velocity.x + Math.sin(time * 0.3 + i * 0.1) * 0.0008
      cloud.position.y += cloud.velocity.y + Math.cos(time * 0.2 + i * 0.1) * 0.0008
      cloud.position.z += cloud.velocity.z + Math.sin(time * 0.25 + i * 0.1) * 0.0008

      // Wrap around boundaries
      if (Math.abs(cloud.position.x) > 20) cloud.position.x *= -0.9
      if (Math.abs(cloud.position.y) > 20) cloud.position.y *= -0.9
      if (Math.abs(cloud.position.z) > 20) cloud.position.z *= -0.9

      // Update rotation with slow animation
      tempObject.position.copy(cloud.position)
      tempQuat.setFromEuler(new THREE.Euler(
        cloud.rotation.x + time * 0.05,
        cloud.rotation.y + time * 0.05,
        cloud.rotation.z
      ))
      tempObject.quaternion.copy(tempQuat)
      tempObject.scale.setScalar(cloud.scale)
      tempObject.updateMatrix()
      cloudMeshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    cloudMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={cloudMeshRef} args={[cloudGeometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        roughness={0.3}
        metalness={0.1}
        emissive="#ffffff"
        emissiveIntensity={0.05}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  )
}

"use client"

import * as THREE from "three"
import { useRef, useMemo, useLayoutEffect } from "react"
import { useFrame } from "@react-three/fiber"

interface BackgroundCubesProps {
  count: number
}

export function BackgroundCubes({ count }: BackgroundCubesProps) {
  const cubeMeshRef = useRef<THREE.InstancedMesh>(null!)
  
  const cubesData = useMemo(() => {
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
      scale: Math.random() * 0.3 + 0.1,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      )
    }))
  }, [count])

  const tempObject = new THREE.Object3D()
  const tempQuat = new THREE.Quaternion()

  useLayoutEffect(() => {
    if (!cubeMeshRef.current) return
    for (let i = 0; i < count; i++) {
      const { position, rotation, scale } = cubesData[i]
      tempObject.position.copy(position)
      tempObject.rotation.copy(rotation)
      tempObject.scale.setScalar(scale)
      tempObject.updateMatrix()
      cubeMeshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    cubeMeshRef.current.instanceMatrix.needsUpdate = true
  }, [cubesData, count])

  useFrame((state) => {
    if (!cubeMeshRef.current) return

    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const cube = cubesData[i]
      
      // Update position with floating motion
      cube.position.x += cube.velocity.x + Math.sin(time * 0.5 + i * 0.1) * 0.001
      cube.position.y += cube.velocity.y + Math.cos(time * 0.4 + i * 0.1) * 0.001
      cube.position.z += cube.velocity.z + Math.sin(time * 0.3 + i * 0.1) * 0.001

      // Wrap around boundaries
      if (Math.abs(cube.position.x) > 20) cube.position.x *= -0.9
      if (Math.abs(cube.position.y) > 20) cube.position.y *= -0.9
      if (Math.abs(cube.position.z) > 20) cube.position.z *= -0.9

      // Update rotation with smooth animation
      tempObject.position.copy(cube.position)
      tempQuat.setFromEuler(new THREE.Euler(
        cube.rotation.x + time * 0.1,
        cube.rotation.y + time * 0.1,
        cube.rotation.z
      ))
      tempObject.quaternion.copy(tempQuat)
      tempObject.scale.setScalar(cube.scale)
      tempObject.updateMatrix()
      cubeMeshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    cubeMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={cubeMeshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        roughness={0.5}
        metalness={0.1}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  )
}
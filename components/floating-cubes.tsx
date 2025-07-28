"use client"

import * as THREE from "three"
import { useMemo, useRef, useLayoutEffect } from "react"
import { useFrame } from "@react-three/fiber"

// Responsive cube count based on device capabilities
const getOptimalCubeCount = () => {
  if (typeof window === "undefined") return 350

  // Check if it's a mobile device
  const isMobile = window.innerWidth < 768
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

  if (isMobile || isLowEnd) {
    return 150 // Reduced for mobile/low-end devices
  }
  return 350 // Full count for desktop
}

export function FloatingCubes() {
  const cubeMeshRef = useRef<THREE.InstancedMesh>(null!)
  const CUBE_COUNT = useMemo(() => getOptimalCubeCount(), [])

  const cubesData = useMemo(() => {
    return Array.from({ length: CUBE_COUNT }, () => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      scale: Math.random() * 0.3 + 0.1,
    }))
  }, [CUBE_COUNT])

  const tempObject = new THREE.Object3D()
  const tempQuat = new THREE.Quaternion()

  useLayoutEffect(() => {
    if (!cubeMeshRef.current) return
    for (let i = 0; i < CUBE_COUNT; i++) {
      const { position, rotation, scale } = cubesData[i]
      tempObject.position.copy(position)
      tempObject.rotation.copy(rotation)
      tempObject.scale.setScalar(scale)
      tempObject.updateMatrix()
      cubeMeshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    cubeMeshRef.current.instanceMatrix.needsUpdate = true
  }, [cubesData, CUBE_COUNT])

  useFrame((state) => {
    if (!cubeMeshRef.current) return

    const time = state.clock.elapsedTime

    // Update cube rotations
    for (let i = 0; i < CUBE_COUNT; i++) {
      const { position, rotation, scale } = cubesData[i]
      tempObject.position.copy(position)
      tempQuat.setFromEuler(new THREE.Euler(rotation.x + time * 0.1, rotation.y + time * 0.1, rotation.z))
      tempObject.quaternion.copy(tempQuat)
      tempObject.scale.setScalar(scale)
      tempObject.updateMatrix()
      cubeMeshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    cubeMeshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <instancedMesh ref={cubeMeshRef} args={[null, null, CUBE_COUNT]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" wireframe roughness={0.5} />
      </instancedMesh>
    </>
  )
}

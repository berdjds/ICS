"use client"

import * as THREE from "three"
import { useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { BackgroundCubes } from "./background-cubes"
import { getOptimalCubeCount } from "./particle-helpers"

export function StaticScene() {
  const { camera } = useThree()
  const CUBE_COUNT = useMemo(() => getOptimalCubeCount(), [])

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[camera.position.x, camera.position.y, camera.position.z]} intensity={0.8} />
      
      <BackgroundCubes count={CUBE_COUNT} />
    </>
  )
}
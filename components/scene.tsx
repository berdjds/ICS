"use client"

import * as THREE from "three"
import { useMemo, useRef, useLayoutEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import { BackgroundCubes } from "./scene/background-cubes"
import { createCircleTexture, getOptimalParticleCount, getOptimalCubeCount } from "./scene/particle-helpers"
import { getAISkullLogoPoints } from "./scene/logo-generators/ai-skull-logo"
import { getEarthLogoPoints } from "./scene/logo-generators/earth-logo"
import { getCloudMigrationLogoPoints } from "./scene/logo-generators/cloud-migration-logo"
import { getServerLogoPoints } from "./scene/logo-generators/server-logo"

export function Scene() {
  const scroll = useScroll()
  const { viewport, camera, pointer } = useThree()

  const PARTICLE_COUNT = useMemo(() => getOptimalParticleCount(), [])
  const CUBE_COUNT = useMemo(() => getOptimalCubeCount(), [])

  const mainShapeGroupRef = useRef<THREE.Group>(null!)
  const particlePositionsRef = useRef<THREE.BufferAttribute>(null!)
  const particleSizesRef = useRef<THREE.BufferAttribute>(null!)
  const particleColorsRef = useRef<THREE.BufferAttribute>(null!)
  const pointsRef = useRef<THREE.Points>(null!)

  // Store original positions for glitch effect
  const originalPositionsRef = useRef<Float32Array | null>(null)
  // Store AWS particle boundary for logo coloring
  const awsEndIndexRef = useRef<number>(0)

  // Create circular texture for particles
  const circleTexture = useMemo(() => createCircleTexture(), [])

  const { shapeTargets, cubesData, yOffsets, awsEndIndex2 } = useMemo(() => {
    // --- 1. AI Skull Logo ---
    const aiSkullPoints = getAISkullLogoPoints(PARTICLE_COUNT)

    // --- 2. Earth Logo Geometry for Section 2 (Stepping into the Future) ---
    const earthLogoPoints = getEarthLogoPoints(PARTICLE_COUNT)

    // --- 3. Cloud Migration Logo Geometry for Section 3 ---
    const cloudMigrationPoints = getCloudMigrationLogoPoints(PARTICLE_COUNT)

    // --- 4. Server Infrastructure Logo ---
    const serverLogoPoints = getServerLogoPoints(PARTICLE_COUNT)

    // --- 5. Section 5 - Empty (no particles) ---
    const section5Points = Array(PARTICLE_COUNT).fill(null).map(() => new THREE.Vector3(0, 0, 0))

    // --- 6. Footer Geometry - Empty since particles are hidden ---
    const footerPoints = Array(PARTICLE_COUNT).fill(null).map(() => new THREE.Vector3(0, 0, 0))

    const targets = [
      aiSkullPoints, // Section 1: Hero - AI Skull Logo
      earthLogoPoints, // Section 2: Earth Logo (Stepping into the Future)
      cloudMigrationPoints, // Section 3: Cloud Migration Logo
      serverLogoPoints, // Section 4: Server Infrastructure Logo
      section5Points, // Section 5: Proven Execution (no particles)
      footerPoints, // Section 6: Footer - No particles (only background dots)
    ]

    // Y offsets for each section
    const yOffsets = [0, 0, 0, 0, 0, 0] // One offset per section

    const cubes = Array.from({ length: CUBE_COUNT }, () => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      scale: Math.random() * 0.3 + 0.1,
    }))

    return {
      shapeTargets: targets,
      cubesData: cubes,
      yOffsets: yOffsets,
      awsEndIndex: 0
    }
  }, [PARTICLE_COUNT, CUBE_COUNT])

  // Store the AWS end index for section 5 use in animation
  awsEndIndexRef.current = 0

  const { initialParticlePositions, initialParticleSizes, initialParticleColors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const initialPoints = shapeTargets[0]

    // Base color (Intel CS blue)
    const baseColor = new THREE.Color("#00d4ff")

    // Special colors for logos
    const orangeColor = new THREE.Color("#00d4ff")
    const greenColor = new THREE.Color("#00d4ff")

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = initialPoints[i] || new THREE.Vector3(0, 0, 0)
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z

      // Adjusted initial size for increased particle count
      sizes[i] = 0.13 + Math.random() * 0.13

      // Initial color (Intel CS blue) with slight opacity variation
      const opacity = 0.7 + Math.random() * 0.3
      colors[i * 3] = baseColor.r * opacity
      colors[i * 3 + 1] = baseColor.g * opacity
      colors[i * 3 + 2] = baseColor.b * opacity
    }

    // Store original positions for glitch effect
    originalPositionsRef.current = new Float32Array(positions)

    return {
      initialParticlePositions: positions,
      initialParticleSizes: sizes,
      initialParticleColors: colors,
    }
  }, [shapeTargets, PARTICLE_COUNT])

  const tempObject = new THREE.Object3D()
  const tempVec = new THREE.Vector3()
  const tempQuat = new THREE.Quaternion()
  const mousePosition = useRef(new THREE.Vector2())

  useLayoutEffect(() => {
    // Cube mesh initialization removed - using Points for background dots instead
  }, [])

  useFrame((state) => {
    if (!mainShapeGroupRef.current || !particlePositionsRef.current) return

    const time = state.clock.elapsedTime
    const scrollOffset = scroll.offset

    // Update mouse position
    mousePosition.current.copy(pointer)

    const currentSegmentFloat = scrollOffset * 5
    const currentSegment = Math.floor(currentSegmentFloat)
    const segmentProgress = currentSegmentFloat % 1

    // --- POSITIONING LOGIC FOR 6 SECTIONS ---
    // Individual positioning for each 3D structure
    let sourceX, nextX

    // Calculate positions for 35% text / 65% 3D distribution
    const rightPosition = viewport.width * 0.25  // Center of right 65% area
    const leftPosition = -viewport.width * 0.20  // Center of left 65% area

    if (currentSegment === 0) {
      // Section 1: Brain circuit - right side (text left)
      sourceX = rightPosition
      nextX = leftPosition
    } else if (currentSegment === 1) {
      // Section 2: Globe - left side (text right)
      sourceX = -viewport.width * 0.30
      nextX = rightPosition
    } else if (currentSegment === 2) {
      // Section 3: Cloud migration - right side (text left)
      sourceX = rightPosition
      nextX = leftPosition
    } else if (currentSegment === 3) {
      // Section 4: Server infrastructure - left side (text right)
      sourceX = leftPosition
      nextX = rightPosition
    } else if (currentSegment === 4) {
      // Section 5: Hide particles
      sourceX = 0
      nextX = 0
    } else {
      // Section 6: Footer - centered
      sourceX = 0
      nextX = 0
    }

    // Apply positioning with smooth transitions
    mainShapeGroupRef.current.position.x = THREE.MathUtils.lerp(sourceX, nextX, segmentProgress)

    mainShapeGroupRef.current.position.y = THREE.MathUtils.lerp(
      yOffsets[currentSegment] ?? 0,
      yOffsets[Math.min(currentSegment + 1, yOffsets.length - 1)] ?? 0,
      segmentProgress,
    )

    // Standard rotation for all sections
    mainShapeGroupRef.current.rotation.z = 0
    mainShapeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      mainShapeGroupRef.current.rotation.y,
      state.mouse.x * 0.3,
      0.1,
    )
    mainShapeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      mainShapeGroupRef.current.rotation.x,
      -state.mouse.y * 0.3,
      0.1,
    )

    // Scale handling
    if (currentSegment === 4 || currentSegment === 5) {
      // Section 5 and Footer - hide main particles
      mainShapeGroupRef.current.visible = false
    } else {
      // All other sections - larger scale to fill 65% area properly
      mainShapeGroupRef.current.scale.setScalar(1.1)
      mainShapeGroupRef.current.visible = true
    }

    const sourcePoints = shapeTargets[currentSegment]
    const nextSegment = Math.min(currentSegment + 1, shapeTargets.length - 1)
    const targetPoints = shapeTargets[nextSegment]
    const positions = particlePositionsRef.current.array as Float32Array
    const sizes = particleSizesRef.current?.array as Float32Array
    const colors = particleColorsRef.current?.array as Float32Array

    // Convert mouse position to world coordinates
    const mouseWorldPos = new THREE.Vector3()
    mouseWorldPos.set(
      (mousePosition.current.x * viewport.width) / 2,
      (mousePosition.current.y * viewport.height) / 2,
      0,
    )

    // Base colors
    const baseColor = new THREE.Color("#00d4ff")
    const brightColor = new THREE.Color("#00d4ff") // Brighter cyan for hover effect
    const glowColor = new THREE.Color("#ffffff") // White for maximum brightness
    const circuitColor = new THREE.Color("#00ff88") // Green for circuit traces

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const source = sourcePoints[i] || new THREE.Vector3(0, 0, 0)
      const target = targetPoints[i] || new THREE.Vector3(0, 0, 0)

      // Delay transition - start morphing after 70% through the section
      let morphProgress = 0
      if (segmentProgress > 0.7) {
        morphProgress = (segmentProgress - 0.7) / 0.3
        // Apply easing for smooth transition
        morphProgress = morphProgress * morphProgress * (3 - 2 * morphProgress)
      }

      tempVec.copy(source).lerp(target, morphProgress)

      // AI Skull logo animations (only in first section)
      if (currentSegment === 0) {
        const worldPos = tempVec.clone().applyMatrix4(mainShapeGroupRef.current.matrixWorld)
        const distance = worldPos.distanceTo(mouseWorldPos)
        const maxDistance = 3.0 // Same as other structures
        const influence = Math.max(0, 1 - distance / maxDistance)

        // AI Skull logo Intel CS blue base color - Mohsin color
        const aiSkullBaseColor = new THREE.Color("#00d4ff") // Intel CS blue
        const brightColor = new THREE.Color("#00A8E0") // Brighter blue for hover
        const glowColor = new THREE.Color("#ffffff") // White for intense glow

        // Add vertical particle movement
        const particlePhase = (i / PARTICLE_COUNT) * Math.PI * 2
        const verticalOffset = Math.sin(time * 2 + particlePhase) * 0.1
        tempVec.y += verticalOffset

        // Add subtle breathing/pulsing effect to the whole skull
        const breathingScale = 1 + Math.sin(time * 1.5) * 0.03
        tempVec.multiplyScalar(breathingScale)

        // Mouse hover effects
        if (influence > 0) {
          // Enhanced brightness effect with glow
          const glowIntensity = influence * Math.sin(time * 4) * 0.3 + 0.7
          const currentColor = aiSkullBaseColor.clone()
            .lerp(brightColor, influence * 0.6)
            .lerp(glowColor, influence * glowIntensity * 0.3)
          colors[i * 3] = currentColor.r
          colors[i * 3 + 1] = currentColor.g
          colors[i * 3 + 2] = currentColor.b

          // Dynamic size effect with pulsing
          const sizePulse = Math.sin(time * 5 + i * 0.1) * 0.02
          sizes[i] = 0.13 + influence * 0.13 + sizePulse

          // Enhanced motion effect - particles swirl around mouse
          const mouseDirection = mouseWorldPos.clone().sub(worldPos).normalize()
          const swirlAngle = time * 2 + i * 0.1
          const swirlDirection = new THREE.Vector3(
            mouseDirection.x * Math.cos(swirlAngle) - mouseDirection.y * Math.sin(swirlAngle),
            mouseDirection.x * Math.sin(swirlAngle) + mouseDirection.y * Math.cos(swirlAngle),
            mouseDirection.z
          )
          tempVec.add(swirlDirection.multiplyScalar(influence * 0.4))

          // Add floating motion with variation
          const floatOffset = Math.sin(time * 3 + i * 0.1) * influence * 0.15
          const floatOffsetX = Math.cos(time * 2.5 + i * 0.15) * influence * 0.05
          tempVec.y += floatOffset
          tempVec.x += floatOffsetX
        } else {
          // Non-hovered state - enhanced AI Skull animation
          const aiPulse = 0.85 + Math.sin(time * 2 + i * 0.01) * 0.15
          const colorShift = Math.sin(time * 1.5 + i * 0.005) * 0.1
          colors[i * 3] = aiSkullBaseColor.r * aiPulse + colorShift
          colors[i * 3 + 1] = aiSkullBaseColor.g * aiPulse
          colors[i * 3 + 2] = aiSkullBaseColor.b * aiPulse - colorShift * 0.5
          
          // Subtle size variation
          const sizeVariation = Math.sin(time * 2.5 + i * 0.02) * 0.01
          sizes[i] = 0.13 + sizeVariation
        }
      } else {
        // Apply main shape group transformations to get world position for other sections
        const worldPos = tempVec.clone().applyMatrix4(mainShapeGroupRef.current.matrixWorld)

        // Calculate distance from mouse to particle for other sections
        const distance = worldPos.distanceTo(mouseWorldPos)
        const maxDistance = 3.0 // Maximum distance for mouse effect
        const influence = Math.max(0, 1 - distance / maxDistance)

        // Special handling for Earth/Globe section with particle movement only
        if (currentSegment === 1) {
          // Earth logo section particles - maintain #00d4ff color consistently
          const earthBaseColor = new THREE.Color("#00d4ff") // Intel CS blue
          const earthBrightColor = new THREE.Color("#00d4ff") // Keep same color for hover
          const glowColor = new THREE.Color("#ffffff") // White for glow effect

          // Add vertical particle movement
          const particlePhase = (i / PARTICLE_COUNT) * Math.PI * 2
          const verticalOffset = Math.sin(time * 2.5 + particlePhase) * 0.08
          tempVec.y += verticalOffset

          // Add subtle breathing effect
          const breathingScale = 1 + Math.sin(time * 1.8) * 0.02
          tempVec.multiplyScalar(breathingScale)

          if (influence > 0) {
            // Enhanced hover effect with glow
            const glowIntensity = influence * Math.sin(time * 4) * 0.2 + 0.8
            const currentColor = earthBaseColor.clone()
              .lerp(glowColor, influence * glowIntensity * 0.2)
            colors[i * 3] = currentColor.r
            colors[i * 3 + 1] = currentColor.g
            colors[i * 3 + 2] = currentColor.b

            // Size effect - make particles larger when hovered
            sizes[i] = 0.13 + influence * 0.13

            // Motion effect - add slight movement towards mouse
            const mouseDirection = mouseWorldPos.clone().sub(worldPos).normalize()
            tempVec.add(mouseDirection.multiplyScalar(influence * 0.3))

            // Add enhanced floating motion
            const floatOffset = Math.sin(time * 3 + i * 0.1) * influence * 0.12
            tempVec.y += floatOffset
          } else {
            // Non-hovered state with subtle animation
            const earthPulse = 0.9 + Math.sin(time * 2 + i * 0.01) * 0.1
            colors[i * 3] = earthBaseColor.r * earthPulse
            colors[i * 3 + 1] = earthBaseColor.g * earthPulse
            colors[i * 3 + 2] = earthBaseColor.b * earthPulse
            sizes[i] = 0.13
          }
        } else if (influence > 0) {
          // Mouse hover effects for other sections (not Earth)
          // Brightness effect - interpolate between base and bright color
          const currentColor = baseColor.clone().lerp(brightColor, influence * 0.8)
          colors[i * 3] = currentColor.r
          colors[i * 3 + 1] = currentColor.g
          colors[i * 3 + 2] = currentColor.b

          // Size effect - make particles larger when hovered
          sizes[i] = 0.13 + influence * 0.13

          // Motion effect - add slight movement towards mouse
          const mouseDirection = mouseWorldPos.clone().sub(worldPos).normalize()
          tempVec.add(mouseDirection.multiplyScalar(influence * 0.3))

          // Add floating motion
          const floatOffset = Math.sin(time * 3 + i * 0.1) * influence * 0.1
          tempVec.y += floatOffset
        } else {
          // Reset to base values for non-Earth sections without hover
          if (currentSegment === 2) {
            // Cloud migration section particles with vertical movement
            const cloudColor = new THREE.Color("#00d4ff")
            
            // Add vertical particle movement for cloud effect
            const particlePhase = (i / PARTICLE_COUNT) * Math.PI * 2
            const verticalOffset = Math.sin(time * 2 + particlePhase) * 0.12
            tempVec.y += verticalOffset
            
            // Add horizontal drift for cloud-like motion
            const horizontalDrift = Math.cos(time * 1.5 + particlePhase) * 0.05
            tempVec.x += horizontalDrift
            
            // Breathing effect
            const breathingScale = 1 + Math.sin(time * 1.8) * 0.03
            tempVec.multiplyScalar(breathingScale)
            
            const cloudPulse = 0.9 + Math.sin(time * 2.5 + i * 0.015) * 0.1
            colors[i * 3] = cloudColor.r * cloudPulse
            colors[i * 3 + 1] = cloudColor.g * cloudPulse
            colors[i * 3 + 2] = cloudColor.b * cloudPulse
            sizes[i] = 0.13 + Math.sin(time * 2 + i * 0.025) * 0.015
          } else {
            colors[i * 3] = baseColor.r
            colors[i * 3 + 1] = baseColor.g
            colors[i * 3 + 2] = baseColor.b
            sizes[i] = 0.13
          }
        }
      }

      // Skip further color processing for Earth section as it's already handled above
      if (currentSegment === 1) {
        // Earth section colors are already set, skip to position update
      } else if (currentSegment === 3) {
        // Server infrastructure logo animations (section 4)
        // Server particles with Intel CS blue color scheme
        const serverColorLight = new THREE.Color("#00d4ff") // Light blue
        const serverColorBase = new THREE.Color("#00d4ff") // Intel CS blue
        const serverColorDark = new THREE.Color("#00d4ff") // Dark blue

        // Add vertical particle movement for server rack effect
        const particlePhase = (i / PARTICLE_COUNT) * Math.PI * 2
        const verticalOffset = Math.sin(time * 1.8 + particlePhase) * 0.1
        tempVec.y += verticalOffset
        
        // Add subtle horizontal movement for data flow effect
        const horizontalFlow = Math.sin(time * 2.5 + tempVec.y * 2) * 0.03
        tempVec.x += horizontalFlow
        
        // Breathing effect
        const breathingScale = 1 + Math.sin(time * 2) * 0.025
        tempVec.multiplyScalar(breathingScale)

        // Create subtle pulsing effect
        const serverPulse = 0.9 + Math.sin(time * 1.8 + i * 0.008) * 0.1

        // Create gradient effect based on position
        const xInfluence = (tempVec.x + 2.5) / 5 // Horizontal gradient
        const yInfluence = (tempVec.y + 2.5) / 5 // Vertical gradient
        const combinedInfluence = (xInfluence + yInfluence) / 2

        // Three-way color mix for depth
        let colorMix
        if (combinedInfluence < 0.5) {
          colorMix = serverColorLight.clone().lerp(serverColorBase, combinedInfluence * 2)
        } else {
          colorMix = serverColorBase.clone().lerp(serverColorDark, (combinedInfluence - 0.5) * 2)
        }

        colors[i * 3] = colorMix.r * serverPulse
        colors[i * 3 + 1] = colorMix.g * serverPulse
        colors[i * 3 + 2] = colorMix.b * serverPulse

        // Size with subtle variation
        sizes[i] = 0.13 + Math.sin(time * 2 + i * 0.02) * 0.012
      }

      // Section 4 is now the last section with particles (no section 5 particles)

      // No explosion transition - normal behavior for all sections
      if (currentSegment >= 5) {
        // Footer section - particles are hidden, no need to update
        // Only background dots remain visible
      }

      positions[i * 3] = tempVec.x
      positions[i * 3 + 1] = tempVec.y
      positions[i * 3 + 2] = tempVec.z
    }

    particlePositionsRef.current.needsUpdate = true
    if (particleSizesRef.current) particleSizesRef.current.needsUpdate = true
    if (particleColorsRef.current) particleColorsRef.current.needsUpdate = true
  })

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[camera.position.x, camera.position.y, camera.position.z]} intensity={0.8} />

      <group ref={mainShapeGroupRef}>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              ref={particlePositionsRef}
              attach="attributes-position"
              count={PARTICLE_COUNT}
              array={initialParticlePositions}
              itemSize={3}
            />
            <bufferAttribute
              ref={particleSizesRef}
              attach="attributes-size"
              count={PARTICLE_COUNT}
              array={initialParticleSizes}
              itemSize={1}
            />
            <bufferAttribute
              ref={particleColorsRef}
              attach="attributes-color"
              count={PARTICLE_COUNT}
              array={initialParticleColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.13}
            sizeAttenuation
            transparent
            alphaTest={0.001}
            vertexColors
            map={circleTexture}
            alphaMap={circleTexture}
            blending={THREE.NormalBlending}
            opacity={0.9}
          />
        </points>
      </group>

      <BackgroundCubes count={CUBE_COUNT} />


      {/* Bloom disabled for performance
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={2.5} />
      </EffectComposer>
      */}
    </>
  )
}

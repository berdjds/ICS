"use client"

import * as THREE from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

interface BackgroundDotsProps {
  count: number
  circleTexture: THREE.Texture
  dotsPositions: Float32Array
  dotsSizes: Float32Array
  dotsVelocities: Float32Array
}

export function BackgroundDots({ count, circleTexture, dotsPositions, dotsSizes, dotsVelocities }: BackgroundDotsProps) {
  const dotsRef = useRef<THREE.Points>(null!)
  const velocitiesRef = useRef<Float32Array>(dotsVelocities)

  useFrame((state) => {
    if (!dotsRef.current) return

    const time = state.clock.elapsedTime
    const positions = dotsRef.current.geometry.attributes.position.array as Float32Array
    const velocities = velocitiesRef.current

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Apply floating motion with velocity
      positions[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.002
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.4 + i) * 0.002
      positions[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.3 + i) * 0.002

      // Wrap around boundaries
      if (Math.abs(positions[i3]) > 20) positions[i3] *= -0.9
      if (Math.abs(positions[i3 + 1]) > 20) positions[i3 + 1] *= -0.9
      if (Math.abs(positions[i3 + 2]) > 20) positions[i3 + 2] *= -0.9
    }

    dotsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={dotsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={dotsPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={dotsSizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          uTexture: { value: circleTexture },
          uColor: { value: new THREE.Color("#ffffff") },
          uOpacity: { value: 0.6 }
        }}
        vertexShader={`
          attribute float size;
          varying float vSize;
          void main() {
            vSize = size;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vSize;
          void main() {
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float r = length(xy);
            if (r > 0.5) discard;
            
            vec4 texture = texture2D(uTexture, gl_PointCoord);
            gl_FragColor = vec4(uColor, texture.a * uOpacity);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
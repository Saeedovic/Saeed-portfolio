import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { LandmarkData } from './InteractiveWorld'

interface InteractionZoneProps {
  data: LandmarkData
  isNearby: boolean
}

/**
 * A subtle floor marker indicating an interactive spot in the studio.
 * Renders a soft ring + gentle pulse — no pillars, no floating cubes.
 */
function InteractionZone({ data, isNearby }: InteractionZoneProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const time = useRef(0)

  const ringMat = useRef(
    new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  )
  const glowMat = useRef(
    new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  )

  useFrame((_, delta) => {
    time.current += delta
    const pulse = 0.5 + Math.sin(time.current * 2) * 0.5

    if (ringRef.current) {
      const target = isNearby ? 1.35 : 1
      ringRef.current.scale.lerp(new THREE.Vector3(target, target, 1), 0.12)
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = isNearby ? 0.55 + pulse * 0.25 : 0.22 + pulse * 0.08
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = isNearby ? 0.16 + pulse * 0.08 : 0.07
    }
  })

  return (
    <group position={[data.position[0], 0.015, data.position[2]]}>
      {/* Outer soft glow */}
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 32]} />
        <primitive object={glowMat.current} attach="material" />
      </mesh>
      {/* Inner ring */}
      <mesh ref={ringRef} position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.52, 40]} />
        <primitive object={ringMat.current} attach="material" />
      </mesh>
    </group>
  )
}

export default InteractionZone
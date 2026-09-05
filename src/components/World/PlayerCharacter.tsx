import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PlayerCharacterProps {
  position: React.MutableRefObject<THREE.Vector3>
  facing: React.MutableRefObject<number>
  isMoving: React.MutableRefObject<boolean>
}

function PlayerCharacter({ position, facing, isMoving }: PlayerCharacterProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const legLRef = useRef<THREE.Group>(null)
  const legRRef = useRef<THREE.Group>(null)
  const armLRef = useRef<THREE.Group>(null)
  const armRRef = useRef<THREE.Group>(null)

  const walkPhase = useRef(0)
  const moveBlend = useRef(0)

  const mats = useRef({
    skin: new THREE.MeshStandardMaterial({ color: '#c4956a', roughness: 0.7 }),
    shirt: new THREE.MeshStandardMaterial({ color: '#2f3542', roughness: 0.8 }),
    pants: new THREE.MeshStandardMaterial({ color: '#2a3245', roughness: 0.85 }),
    shoe: new THREE.MeshStandardMaterial({ color: '#1c1f26', roughness: 0.6 }),
    hair: new THREE.MeshStandardMaterial({ color: '#171522', roughness: 0.9 }),
    collar: new THREE.MeshStandardMaterial({ color: '#6c5ce7', roughness: 0.5 }),
    eye: new THREE.MeshStandardMaterial({ color: '#1c1c24', roughness: 0.4 }),
  })

  useFrame((_, delta) => {
    if (!groupRef.current || !bodyRef.current) return

    const clamped = Math.min(delta, 0.05)

    groupRef.current.position.copy(position.current)
    groupRef.current.rotation.y = facing.current

    const targetBlend = isMoving.current ? 1 : 0
    moveBlend.current = THREE.MathUtils.lerp(
      moveBlend.current,
      targetBlend,
      1 - Math.pow(0.0025, clamped)
    )
    const blend = moveBlend.current

    walkPhase.current += clamped * 9
    const p = walkPhase.current
    const swing = Math.sin(p)
    const bounce = Math.abs(Math.sin(p * 2))

    if (legLRef.current) legLRef.current.rotation.x = swing * 0.62 * blend
    if (legRRef.current) legRRef.current.rotation.x = -swing * 0.62 * blend

    if (armLRef.current) {
      armLRef.current.rotation.x = -swing * 0.5 * blend
      armLRef.current.rotation.z = 0.12 + Math.abs(swing) * 0.05 * blend
    }
    if (armRRef.current) {
      armRRef.current.rotation.x = swing * 0.5 * blend
      armRRef.current.rotation.z = -0.12 - Math.abs(swing) * 0.05 * blend
    }

    bodyRef.current.position.y = bounce * 0.045 * blend
    bodyRef.current.rotation.x = 0.05 * blend
    bodyRef.current.rotation.z = Math.sin(p) * 0.03 * blend

    if (headRef.current) {
      headRef.current.position.y = 1.52 - bounce * 0.02 * blend
      headRef.current.rotation.x = -0.03 * blend
    }

    // Idle breathing when stopped
    if (blend < 0.05) {
      const t = performance.now() * 0.001
      bodyRef.current.position.y = Math.sin(t * 1.8) * 0.012
      if (armLRef.current) armLRef.current.rotation.z = 0.12 + Math.sin(t * 1.8) * 0.02
      if (armRRef.current) armRRef.current.rotation.z = -0.12 - Math.sin(t * 1.8) * 0.02
    }
  })

  const m = mats.current

  return (
    <group ref={groupRef}>
      <group ref={bodyRef}>
        {/* Hips */}
        <mesh position={[0, 0.82, 0]} castShadow>
          <boxGeometry args={[0.3, 0.14, 0.2]} />
          <primitive object={m.pants} attach="material" />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 1.08, 0]} castShadow>
          <capsuleGeometry args={[0.17, 0.3, 6, 14]} />
          <primitive object={m.shirt} attach="material" />
        </mesh>

        {/* Collar accent */}
        <mesh position={[0, 1.28, 0]}>
          <torusGeometry args={[0.1, 0.018, 8, 18]} />
          <primitive object={m.collar} attach="material" />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 1.52, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.155, 16, 16]} />
            <primitive object={m.skin} attach="material" />
          </mesh>
          {/* Curly hair */}
          {[
            [0, 0.12, 0, 0.09], [0.07, 0.1, 0.04, 0.07], [-0.07, 0.1, 0.04, 0.07],
            [0.05, 0.12, -0.05, 0.065], [-0.05, 0.12, -0.05, 0.065], [0, 0.14, 0.01, 0.07],
            [0.1, 0.08, -0.01, 0.055], [-0.1, 0.08, -0.01, 0.055],
          ].map(([x, y, z, s], i) => (
            <mesh key={i} position={[x, y, z]} castShadow>
              <sphereGeometry args={[s, 8, 8]} />
              <primitive object={m.hair} attach="material" />
            </mesh>
          ))}
          {/* Eyes */}
          {[-0.05, 0.05].map((x, i) => (
            <mesh key={i} position={[x, 0.01, 0.14]}>
              <sphereGeometry args={[0.018, 6, 6]} />
              <primitive object={m.eye} attach="material" />
            </mesh>
          ))}
        </group>

        {/* Arms — pivot at shoulders */}
        <group ref={armLRef} position={[-0.21, 1.26, 0]}>
          <mesh position={[0, -0.16, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.22, 4, 10]} />
            <primitive object={m.shirt} attach="material" />
          </mesh>
          <mesh position={[0, -0.34, 0]} castShadow>
            <sphereGeometry args={[0.05, 10, 10]} />
            <primitive object={m.skin} attach="material" />
          </mesh>
        </group>
        <group ref={armRRef} position={[0.21, 1.26, 0]}>
          <mesh position={[0, -0.16, 0]} castShadow>
            <capsuleGeometry args={[0.05, 0.22, 4, 10]} />
            <primitive object={m.shirt} attach="material" />
          </mesh>
          <mesh position={[0, -0.34, 0]} castShadow>
            <sphereGeometry args={[0.05, 10, 10]} />
            <primitive object={m.skin} attach="material" />
          </mesh>
        </group>

        {/* Legs — pivot at hips, with feet */}
        <group ref={legLRef} position={[-0.09, 0.78, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <capsuleGeometry args={[0.06, 0.3, 4, 10]} />
            <primitive object={m.pants} attach="material" />
          </mesh>
          <mesh position={[0, -0.45, 0.03]} castShadow>
            <boxGeometry args={[0.1, 0.06, 0.2]} />
            <primitive object={m.shoe} attach="material" />
          </mesh>
        </group>
        <group ref={legRRef} position={[0.09, 0.78, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <capsuleGeometry args={[0.06, 0.3, 4, 10]} />
            <primitive object={m.pants} attach="material" />
          </mesh>
          <mesh position={[0, -0.45, 0.03]} castShadow>
            <boxGeometry args={[0.1, 0.06, 0.2]} />
            <primitive object={m.shoe} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Soft contact shadow blob */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.28, 20]} />
        <meshBasicMaterial color="#3a3428" transparent opacity={0.28} />
      </mesh>
    </group>
  )
}

export default PlayerCharacter
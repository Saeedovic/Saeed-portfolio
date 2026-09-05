import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ---------- Materials (shared, memoized) ---------- */

function useStudioMaterials() {
  return useMemo(
    () => ({
      floor: new THREE.MeshStandardMaterial({ color: '#b8a58c', roughness: 0.65, metalness: 0.05 }),
      floorDark: new THREE.MeshStandardMaterial({ color: '#8a7a66', roughness: 0.7 }),
      wall: new THREE.MeshStandardMaterial({ color: '#e8e4dd', roughness: 0.9 }),
      wallAccent: new THREE.MeshStandardMaterial({ color: '#dcd6cc', roughness: 0.9 }),
      trim: new THREE.MeshStandardMaterial({ color: '#c9c2b5', roughness: 0.8 }),
      ceiling: new THREE.MeshStandardMaterial({ color: '#f2efe9', roughness: 0.95 }),
      wood: new THREE.MeshStandardMaterial({ color: '#9a7b57', roughness: 0.6 }),
      woodDark: new THREE.MeshStandardMaterial({ color: '#6b543c', roughness: 0.6 }),
      deskTop: new THREE.MeshStandardMaterial({ color: '#c9b295', roughness: 0.5 }),
      metal: new THREE.MeshStandardMaterial({ color: '#5a5e66', roughness: 0.35, metalness: 0.7 }),
      black: new THREE.MeshStandardMaterial({ color: '#22242a', roughness: 0.4 }),
      screenOff: new THREE.MeshStandardMaterial({ color: '#14161c', roughness: 0.2, metalness: 0.2 }),
      screenPurple: new THREE.MeshStandardMaterial({
        color: '#1c1633', emissive: '#6c5ce7', emissiveIntensity: 0.55, roughness: 0.3,
      }),
      screenTeal: new THREE.MeshStandardMaterial({
        color: '#0d2626', emissive: '#00b894', emissiveIntensity: 0.4, roughness: 0.3,
      }),
      accent: new THREE.MeshStandardMaterial({ color: '#6c5ce7', roughness: 0.5 }),
      accentGlow: new THREE.MeshStandardMaterial({
        color: '#6c5ce7', emissive: '#6c5ce7', emissiveIntensity: 0.9, roughness: 0.4,
      }),
      fabric: new THREE.MeshStandardMaterial({ color: '#4a5468', roughness: 0.95 }),
      fabricLight: new THREE.MeshStandardMaterial({ color: '#8b93a5', roughness: 0.95 }),
      plant: new THREE.MeshStandardMaterial({ color: '#3f7d54', roughness: 0.9 }),
      plantPot: new THREE.MeshStandardMaterial({ color: '#b5673f', roughness: 0.8 }),
      paper: new THREE.MeshStandardMaterial({ color: '#f5f3ee', roughness: 0.9 }),
      robot: new THREE.MeshStandardMaterial({ color: '#cfd6de', roughness: 0.35, metalness: 0.6 }),
      robotEye: new THREE.MeshStandardMaterial({ color: '#00cec9', emissive: '#00cec9', emissiveIntensity: 1.4 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#cfe4ee', transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0,
      }),
      sky: new THREE.MeshBasicMaterial({ color: '#bcd9ec' }),
      cloud: new THREE.MeshBasicMaterial({ color: '#eef4f8' }),
      whiteboard: new THREE.MeshStandardMaterial({ color: '#f7f7f4', roughness: 0.4 }),
      marker: new THREE.MeshStandardMaterial({ color: '#2f3542', roughness: 0.8 }),
    }),
    []
  )
}

/* ---------- Reusable pieces ---------- */

function Desk({ m, position, rotation = 0, screen = 'purple', monitorCount = 1 }: {
  m: ReturnType<typeof useStudioMaterials>
  position: [number, number, number]
  rotation?: number
  screen?: 'purple' | 'teal' | 'off'
  monitorCount?: number
}) {
  const screenMat = screen === 'purple' ? m.screenPurple : screen === 'teal' ? m.screenTeal : m.screenOff
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Desk top */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.05, 0.8]} />
        <primitive object={m.deskTop} attach="material" />
      </mesh>
      {/* Legs */}
      {[[-0.78, -0.34], [0.78, -0.34], [-0.78, 0.34], [0.78, 0.34]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.37, z]} castShadow>
          <boxGeometry args={[0.06, 0.72, 0.06]} />
          <primitive object={m.metal} attach="material" />
        </mesh>
      ))}
      {/* Monitors */}
      {Array.from({ length: monitorCount }).map((_, i) => {
        const x = monitorCount === 1 ? 0 : i === 0 ? -0.42 : 0.42
        return (
          <group key={`mon-${i}`} position={[x, 1.02, -0.12]}>
            <mesh castShadow>
              <boxGeometry args={[0.62, 0.4, 0.04]} />
              <primitive object={m.black} attach="material" />
            </mesh>
            <mesh position={[0, 0, 0.025]}>
              <boxGeometry args={[0.57, 0.35, 0.01]} />
              <primitive object={screenMat} attach="material" />
            </mesh>
            <mesh position={[0, -0.24, 0]}>
              <boxGeometry args={[0.1, 0.06, 0.1]} />
              <primitive object={m.black} attach="material" />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <boxGeometry args={[0.04, 0.14, 0.04]} />
              <primitive object={m.metal} attach="material" />
            </mesh>
          </group>
        )
      })}
      {/* Keyboard + mouse */}
      <mesh position={[0, 0.78, 0.18]} castShadow>
        <boxGeometry args={[0.42, 0.02, 0.15]} />
        <primitive object={m.black} attach="material" />
      </mesh>
      <mesh position={[0.35, 0.78, 0.18]} castShadow>
        <sphereGeometry args={[0.035, 8, 8]} />
        <primitive object={m.black} attach="material" />
      </mesh>
      {/* Chair */}
      <group position={[0, 0, 0.75]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.45, 0.06, 0.45]} />
          <primitive object={m.fabric} attach="material" />
        </mesh>
        <mesh position={[0, 0.75, 0.22]} rotation={[0.12, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.55, 0.06]} />
          <primitive object={m.fabric} attach="material" />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.42, 8]} />
          <primitive object={m.metal} attach="material" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.24, 0.26, 0.05, 12]} />
          <primitive object={m.black} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

function Shelf({ m, position, rotation = 0 }: {
  m: ReturnType<typeof useStudioMaterials>
  position: [number, number, number]
  rotation?: number
}) {
  const bookColors = ['#c0504d', '#4a7fb5', '#5d8a5d', '#c8a04e', '#8a6db5', '#b5744a']
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[0.5, 1.0, 1.5].map((y, row) => (
        <group key={row}>
          <mesh position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.05, 0.32]} />
            <primitive object={m.wood} attach="material" />
          </mesh>
          {Array.from({ length: 6 + (row % 2) }).map((_, i) => {
            const w = 0.06 + ((i * 7 + row * 3) % 5) * 0.012
            const h = 0.24 + ((i * 5 + row) % 4) * 0.02
            return (
              <mesh key={i} position={[-0.68 + i * 0.19, y + 0.03 + h / 2, 0]} castShadow>
                <boxGeometry args={[w, h, 0.22]} />
                <meshStandardMaterial color={bookColors[(i + row) % bookColors.length]} roughness={0.85} />
              </mesh>
            )
          })}
        </group>
      ))}
      {/* Side panels */}
      {[-0.82, 0.82].map((x, i) => (
        <mesh key={i} position={[x, 1.0, 0]} castShadow>
          <boxGeometry args={[0.05, 2.0, 0.32]} />
          <primitive object={m.woodDark} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

function Plant({ m, position, scale = 1 }: {
  m: ReturnType<typeof useStudioMaterials>
  position: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.11, 0.32, 12]} />
        <primitive object={m.plantPot} attach="material" />
      </mesh>
      {[[0, 0.62, 0, 0.32], [0.1, 0.5, 0.08, 0.22], [-0.09, 0.52, -0.06, 0.24], [0.02, 0.75, -0.05, 0.18]].map(
        ([x, y, z, s], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <sphereGeometry args={[s, 8, 8]} />
            <primitive object={m.plant} attach="material" />
          </mesh>
        )
      )}
    </group>
  )
}

function Rug({ position, size }: { position: [number, number, number]; size: [number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color="#7d8899" roughness={1} />
    </mesh>
  )
}

/* ---------- Sky visible through windows ---------- */

function Exterior({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  const cloudRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.5
    }
  })
  return (
    <group>
      {/* Big soft sky backdrop behind the windows (north wall, z = -10) */}
      <mesh position={[0, 4, -13]}>
        <planeGeometry args={[60, 22]} />
        <primitive object={m.sky} attach="material" />
      </mesh>
      {/* Distant stylized buildings */}
      {[
        [-9, 0.9], [-5.5, 1.4], [-2, 0.7], [1.5, 1.1], [5, 1.6], [8.5, 0.8], [11, 1.2],
      ].map(([x, h], i) => (
        <mesh key={i} position={[x, h, -11.5]} castShadow={false}>
          <boxGeometry args={[2.2, h * 2, 1.6]} />
          <meshStandardMaterial color={i % 2 ? '#9db4c4' : '#b3c4d1'} roughness={0.9} />
        </mesh>
      ))}
      {/* Drifting clouds */}
      <group ref={cloudRef}>
        {[[-6, 5.2], [2, 6.4], [8, 4.6]].map(([x, y], i) => (
          <group key={i} position={[x, y, -11]}>
            <mesh><sphereGeometry args={[0.9, 10, 10]} /><primitive object={m.cloud} attach="material" /></mesh>
            <mesh position={[0.8, -0.1, 0]}><sphereGeometry args={[0.6, 10, 10]} /><primitive object={m.cloud} attach="material" /></mesh>
            <mesh position={[-0.8, -0.15, 0]}><sphereGeometry args={[0.55, 10, 10]} /><primitive object={m.cloud} attach="material" /></mesh>
          </group>
        ))}
      </group>
      {/* Sun-lit ground outside */}
      <mesh position={[0, -0.02, -11]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 6]} />
        <meshStandardMaterial color="#8fae7f" roughness={1} />
      </mesh>
    </group>
  )
}

/* ---------- Landmarks ---------- */

function ContentCreatorMansion({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.3
    }
  })
  return (
    <group position={[0, 0, -7]}>
      {/* Display platform â€” the most prominent spot */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.6, 0.12, 32]} />
        <primitive object={m.floorDark} attach="material" />
      </mesh>
      <mesh position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.3, 48]} />
        <primitive object={m.accentGlow} attach="material" />
      </mesh>
      {/* Large showcase screen on wall */}
      <group position={[0, 2.6, -3.35]}>
        <mesh castShadow>
          <boxGeometry args={[5.2, 2.6, 0.12]} />
          <primitive object={m.black} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[4.9, 2.3, 0.02]} />
          <primitive object={m.screenPurple} attach="material" />
        </mesh>
        {/* UI mock lines on screen (abstract, not fake screenshots) */}
        <mesh position={[-1.2, 0.7, 0.1]}>
          <boxGeometry args={[1.8, 0.14, 0.01]} />
          <primitive object={m.paper} attach="material" />
        </mesh>
        <mesh position={[-1.2, 0.35, 0.1]}>
          <boxGeometry args={[1.4, 0.1, 0.01]} />
          <meshStandardMaterial color="#a29bfe" emissive="#a29bfe" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[1.4, -0.2, 0.1]}>
          <boxGeometry args={[1.6, 1.4, 0.01]} />
          <meshStandardMaterial color="#2a2444" roughness={0.4} />
        </mesh>
        {/* Accent glow strip above */}
        <mesh position={[0, 1.45, 0.05]}>
          <boxGeometry args={[5.2, 0.06, 0.06]} />
          <primitive object={m.accentGlow} attach="material" />
        </mesh>
      </group>
      {/* Demo kiosks */}
      <Desk m={m} position={[-2.6, 0, 0.6]} rotation={0.5} screen="purple" />
      <Desk m={m} position={[2.6, 0, 0.6]} rotation={-0.5} screen="teal" />
      {/* Floating trophy ring */}
      <mesh ref={ringRef} position={[0, 1.6, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.035, 10, 40]} />
        <primitive object={m.accentGlow} attach="material" />
      </mesh>
      <mesh position={[0, 1.6, -1.2]}>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#c8a04e" roughness={0.25} metalness={0.8} />
      </mesh>
      <pointLight position={[0, 3.2, -2.4]} intensity={0.9} color="#a29bfe" distance={7} />
    </group>
  )
}

function LostRobotDisplay({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  const headRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.5
    }
  })
  return (
    <group position={[-6.5, 0, -4]} rotation={[0, 0.5, 0]}>
      {/* Sci-fi pedestal */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.15, 0.9, 6]} />
        <primitive object={m.metal} attach="material" />
      </mesh>
      <mesh position={[0, 0.92, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.06, 6]} />
        <primitive object={m.black} attach="material" />
      </mesh>
      {/* Small robot (primitives) */}
      <group position={[0, 1.35, 0]}>
        {/* body */}
        <mesh castShadow>
          <capsuleGeometry args={[0.22, 0.3, 6, 12]} />
          <primitive object={m.robot} attach="material" />
        </mesh>
        {/* head â€” slowly looks around */}
        <group ref={headRef} position={[0, 0.45, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.26, 0.28]} />
            <primitive object={m.robot} attach="material" />
          </mesh>
          <mesh position={[0, 0.02, 0.15]}>
            <boxGeometry args={[0.2, 0.06, 0.02]} />
            <primitive object={m.robotEye} attach="material" />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.1, 6]} />
            <primitive object={m.metal} attach="material" />
          </mesh>
        </group>
        {/* arms */}
        {[-0.28, 0.28].map((x, i) => (
          <mesh key={i} position={[x, 0.05, 0]} rotation={[0, 0, x > 0 ? -0.25 : 0.25]} castShadow>
            <capsuleGeometry args={[0.05, 0.24, 4, 8]} />
            <primitive object={m.robot} attach="material" />
          </mesh>
        ))}
        {/* eye glow */}
        <pointLight position={[0, 0.5, 0.4]} intensity={0.25} color="#00cec9" distance={2.5} />
      </group>
      {/* Holo ring */}
      <mesh position={[0, 0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.75, 0.85, 6]} />
        <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.8} transparent opacity={0.5} />
      </mesh>
      <pointLight position={[0, 2.2, 0]} intensity={0.5} color="#00cec9" distance={5} />
    </group>
  )
}

function ProjectArchiveStation({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  return (
    <group position={[5.8, 0, -4.5]} rotation={[0, -0.9, 0]}>
      <Desk m={m} position={[0, 0, 0]} screen="teal" monitorCount={2} />
      {/* Shelves of project binders behind */}
      <Shelf m={m} position={[0, 0, -1.1]} />
      {/* Archive label plaque */}
      <mesh position={[0, 2.5, -1.2]} castShadow>
        <boxGeometry args={[1.2, 0.35, 0.04]} />
        <primitive object={m.wallAccent} attach="material" />
      </mesh>
      <mesh position={[0, 2.5, -1.17]}>
        <boxGeometry args={[1.0, 0.16, 0.02]} />
        <primitive object={m.screenTeal} attach="material" />
      </mesh>
      <pointLight position={[0, 2.1, -0.5]} intensity={0.4} color="#00b894" distance={4} />
    </group>
  )
}

function VRStation({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  return (
    <group position={[-7.2, 0, 3.5]} rotation={[0, 1.1, 0]}>
      {/* Table */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 0.75]} />
        <primitive object={m.wood} attach="material" />
      </mesh>
      {[[-0.68, -0.3], [0.68, -0.3], [-0.68, 0.3], [0.68, 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.36, z]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <primitive object={m.woodDark} attach="material" />
        </mesh>
      ))}
      {/* Headset on stand */}
      <group position={[-0.3, 0.95, 0]}>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.06, 0.09, 0.16, 10]} />
          <primitive object={m.metal} attach="material" />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.16, 0.18]} />
          <primitive object={m.black} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[0.24, 0.08, 0.02]} />
          <primitive object={m.screenPurple} attach="material" />
        </mesh>
        <mesh position={[0, 0.12, 0]} rotation={[0.35, 0, 0]}>
          <torusGeometry args={[0.1, 0.025, 8, 20, Math.PI]} />
          <primitive object={m.fabricLight} attach="material" />
        </mesh>
      </group>
      {/* Controllers */}
      {[[0.25, 0.1], [0.45, -0.05]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.82, z]} rotation={[0.4, 0, 0.2]} castShadow>
          <capsuleGeometry args={[0.03, 0.1, 4, 8]} />
          <primitive object={m.fabricLight} attach="material" />
        </mesh>
      ))}
      {/* Tracking sensor box on wall */}
      <mesh position={[0, 2.2, -0.45]} castShadow>
        <boxGeometry args={[0.3, 0.12, 0.1]} />
        <primitive object={m.black} attach="material" />
      </mesh>
      <pointLight position={[0, 2.0, 0.3]} intensity={0.35} color="#6c5ce7" distance={4} />
    </group>
  )
}

/* ---------- Wall sections for remaining sections ---------- */

function WallFrames({ m, position, rotation, titles }: {
  m: ReturnType<typeof useStudioMaterials>
  position: [number, number, number]
  rotation: number
  titles: string[]
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {titles.map((_, i) => {
        const x = (i - (titles.length - 1) / 2) * 1.5
        const frameColors = ['#c0504d', '#4a7fb5', '#c8a04e']
        return (
          <group key={i} position={[x, 2.3, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1.1, 0.8, 0.05]} />
              <primitive object={m.woodDark} attach="material" />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <boxGeometry args={[0.98, 0.68, 0.02]} />
              <meshStandardMaterial color={frameColors[i % frameColors.length]} roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.15, 0.05]}>
              <boxGeometry args={[0.6, 0.1, 0.01]} />
              <primitive object={m.paper} attach="material" />
            </mesh>
            <mesh position={[0, -0.05, 0.05]}>
              <boxGeometry args={[0.75, 0.06, 0.01]} />
              <primitive object={m.paper} attach="material" />
            </mesh>
          </group>
        )
      })}
      {/* Shelf below */}
      <mesh position={[0, 1.7, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[titles.length * 1.5 - 0.2, 0.05, 0.3]} />
        <primitive object={m.wood} attach="material" />
      </mesh>
      <mesh position={[-titles.length * 0.5, 1.9, 0.2]} castShadow>
        <boxGeometry args={[0.25, 0.35, 0.22]} />
        <primitive object={m.plantPot} attach="material" />
      </mesh>
    </group>
  )
}

function Whiteboard({ m, position, rotation }: {
  m: ReturnType<typeof useStudioMaterials>
  position: [number, number, number]
  rotation: number
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 2.1, 0]} castShadow>
        <boxGeometry args={[2.4, 1.4, 0.05]} />
        <primitive object={m.metal} attach="material" />
      </mesh>
      <mesh position={[0, 2.1, 0.03]}>
        <boxGeometry args={[2.28, 1.28, 0.02]} />
        <primitive object={m.whiteboard} attach="material" />
      </mesh>
      {/* Abstract flowchart â€” restrained marker strokes */}
      {[[-0.7, 2.45], [0, 2.45], [0.7, 2.45]].map(([x, y], i) => (
        <mesh key={`n-${i}`} position={[x, y, 0.05]}>
          <boxGeometry args={[0.34, 0.2, 0.01]} />
          <primitive object={m.marker} attach="material" />
        </mesh>
      ))}
      {[[-0.35, 2.45], [0.35, 2.45]].map(([x, y], i) => (
        <mesh key={`l-${i}`} position={[x, y, 0.05]}>
          <boxGeometry args={[0.18, 0.03, 0.01]} />
          <primitive object={m.marker} attach="material" />
        </mesh>
      ))}
      <mesh position={[-0.3, 2.0, 0.05]}>
        <boxGeometry args={[1.4, 0.04, 0.01]} />
        <primitive object={m.marker} attach="material" />
      </mesh>
      <mesh position={[0.2, 1.85, 0.05]}>
        <boxGeometry args={[0.9, 0.04, 0.01]} />
        <primitive object={m.marker} attach="material" />
      </mesh>
      {/* Marker tray */}
      <mesh position={[0, 1.38, 0.08]} castShadow>
        <boxGeometry args={[0.9, 0.04, 0.08]} />
        <primitive object={m.metal} attach="material" />
      </mesh>
    </group>
  )
}

function PrinterStation({ m, position, rotation }: {
  m: ReturnType<typeof useStudioMaterials>
  position: [number, number, number]
  rotation: number
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.8, 0.55]} />
        <primitive object={m.wallAccent} attach="material" />
      </mesh>
      <mesh position={[0, 0.82, 0]} castShadow>
        <boxGeometry args={[0.72, 0.1, 0.57]} />
        <primitive object={m.black} attach="material" />
      </mesh>
      <mesh position={[0, 0.9, 0.1]}>
        <boxGeometry args={[0.3, 0.04, 0.2]} />
        <primitive object={m.screenTeal} attach="material" />
      </mesh>
      {/* Paper stack */}
      <mesh position={[0.55, 0.81, 0.05]} castShadow>
        <boxGeometry args={[0.25, 0.05, 0.3]} />
        <primitive object={m.paper} attach="material" />
      </mesh>
      {/* Small side table with CV plaque */}
      <mesh position={[1.0, 0.35, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.5]} />
        <primitive object={m.wood} attach="material" />
      </mesh>
      <mesh position={[1.0, 0.74, 0.2]} castShadow>
        <boxGeometry args={[0.3, 0.04, 0.22]} />
        <primitive object={m.paper} attach="material" />
      </mesh>
    </group>
  )
}

function LoungeCorner({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  return (
    <group position={[0, 0, 5.5]}>
      {/* Sofa */}
      <group position={[-1.2, 0, 0]} rotation={[0, 0.15, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.35, 0.85]} />
          <primitive object={m.fabric} attach="material" />
        </mesh>
        <mesh position={[0, 0.7, -0.38]} castShadow>
          <boxGeometry args={[2.0, 0.65, 0.18]} />
          <primitive object={m.fabric} attach="material" />
        </mesh>
        {[-0.7, 0, 0.7].map((x, i) => (
          <mesh key={i} position={[x, 0.6, -0.15]} rotation={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[0.42, 0.42, 0.12]} />
            <primitive object={m.fabricLight} attach="material" />
          </mesh>
        ))}
      </group>
      {/* Coffee table with contact sign */}
      <mesh position={[0.6, 0.34, 0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.05, 20]} />
        <primitive object={m.wood} attach="material" />
      </mesh>
      <mesh position={[0.6, 0.1, 0.5]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.3, 10]} />
        <primitive object={m.metal} attach="material" />
      </mesh>
      {/* Standing contact sign */}
      <group position={[1.6, 0, -0.6]} rotation={[0, -0.6, 0]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
          <primitive object={m.metal} attach="material" />
        </mesh>
        <mesh position={[0, 1.7, 0]} castShadow>
          <boxGeometry args={[0.7, 0.45, 0.04]} />
          <primitive object={m.wallAccent} attach="material" />
        </mesh>
        <mesh position={[0, 1.78, 0.03]}>
          <boxGeometry args={[0.5, 0.09, 0.01]} />
          <primitive object={m.screenPurple} attach="material" />
        </mesh>
        <mesh position={[0, 1.62, 0.03]}>
          <boxGeometry args={[0.42, 0.05, 0.01]} />
          <primitive object={m.screenTeal} attach="material" />
        </mesh>
      </group>
      <Rug position={[0, 0.015, 0.4]} size={[3.4, 2.2]} />
      <Plant m={m} position={[2.6, 0, 0.6]} scale={1.1} />
    </group>
  )
}

function CeilingLights({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  const positions: [number, number][] = [
    [-4, -4], [2, -4], [-4, 2], [2, 2], [-4, 6] , [2, 6],
  ]
  return (
    <group>
      {positions.map(([x, z], i) => (
        <group key={i} position={[x, 3.28, z]}>
          {/* Track mount */}
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.14, 6]} />
            <primitive object={m.metal} attach="material" />
          </mesh>
          {/* Shade */}
          <mesh position={[0, -0.14, 0]} castShadow>
            <coneGeometry args={[0.16, 0.2, 14, 1, true]} />
            <meshStandardMaterial color="#3a3d45" roughness={0.5} side={THREE.DoubleSide} />
          </mesh>
          {/* Bulb glow */}
          <mesh position={[0, -0.2, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#fff4e0" emissive="#ffe8c4" emissiveIntensity={1.6} />
          </mesh>
          <pointLight position={[0, -0.35, 0]} intensity={0.32} color="#ffe8c4" distance={6.5} decay={1.6} />
        </group>
      ))}
    </group>
  )
}

/* ---------- Room shell: floor, walls, windows ---------- */

function RoomShell({ m }: { m: ReturnType<typeof useStudioMaterials> }) {
  const W = 20 // x extent
  const D = 18 // z extent
  const H = 3.6
  return (
    <group>
      {/* Floor â€” wood planks effect via subtle two-tone strips */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <primitive object={m.floor} attach="material" />
      </mesh>
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={i} position={[0, 0.002, -D / 2 + (i * D) / 11]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[W, 0.04]} />
          <primitive object={m.floorDark} attach="material" />
        </mesh>
      ))}

      {/* North wall (z = -9) with big windows */}
      <group position={[0, 0, -9]}>
        {/* Wall segments between/around windows */}
        <mesh position={[-6.9, H / 2, 0]} receiveShadow>
          <boxGeometry args={[6.2, H, 0.25]} />
          <primitive object={m.wall} attach="material" />
        </mesh>
        <mesh position={[6.9, H / 2, 0]} receiveShadow>
          <boxGeometry args={[6.2, H, 0.25]} />
          <primitive object={m.wall} attach="material" />
        </mesh>
        <mesh position={[0, H / 2, 0]} receiveShadow>
          <boxGeometry args={[7.6, H, 0.25]} />
          <primitive object={m.wall} attach="material" />
        </mesh>
        {/* Window openings (fake with dark insets + glass) */}
        {[[-6.9, 4.4], [0, 6.4], [6.9, 4.4]].map(([x, w], i) => (
          <group key={i} position={[x, 1.9, 0.01]}>
            <mesh>
              <boxGeometry args={[w, 2.4, 0.02]} />
              <primitive object={m.glass} attach="material" />
            </mesh>
            {/* Mullions */}
            <mesh>
              <boxGeometry args={[0.07, 2.4, 0.06]} />
              <primitive object={m.trim} attach="material" />
            </mesh>
            <mesh position={[0, 0, -0.02]}>
              <boxGeometry args={[w, 0.07, 0.06]} />
              <primitive object={m.trim} attach="material" />
            </mesh>
            {/* Frame */}
            <mesh position={[0, 1.26, 0]}>
              <boxGeometry args={[w + 0.14, 0.09, 0.12]} />
              <primitive object={m.trim} attach="material" />
            </mesh>
            <mesh position={[0, -1.26, 0]}>
              <boxGeometry args={[w + 0.14, 0.12, 0.12]} />
              <primitive object={m.trim} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* South wall (z = +9) */}
      <mesh position={[0, H / 2, 9]} receiveShadow>
        <boxGeometry args={[W, H, 0.25]} />
        <primitive object={m.wallAccent} attach="material" />
      </mesh>

      {/* East wall (x = +10) */}
      <mesh position={[10, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[D, H, 0.25]} />
        <primitive object={m.wall} attach="material" />
      </mesh>

      {/* West wall (x = -10) */}
      <mesh position={[-10, H / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[D, H, 0.25]} />
        <primitive object={m.wall} attach="material" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <primitive object={m.ceiling} attach="material" />
      </mesh>

      {/* Baseboards */}
      {[
        { pos: [0, 0.09, -8.82], size: [W, 0.18, 0.08] },
        { pos: [0, 0.09, 8.82], size: [W, 0.18, 0.08] },
        { pos: [-9.82, 0.09, 0], size: [0.08, 0.18, D] },
        { pos: [9.82, 0.09, 0], size: [0.08, 0.18, D] },
      ].map((b, i) => (
        <mesh key={i} position={b.pos as [number, number, number]}>
          <boxGeometry args={b.size as [number, number, number]} />
          <primitive object={m.trim} attach="material" />
        </mesh>
      ))}

      {/* Purple accent light strip along north wall top â€” restrained */}
      <mesh position={[0, 3.3, -8.84]}>
        <boxGeometry args={[W - 1.5, 0.05, 0.04]} />
        <primitive object={m.accentGlow} attach="material" />
      </mesh>
    </group>
  )
}

/* ---------- Main environment ---------- */

function WorldEnvironment() {
  const m = useStudioMaterials()

  return (
    <group>
      <RoomShell m={m} />
      <Exterior m={m} />
      <CeilingLights m={m} />

      {/* Landmarks */}
      <ContentCreatorMansion m={m} />
      <LostRobotDisplay m={m} />
      <ProjectArchiveStation m={m} />
      <VRStation m={m} />
      <LoungeCorner m={m} />

      {/* About â€” framed achievements wall on east wall */}
      <WallFrames
        m={m}
        position={[9.8, 0, 1]}
        rotation={-Math.PI / 2}
        titles={['about-a', 'about-b', 'about-c']}
      />

      {/* Experience â€” frames on south wall */}
      <WallFrames
        m={m}
        position={[-4.5, 0, 8.82]}
        rotation={0}
        titles={['exp-a', 'exp-b', 'exp-c']}
      />

      {/* Skills â€” whiteboard on west wall */}
      <Whiteboard m={m} position={[-9.82, 0, -1]} rotation={Math.PI / 2} />

      {/* CV â€” printer station on south wall */}
      <PrinterStation m={m} position={[4.2, 0, 8.3]} rotation={Math.PI} />

      {/* Extra props for believability */}
      <Plant m={m} position={[-8.8, 0, -8]} scale={1.2} />
      <Plant m={m} position={[8.8, 0, 7.6]} scale={0.9} />
      <Rug position={[0, 0.012, -4.6]} size={[6, 3.4]} />
      <Rug position={[-7, 0.012, 3.5]} size={[3.6, 3]} />

      {/* Water cooler corner */}
      <group position={[8.9, 0, -7.5]} rotation={[0, -0.8, 0]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.42, 1.1, 0.42]} />
          <primitive object={m.wallAccent} attach="material" />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.14, 0.35, 12]} />
          <meshPhysicalMaterial color="#a8d4e8" transparent opacity={0.55} roughness={0.1} />
        </mesh>
      </group>
    </group>
  )
}

export default WorldEnvironment

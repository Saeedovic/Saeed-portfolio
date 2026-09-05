import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import PlayerCharacter from './PlayerCharacter'
import InteractionZone from './InteractiveObject'
import WorldEnvironment from './WorldEnvironment'
import WorldHUD from './WorldHUD'

interface InteractiveWorldProps {
  onNavigate: (section: string) => void
  isMobile: boolean
}

export interface LandmarkData {
  id: string
  label: string
  section: string
  position: [number, number, number]
  color: string
}

/** Landmark interaction points mapped to the studio environment */
const landmarks: LandmarkData[] = [
  { id: 'ccm', label: 'Content Creator Mansion', section: 'projects/content-creator-mansion', position: [0, 0, -4.2], color: '#6c5ce7' },
  { id: 'lost-robot', label: 'Lost Robot', section: 'projects/lost-robot', position: [-6.5, 0, -2.2], color: '#00cec9' },
  { id: 'archive', label: 'Project Archive', section: 'projects', position: [4.6, 0, -3.2], color: '#00b894' },
  { id: 'vr', label: 'VR / Mixed Reality', section: 'experience', position: [-6.0, 0, 3.5], color: '#a29bfe' },
  { id: 'about', label: 'About Me', section: 'about', position: [8.3, 0, 1], color: '#e17055' },
  { id: 'skills', label: 'Skills', section: 'skills', position: [-8.3, 0, -1], color: '#5d8a5d' },
  { id: 'experience-wall', label: 'Experience', section: 'experience', position: [-4.5, 0, 7.4], color: '#c8a04e' },
  { id: 'cv', label: 'CV', section: 'cv', position: [4.2, 0, 7.2], color: '#4a7fb5' },
  { id: 'contact', label: 'Contact', section: 'contact', position: [1.6, 0, 3.6], color: '#c0504d' },
]

/** Shared mutable input written by WorldHUD's mobile joystick */
export const moveInput = { x: 0, y: 0 }

const BOUNDS = { x: 8.6, zMin: -5.6, zMax: 7.8 }

function CameraController({ target }: { target: React.MutableRefObject<THREE.Vector3> }) {
  const { camera } = useThree()
  const smooth = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    smooth.current.lerp(target.current, 0.08)
    const desiredX = THREE.MathUtils.clamp(smooth.current.x, -9.4, 9.4)
    const desiredZ = THREE.MathUtils.clamp(smooth.current.z + 4.6, -8.7, 8.7)
    camera.position.set(desiredX, 2.6, desiredZ)
    camera.lookAt(smooth.current.x, 1.2, smooth.current.z)
  })

  return null
}

interface WorldSceneProps extends InteractiveWorldProps {
  onNearbyChange: (landmark: LandmarkData | null) => void
}

function WorldScene({ onNavigate, isMobile, onNearbyChange }: WorldSceneProps) {
  const playerPos = useRef(new THREE.Vector3(0, 0, 2))
  const facing = useRef(Math.PI)
  const isMoving = useRef(false)
  const keysPressed = useRef<Set<string>>(new Set())
  const velocity = useRef(new THREE.Vector3())
  const cooldown = useRef(false)
  const nearbyRef = useRef<LandmarkData | null>(null)

  const handleInteract = useCallback(() => {
    if (nearbyRef.current && !cooldown.current) {
      cooldown.current = true
      onNavigate(nearbyRef.current.section)
      setTimeout(() => {
        cooldown.current = false
      }, 600)
    }
  }, [onNavigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase())
      if (e.key.toLowerCase() === 'e') handleInteract()
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase())
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleInteract])

  useFrame((_, delta) => {
    const clamped = Math.min(delta, 0.05)
    const speed = 3.4

    let ix = 0
    let iz = 0

    if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) iz -= 1
    if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) iz += 1
    if (keysPressed.current.has('a') || keysPressed.current.has('arrowleft')) ix -= 1
    if (keysPressed.current.has('d') || keysPressed.current.has('arrowright')) ix += 1

    // Mobile joystick input (screen-space: joystick up = move away from camera)
    ix += moveInput.x
    iz += moveInput.y

    const len = Math.sqrt(ix * ix + iz * iz)
    let moving = false

    if (len > 0.15) {
      moving = true
      const nx = ix / Math.max(len, 1)
      const nz = iz / Math.max(len, 1)

      // Smooth acceleration
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, nx * speed, 1 - Math.pow(0.001, clamped))
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, nz * speed, 1 - Math.pow(0.001, clamped))

      // Face movement direction
      const targetAngle = Math.atan2(nx, nz)
      facing.current = THREE.MathUtils.lerp(
        facing.current,
        facing.current + Math.atan2(Math.sin(targetAngle - facing.current), Math.cos(targetAngle - facing.current)),
        1 - Math.pow(0.0001, clamped)
      )
    } else {
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0, 1 - Math.pow(0.0001, clamped))
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, 0, 1 - Math.pow(0.0001, clamped))
      if (velocity.current.length() < 0.05) {
        velocity.current.set(0, 0, 0)
      } else {
        moving = true
      }
    }

    playerPos.current.x += velocity.current.x * clamped
    playerPos.current.z += velocity.current.z * clamped

    // Room bounds
    playerPos.current.x = THREE.MathUtils.clamp(playerPos.current.x, -BOUNDS.x, BOUNDS.x)
    playerPos.current.z = THREE.MathUtils.clamp(playerPos.current.z, BOUNDS.zMin, BOUNDS.zMax)

    isMoving.current = moving && velocity.current.length() > 0.15

    // Proximity check
    let closest: LandmarkData | null = null
    let closestDist = Infinity
    for (const lm of landmarks) {
      const dx = playerPos.current.x - lm.position[0]
      const dz = playerPos.current.z - lm.position[2]
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < 1.6 && dist < closestDist) {
        closest = lm
        closestDist = dist
      }
    }
   if (closest?.id !== nearbyRef.current?.id) {
  nearbyRef.current = closest
  onNearbyChange(closest)
}
  })

  return (
    <>
      <color attach="background" args={['#dfe6ec']} />
      <fog attach="fog" args={['#dfe6ec', 18, 34]} />

      <CameraController target={playerPos} />

      {/* Warm studio lighting — cinematic but readable */}
      <hemisphereLight args={['#fdf6ea', '#a89a86', 0.75]} />
      <ambientLight intensity={0.3} />
      {/* Sunlight streaming through north windows */}
      <directionalLight
        position={[-3, 6.5, -8]}
        intensity={1.35}
        color="#fff3dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-far={30}
      />
      {/* Soft fill from camera side */}
      <directionalLight position={[4, 5, 9]} intensity={0.35} color="#e8ecf5" />

      <WorldEnvironment />
      <PlayerCharacter position={playerPos} facing={facing} isMoving={isMoving} />

      {landmarks.map((lm) => (
        <InteractionZone key={lm.id} data={lm} isNearby={nearbyRef.current?.id === lm.id} />
      ))}

      
    </>
  )
}

function InteractiveWorld({ onNavigate, isMobile }: InteractiveWorldProps) {
  const [nearby, setNearby] = useState<LandmarkData | null>(null)

  const handleInteract = useCallback(() => {
    if (nearby) {
      onNavigate(nearby.section)
    }
  }, [nearby, onNavigate])

  return (
    <div className="interactive-world">
      <Canvas
        camera={{ position: [0, 2.6, 6.6], fov: 55 }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <WorldScene
          onNavigate={onNavigate}
          isMobile={isMobile}
          onNearbyChange={setNearby}
        />
      </Canvas>

      <WorldHUD
        isMobile={isMobile}
        nearbyLabel={nearby?.label ?? null}
        onInteract={handleInteract}
      />
    </div>
  )
}

export default InteractiveWorld
export { landmarks }
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WireframeTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 40, 40)
    const positions = geo.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z =
        Math.sin(x * 0.4) * 0.8 +
        Math.cos(y * 0.3) * 0.6 +
        Math.sin((x + y) * 0.2) * 0.4
      positions.setZ(i, z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  const wireGeometry = useMemo(() => {
    return new THREE.WireframeGeometry(geometry)
  }, [geometry])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = -0.8 + Math.sin(t * 0.1) * 0.02
      meshRef.current.rotation.z = Math.sin(t * 0.08) * 0.02
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -0.8 + Math.sin(t * 0.1) * 0.02
      wireRef.current.rotation.z = Math.sin(t * 0.08) * 0.02
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} rotation={[-0.8, 0, 0]} position={[0, -2, 0]}>
        <meshBasicMaterial color="#0a0a0f" side={THREE.DoubleSide} />
      </mesh>
      <lineSegments
        ref={wireRef}
        geometry={wireGeometry}
        rotation={[-0.8, 0, 0]}
        position={[0, -2, 0]}
      >
        <lineBasicMaterial color="#6c5ce7" transparent opacity={0.15} />
      </lineSegments>
    </group>
  )
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a29bfe"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 1
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, '#1e1e2e', '#1e1e2e']}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <WireframeTerrain />
      <FloatingParticles />
      <GridFloor />
    </>
  )
}

function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 10], fov: 50 }}
      style={{ background: '#0a0a0f' }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}

export default HeroScene
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CodeMesh3DProps {
  isActive?: boolean
}

function getResponsiveScale(width: number) {
  if (width < 640) return 0.6 // Mobile
  if (width < 1024) return 0.8 // Tablet
  return 1 // PC
}

function MeshScene({ isActive = false }: { isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const { size } = useThree()
  const scale = getResponsiveScale(size.width)

  const particlePositions = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return positions
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = isActive ? 0.8 : 0.3
      meshRef.current.rotation.x += delta * speed
      meshRef.current.rotation.y += delta * speed * 1.5
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05
    }
  })

  const targetColor = isActive ? '#22d3ee' : '#6366f1'
  const emissiveColor = isActive ? '#0891b2' : '#312e81'

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    return geo
  }, [particlePositions])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-5, -5, -5]} intensity={0.2} />

      <group scale={scale}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.2, 0.4, 180, 24]} />
          <meshPhysicalMaterial
            color={targetColor}
            emissive={emissiveColor}
            emissiveIntensity={isActive ? 0.4 : 0.15}
            metalness={0.7}
            roughness={0.2}
            clearcoat={0.3}
          />
        </mesh>

        <points ref={particlesRef} geometry={particleGeo}>
          <pointsMaterial
            size={0.025}
            color={isActive ? '#22d3ee' : '#6366f1'}
            transparent
            opacity={0.5}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  )
}

export function CodeMesh3D({ isActive = false }: CodeMesh3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true }}
      style={{ background: 'transparent' }}
    >
      <MeshScene isActive={isActive} />
    </Canvas>
  )
}

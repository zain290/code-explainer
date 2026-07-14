import { useCallback, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { TechLogo } from './TechLogo'

interface TechLogosSceneProps {
  isActive?: boolean
}

const BASE = import.meta.env.BASE_URL

const logos = [
  {
    modelPath: `${BASE}models/node-transformed.glb`,
    position: [0, 0, -1] as [number, number, number],
    scale: 7,
    rotation: [0.1, -Math.PI / 2, 0.1] as [number, number, number],
    floatSpeed: 1.5,
    floatIntensity: 1.2,
    rotationIntensity: 0.6,
  },
  {
    modelPath: `${BASE}models/python-transformed.glb`,
    position: [-7.5, 4, -2.5] as [number, number, number],
    scale: 0.5,
    rotation: [0.2, -0.3, 0.1] as [number, number, number],
    floatSpeed: 2,
    floatIntensity: 2.8,
    rotationIntensity: 1.5,
  },
  {
    modelPath: `${BASE}models/git-svg-transformed.glb`,
    position: [7.5, 2.5, -2] as [number, number, number],
    scale: 0.035,
    rotation: [0.15, -Math.PI / 4, 0.2] as [number, number, number],
    floatSpeed: 2.5,
    floatIntensity: 3,
    rotationIntensity: 1.8,
  },
  {
    modelPath: `${BASE}models/three.js-transformed.glb`,
    position: [-6.5, -4.5, 2] as [number, number, number],
    scale: 0.025,
    rotation: [0.3, 0.5, 0.1] as [number, number, number],
    floatSpeed: 2.2,
    floatIntensity: 3.5,
    rotationIntensity: 2,
  },
  {
    modelPath: `${BASE}models/react_logo-transformed.glb`,
    position: [6.5, -4, 1.5] as [number, number, number],
    scale: 0.7,
    rotation: [0, 0.2, 0.1] as [number, number, number],
    floatSpeed: 2.5,
    floatIntensity: 2.5,
    rotationIntensity: 1.2,
  },
]

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null)
  const count = 300
  const spread = 20

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread - 5
  }

  const velocities = useCallback(() => (Math.random() - 0.5) * 0.003, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velocities()
      if (pos[i * 3 + 1] > spread / 2) pos[i * 3 + 1] = -spread / 2
      if (pos[i * 3 + 1] < -spread / 2) pos[i * 3 + 1] = spread / 2
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial size={0.03} color="#6366f1" transparent opacity={0.25} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function SceneContent({ isActive }: { isActive: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[8, 10, 5]} intensity={0.6} />
      <directionalLight position={[-8, -5, -5]} intensity={0.2} />
      <Environment preset="city" />

      <ParticleField />

      {logos.map((logo, i) => (
        <TechLogo
          key={i}
          modelPath={logo.modelPath}
          position={logo.position}
          scale={logo.scale}
          rotation={logo.rotation}
          floatSpeed={logo.floatSpeed}
          floatIntensity={logo.floatIntensity}
          rotationIntensity={logo.rotationIntensity}
          isActive={isActive}
        />
      ))}
    </>
  )
}

export function TechLogosScene({ isActive = false }: TechLogosSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1, 14], fov: 45 }}
      gl={{ antialias: true }}
      style={{ background: 'transparent' }}
    >
      <SceneContent isActive={isActive} />
    </Canvas>
  )
}

// Preload all 3D models
logos.forEach(l => useGLTF.preload(l.modelPath))

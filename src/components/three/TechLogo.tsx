import { useMemo } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

interface TechLogoProps {
  modelPath: string
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  floatSpeed?: number
  floatIntensity?: number
  rotationIntensity?: number
  isActive?: boolean
}

export function TechLogo({
  modelPath,
  position,
  scale = 1,
  rotation = [0, 0, 0],
  floatSpeed = 2,
  floatIntensity = 1,
  rotationIntensity = 0.5,
  isActive = false,
}: TechLogoProps) {
  const { scene } = useGLTF(modelPath)
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial
        if (material.color) {
          material.color.copy(
            isActive ? new THREE.Color('#22d3ee') : material.color
          )
          material.emissive = new THREE.Color(isActive ? '#22d3ee' : '#000000')
          material.emissiveIntensity = isActive ? 0.3 : 0
        }
      }
    })
    return clone
  }, [scene, isActive])

  return (
    <group position={position}>
      <Float
        speed={floatSpeed * (isActive ? 2 : 1)}
        rotationIntensity={rotationIntensity * (isActive ? 2 : 1)}
        floatIntensity={floatIntensity * (isActive ? 1.5 : 1)}
      >
        <group scale={scale} rotation={rotation as [number, number, number]}>
          <primitive object={clonedScene} />
        </group>
      </Float>
    </group>
  )
}

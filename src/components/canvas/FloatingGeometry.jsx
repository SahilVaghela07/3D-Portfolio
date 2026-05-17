import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GlowingSphere({ position, color, speed, distort }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed * 0.5
      meshRef.current.rotation.z = time * speed * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort || 0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.08}
          transparent
          opacity={0.32}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus({ position, color, speed }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed
      meshRef.current.rotation.y = time * speed * 0.7
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.25, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.08}
          transparent
          opacity={0.3}
          wireframe
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron({ position, color, speed }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * speed
      meshRef.current.rotation.z = time * speed * 0.5
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.08}
          transparent
          opacity={0.28}
          wireframe
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

export default function FloatingGeometry() {
  return (
    <group>
      <GlowingSphere position={[-4, 2, -5]} color="#00d992" speed={0.24} distort={0.35} />
      <GlowingSphere position={[5, -1, -8]} color="#2fd6a1" speed={0.18} distort={0.25} />
      <FloatingTorus position={[3, 3, -6]} color="#10b981" speed={0.28} />
      <FloatingTorus position={[-5, -2, -10]} color="#8b949e" speed={0.22} />
      <FloatingOctahedron position={[0, -3, -7]} color="#00d992" speed={0.26} />
      <FloatingOctahedron position={[-3, 4, -12]} color="#2fd6a1" speed={0.2} />
      <FloatingOctahedron position={[6, 1, -15]} color="#8b949e" speed={0.16} />
    </group>
  )
}

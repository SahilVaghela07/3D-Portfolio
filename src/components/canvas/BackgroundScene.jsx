import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Preload, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import ParticleField from './ParticleField'

function ReactiveShape({ geometry, position, color, speed, scale = 1 }) {
  const mesh = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = t * speed * 0.3 + pointer.y * 0.3
      mesh.current.rotation.y = t * speed * 0.5 + pointer.x * 0.3
      mesh.current.rotation.z = t * speed * 0.2
      mesh.current.position.x = position[0] + pointer.x * 0.5
      mesh.current.position.y = position[1] + pointer.y * 0.3
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[1, 0.3, 16, 32]} />}
        {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 64, 16]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        {geometry === 'cone' && <coneGeometry args={[0.7, 1.4, 4]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.08}
          transparent
          opacity={0.22}
          wireframe
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>
    </Float>
  )
}

function ReactiveParticles({ count = 1500 }) {
  const group = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.015 + pointer.x * 0.08
      group.current.rotation.x = Math.sin(t * 0.01) * 0.05 + pointer.y * 0.05
    }
  })

  return (
    <group ref={group}>
      <ParticleField count={count} />
    </group>
  )
}

function ScatteredShapes() {
  const shapes = [
    { geometry: 'icosahedron', position: [-5, 3, -8], color: '#00d992', speed: 0.2, scale: 0.8 },
    { geometry: 'torus', position: [4, 4, -10], color: '#2fd6a1', speed: 0.24, scale: 0.62 },
    { geometry: 'octahedron', position: [6, -1, -12], color: '#8b949e', speed: 0.18, scale: 0.72 },
    { geometry: 'dodecahedron', position: [-6, -6, -9], color: '#10b981', speed: 0.16, scale: 0.58 },
    { geometry: 'torusKnot', position: [5, -8, -14], color: '#00d992', speed: 0.12, scale: 0.46 },
    { geometry: 'cone', position: [-4, -14, -11], color: '#2fd6a1', speed: 0.22, scale: 0.62 },
    { geometry: 'icosahedron', position: [6, -16, -13], color: '#8b949e', speed: 0.16, scale: 0.54 },
    { geometry: 'torus', position: [-5, -22, -10], color: '#10b981', speed: 0.2, scale: 0.48 },
    { geometry: 'octahedron', position: [5, -25, -15], color: '#00d992', speed: 0.18, scale: 0.6 },
    { geometry: 'dodecahedron', position: [-3, -32, -12], color: '#8b949e', speed: 0.16, scale: 0.52 },
    { geometry: 'torusKnot', position: [4, -35, -11], color: '#2fd6a1', speed: 0.12, scale: 0.46 },
  ]

  return (
    <group>
      {shapes.map((s, i) => (
        <ReactiveShape key={i} {...s} />
      ))}
    </group>
  )
}

function ScrollCamera() {
  const { camera } = useThree()
  const targetY = useRef(0)

  useFrame(() => {
    const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
    targetY.current = THREE.MathUtils.lerp(targetY.current, -scrollFraction * 40, 0.05)
    camera.position.y = targetY.current
  })

  return null
}

export default function BackgroundScene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.42} color="#00d992" />
          <pointLight position={[-10, -10, -10]} intensity={0.28} color="#2fd6a1" />
          <pointLight position={[0, -20, 5]} intensity={0.18} color="#8b949e" />

          <Stars
            radius={120}
            depth={60}
            count={1800}
            factor={3}
            saturation={0}
            fade
            speed={0.14}
          />

          <ReactiveParticles count={1200} />
          <ScatteredShapes />
          <ScrollCamera />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.24}
              radius={0.55}
            />
            <Vignette eskil={false} offset={0.12} darkness={0.58} />
          </EffectComposer>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

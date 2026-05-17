import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Preload, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import ParticleField from './ParticleField'

/* ─── Grid Plane (Tron-style infinite ground) ─── */
function InfiniteGrid() {
  const gridRef = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (gridRef.current) {
      gridRef.current.position.z = (t * 0.5) % 2
      gridRef.current.material.opacity = 0.08 + Math.sin(t * 0.3) * 0.02
      gridRef.current.rotation.x = -Math.PI / 2 + pointer.y * 0.02
    }
  })

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[200, 200, 80, 80]} />
      <meshBasicMaterial
        color="#00d992"
        wireframe
        transparent
        opacity={0.06}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ─── Reactive Wireframe Shape ─── */
function ReactiveShape({ geometry, position, color, speed, scale = 1 }) {
  const mesh = useRef()
  const { pointer } = useThree()
  const initialPos = useMemo(() => [...position], [position])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = t * speed * 0.3 + pointer.y * 0.2
      mesh.current.rotation.y = t * speed * 0.5 + pointer.x * 0.2
      mesh.current.rotation.z = t * speed * 0.15
      mesh.current.position.x = initialPos[0] + pointer.x * 0.8
      mesh.current.position.y = initialPos[1] + pointer.y * 0.5 + Math.sin(t * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={2}>
      <mesh ref={mesh} position={position} scale={scale}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[1, 0.3, 16, 32]} />}
        {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 64, 16]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        {geometry === 'cone' && <coneGeometry args={[0.7, 1.4, 4]} />}
        {geometry === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.18}
          wireframe
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  )
}

/* ─── Reactive Particles with mouse follow ─── */
function ReactiveParticles({ count = 1500 }) {
  const group = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.012 + pointer.x * 0.1
      group.current.rotation.x = Math.sin(t * 0.008) * 0.05 + pointer.y * 0.06
    }
  })

  return (
    <group ref={group}>
      <ParticleField count={count} />
    </group>
  )
}

/* ─── Glowing Orbs ─── */
function GlowOrb({ position, color, size = 0.15 }) {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.5
      meshRef.current.scale.setScalar(size + Math.sin(t * 1.5) * 0.03)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  )
}

/* ─── Scattered 3D Shapes ─── */
function ScatteredShapes() {
  const shapes = [
    { geometry: 'icosahedron', position: [-6, 4, -8], color: '#00d992', speed: 0.2, scale: 0.7 },
    { geometry: 'torus', position: [5, 5, -10], color: '#6366f1', speed: 0.24, scale: 0.55 },
    { geometry: 'octahedron', position: [7, -1, -12], color: '#818cf8', speed: 0.18, scale: 0.65 },
    { geometry: 'dodecahedron', position: [-7, -7, -9], color: '#10b981', speed: 0.16, scale: 0.5 },
    { geometry: 'torusKnot', position: [6, -9, -14], color: '#00d992', speed: 0.12, scale: 0.4 },
    { geometry: 'tetrahedron', position: [-5, -15, -11], color: '#6366f1', speed: 0.22, scale: 0.55 },
    { geometry: 'icosahedron', position: [7, -18, -13], color: '#818cf8', speed: 0.16, scale: 0.48 },
    { geometry: 'torus', position: [-6, -24, -10], color: '#10b981', speed: 0.2, scale: 0.42 },
    { geometry: 'cone', position: [5, -28, -15], color: '#00d992', speed: 0.18, scale: 0.52 },
    { geometry: 'dodecahedron', position: [-4, -34, -12], color: '#6366f1', speed: 0.14, scale: 0.45 },
    { geometry: 'torusKnot', position: [5, -38, -11], color: '#10b981', speed: 0.12, scale: 0.4 },
    { geometry: 'octahedron', position: [-6, -42, -14], color: '#818cf8', speed: 0.2, scale: 0.48 },
  ]

  const orbs = [
    { position: [-8, 2, -6], color: '#00d992', size: 0.08 },
    { position: [9, -3, -8], color: '#6366f1', size: 0.06 },
    { position: [-3, -12, -5], color: '#00d992', size: 0.07 },
    { position: [7, -20, -7], color: '#818cf8', size: 0.05 },
    { position: [-5, -30, -6], color: '#10b981', size: 0.06 },
    { position: [4, -40, -8], color: '#6366f1', size: 0.07 },
  ]

  return (
    <group>
      {shapes.map((s, i) => (
        <ReactiveShape key={i} {...s} />
      ))}
      {orbs.map((o, i) => (
        <GlowOrb key={`orb-${i}`} {...o} />
      ))}
    </group>
  )
}

/* ─── Scroll-Synced Camera ─── */
function ScrollCamera() {
  const { camera } = useThree()
  const targetY = useRef(0)

  useFrame(() => {
    const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
    targetY.current = THREE.MathUtils.lerp(targetY.current, -scrollFraction * 50, 0.04)
    camera.position.y = targetY.current
  })

  return null
}

/* ─── Mouse-reactive Lighting ─── */
function ReactiveLight() {
  const lightRef = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = pointer.x * 10
      lightRef.current.position.y = pointer.y * 8
    }
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 8]}
      intensity={0.4}
      color="#00d992"
      distance={30}
    />
  )
}

/* ─── Main Background Scene ─── */
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
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <pointLight position={[12, 12, 12]} intensity={0.35} color="#00d992" />
          <pointLight position={[-12, -12, -12]} intensity={0.25} color="#6366f1" />
          <pointLight position={[0, -25, 8]} intensity={0.15} color="#818cf8" />
          <ReactiveLight />

          <Stars
            radius={140}
            depth={70}
            count={2500}
            factor={3.5}
            saturation={0}
            fade
            speed={0.12}
          />

          <InfiniteGrid />
          <ReactiveParticles count={1500} />
          <ScatteredShapes />
          <ScrollCamera />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              intensity={0.35}
              radius={0.6}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.65} />
          </EffectComposer>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

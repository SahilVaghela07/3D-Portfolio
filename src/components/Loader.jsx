import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import './Loader.css'

function SpinningGeometry() {
  const groupRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.8
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.3
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = t * 1.2
      innerRef.current.rotation.x = t * 0.6
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef}>
        {/* Outer ring */}
        <mesh>
          <torusGeometry args={[1.6, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#00d992"
            emissive="#00d992"
            emissiveIntensity={1.5}
            transparent
            opacity={0.6}
            toneMapped={false}
          />
        </mesh>
        {/* Middle ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.2, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={1.2}
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </mesh>
        {/* Inner icosahedron */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#00d992"
            emissive="#00d992"
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Core glow */}
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial
            color="#00d992"
            emissive="#00d992"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function Loader() {
  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loader__scene">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00d992" />
            <pointLight position={[-5, -5, -5]} intensity={0.4} color="#6366f1" />
            <SpinningGeometry />
          </Suspense>
        </Canvas>
      </div>

      <motion.div
        className="loader__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="loader__terminal">
          <span className="loader__prompt">$</span>
          <span>initializing portfolio</span>
          <span className="loader__caret" />
        </div>
        <div className="loader__progress">
          <motion.div
            className="loader__progress-bar"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
        <p className="loader__text">Loading 3D experience</p>
      </motion.div>
    </motion.div>
  )
}

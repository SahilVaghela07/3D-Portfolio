import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import ParticleField from './ParticleField'
import FloatingGeometry from './FloatingGeometry'

export default function HeroScene() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f5ff" />

          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          <ParticleField count={1500} />
          <FloatingGeometry />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.8}
              radius={0.8}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.8} />
          </EffectComposer>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

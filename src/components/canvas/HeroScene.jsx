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
          <pointLight position={[10, 10, 10]} intensity={0.52} color="#00d992" />
          <pointLight position={[-10, -10, -10]} intensity={0.34} color="#2fd6a1" />

          <Stars
            radius={100}
            depth={50}
            count={1800}
            factor={3}
            saturation={0}
            fade
            speed={0.18}
          />

          <ParticleField count={1000} />
          <FloatingGeometry />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.28}
              radius={0.55}
            />
            <Vignette eskil={false} offset={0.12} darkness={0.62} />
          </EffectComposer>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

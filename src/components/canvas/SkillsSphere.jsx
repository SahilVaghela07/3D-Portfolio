import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const skills = [
  'JavaScript', 'React', 'HTML', 'CSS', 'Node.js',
  'Python', 'Git', 'C++', 'Java', 'MongoDB',
  'SQL', 'TypeScript', 'Next.js', 'Three.js', 'Vite',
  'Figma', 'VS Code', 'GitHub', 'Linux', 'Docker',
]

function SkillNode({ text, position, color }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.08
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Glowing node sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        {/* Outer glow ring */}
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.15}
            toneMapped={false}
          />
        </mesh>
        <Text
          position={[0.3, 0, 0]}
          fontSize={0.2}
          color={color}
          anchorX="left"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        >
          {text}
        </Text>
      </group>
    </Float>
  )
}

/* ─── Connecting Lines (Constellation) ─── */
function ConstellationLines({ positions }) {
  const lineGeometry = useMemo(() => {
    const points = []
    // Connect nearby skills
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = Math.sqrt(
          Math.pow(positions[i][0] - positions[j][0], 2) +
          Math.pow(positions[i][1] - positions[j][1], 2) +
          Math.pow(positions[i][2] - positions[j][2], 2)
        )
        if (dist < 3.5) {
          points.push(
            new THREE.Vector3(...positions[i]),
            new THREE.Vector3(...positions[j])
          )
        }
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [positions])

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial
        color="#00d992"
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </lineSegments>
  )
}

export default function SkillsSphere() {
  const groupRef = useRef()

  const positions = useMemo(() => {
    const pos = []
    const total = skills.length
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i

      pos.push([
        Math.cos(theta) * radius * 3,
        y * 3,
        Math.sin(theta) * radius * 3,
      ])
    }
    return pos
  }, [])

  const colors = ['#00d992', '#2fd6a1', '#6366f1', '#818cf8', '#10b981']

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <ConstellationLines positions={positions} />
      {skills.map((skill, i) => (
        <SkillNode
          key={skill}
          text={skill}
          position={positions[i]}
          color={colors[i % colors.length]}
        />
      ))}
      {/* Core orb */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#00d992"
          emissive="#00d992"
          emissiveIntensity={1.5}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

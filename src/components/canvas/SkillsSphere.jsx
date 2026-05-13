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
  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
        <Text
          position={[0.25, 0, 0]}
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

  const colors = ['#00f5ff', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981']

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill}
          text={skill}
          position={positions[i]}
          color={colors[i % colors.length]}
        />
      ))}
      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

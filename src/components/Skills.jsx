import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { motion } from 'framer-motion'
import {
  SiJavascript, SiReact, SiHtml5, SiCss, SiNodedotjs,
  SiPython, SiGit, SiCplusplus, SiMongodb, SiTypescript,
  SiNextdotjs, SiThreedotjs, SiFigma, SiGithub, SiLinux,
  SiDocker, SiTailwindcss, SiVite
} from 'react-icons/si'
import { FaJava, FaDatabase } from 'react-icons/fa'
import SkillsSphere from './canvas/SkillsSphere'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'React', icon: <SiReact />, color: '#61dafb' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26' },
      { name: 'CSS3', icon: <SiCss />, color: '#1572b6' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
      { name: 'Three.js', icon: <SiThreedotjs />, color: '#ffffff' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4' },
    ],
  },
  {
    title: 'Backend & Tools',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
      { name: 'Python', icon: <SiPython />, color: '#3776ab' },
      { name: 'C++', icon: <SiCplusplus />, color: '#00599c' },
      { name: 'Java', icon: <FaJava />, color: '#ed8b00' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
      { name: 'SQL', icon: <FaDatabase />, color: '#4479a1' },
      { name: 'Git', icon: <SiGit />, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#ffffff' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ed' },
      { name: 'Linux', icon: <SiLinux />, color: '#fcc624' },
      { name: 'Vite', icon: <SiVite />, color: '#646cff' },
      { name: 'Figma', icon: <SiFigma />, color: '#f24e1e' },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">What I Know</span>
          <h2>Skills & Technologies</h2>
          <div className="divider" />
        </motion.div>

        <div className="skills__layout">
          {/* 3D Sphere */}
          <motion.div
            className="skills__sphere-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              dpr={[1, 1.5]}
              style={{ height: '360px' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.42} />
                <pointLight position={[10, 10, 10]} intensity={0.7} color="#00d992" />
                <SkillsSphere />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
                <Preload all />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Skill Grid */}
          <div className="skills__categories">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                className="skills__category"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              >
                <h3 className="skills__category-title">{category.title}</h3>
                <motion.div
                  className="skills__grid"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="skills__item glass-card"
                      variants={skillVariants}
                      whileHover={{
                        scale: 1.04,
                        borderColor: '#00d992',
                        boxShadow: '0 0 0 1px rgba(0, 217, 146, 0.12)',
                      }}
                    >
                      <span className="skills__item-icon">
                        {skill.icon}
                      </span>
                      <span className="skills__item-name">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

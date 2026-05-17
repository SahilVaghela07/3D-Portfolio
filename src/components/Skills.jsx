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
import TiltCard from './TiltCard'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e', level: 'Intermediate', proof: 'Built interactive 3D portfolio' },
      { name: 'React', icon: <SiReact />, color: '#61dafb', level: 'Intermediate', proof: 'Traveloop + this portfolio' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26', level: 'Advanced', proof: 'All projects use semantic HTML' },
      { name: 'CSS3', icon: <SiCss />, color: '#1572b6', level: 'Advanced', proof: 'Custom design systems' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178c6', level: 'Beginner', proof: 'Learning through side projects' },
      { name: 'Three.js', icon: <SiThreedotjs />, color: '#ffffff', level: 'Beginner-Mid', proof: '3D portfolio implementation' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4', level: 'Intermediate', proof: 'Used in Traveloop' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff', level: 'Beginner', proof: 'Currently exploring' },
    ],
  },
  {
    title: 'Backend & Tools',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 'Intermediate', proof: 'Traveloop API backend' },
      { name: 'Python', icon: <SiPython />, color: '#3776ab', level: 'Intermediate', proof: 'Scripts and data projects' },
      { name: 'C++', icon: <SiCplusplus />, color: '#00599c', level: 'Intermediate', proof: 'DSA problem solving' },
      { name: 'Java', icon: <FaJava />, color: '#ed8b00', level: 'Beginner-Mid', proof: 'Academic coursework' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248', level: 'Beginner', proof: 'Learning with projects' },
      { name: 'SQL', icon: <FaDatabase />, color: '#4479a1', level: 'Intermediate', proof: 'Traveloop MySQL database' },
      { name: 'Git', icon: <SiGit />, color: '#f05032', level: 'Intermediate', proof: 'Daily workflow tool' },
      { name: 'GitHub', icon: <SiGithub />, color: '#ffffff', level: 'Advanced', proof: 'All projects hosted' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ed', level: 'Beginner', proof: 'Exploring containerization' },
      { name: 'Linux', icon: <SiLinux />, color: '#fcc624', level: 'Beginner-Mid', proof: 'Dev environment' },
      { name: 'Vite', icon: <SiVite />, color: '#646cff', level: 'Intermediate', proof: 'Build tool for all projects' },
      { name: 'Figma', icon: <SiFigma />, color: '#f24e1e', level: 'Beginner', proof: 'UI mockups' },
    ],
  },
]

const levelColors = {
  'Beginner': '#f59e0b',
  'Beginner-Mid': '#fb923c',
  'Intermediate': '#00d992',
  'Advanced': '#6366f1',
}

const levelWidths = {
  'Beginner': '25%',
  'Beginner-Mid': '40%',
  'Intermediate': '65%',
  'Advanced': '90%',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
}

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
          <span className="subtitle">Evidence, Not Lists</span>
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
              style={{ height: '380px' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.6} color="#00d992" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />
                <SkillsSphere />
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.6}
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
                transition={{ duration: 0.6, delay: catIndex * 0.15 }}
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
                    <motion.div key={index} variants={skillVariants}>
                      <TiltCard className="skills__item glass-card" intensity={12}>
                        <span className="skills__item-icon" style={{ color: skill.color }}>
                          {skill.icon}
                        </span>
                        <span className="skills__item-name">{skill.name}</span>
                        <div className="skills__level">
                          <span
                            className="skills__level-label"
                            style={{ color: levelColors[skill.level] }}
                          >
                            {skill.level}
                          </span>
                          <div className="skills__level-bar">
                            <div
                              className="skills__level-fill"
                              style={{
                                width: levelWidths[skill.level],
                                background: levelColors[skill.level],
                              }}
                            />
                          </div>
                        </div>
                        <span className="skills__proof">{skill.proof}</span>
                      </TiltCard>
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

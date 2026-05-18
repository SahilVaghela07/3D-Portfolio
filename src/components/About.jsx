import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiHeart, FiTarget } from 'react-icons/fi'
import TiltCard from './TiltCard'
import './About.css'

const highlights = [
  {
    icon: <FiCode />,
    title: 'Frontend Craft',
    description: 'Building responsive interfaces with React, motion, and thoughtful component architecture.',
    color: '#00d992',
  },
  {
    icon: <FiCpu />,
    title: 'Full-Stack Thinking',
    description: 'Connecting frontend to backend — Node.js, databases, APIs, and deployment pipelines.',
    color: '#6366f1',
  },
  {
    icon: <FiTarget />,
    title: 'Problem Solver',
    description: 'Breaking complex problems into simple flows, data models, and clear user actions.',
    color: '#f59e0b',
  },
  {
    icon: <FiHeart />,
    title: 'Student Support',
    description: 'Helping classmates debug, understand core concepts, and ship cleaner college projects.',
    color: '#00d992',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Introduction</span>
          <h2>About Me</h2>
          <div className="divider" />
        </motion.div>

        <div className="about__content">
          {/* Story — 3-part narrative */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard className="about__story-card" intensity={6}>
              <div className="about__text">
                {/* What I do */}
                <div className="about__story-section">
                  <span className="about__story-label">What I Do</span>
                  <p className="about__intro">
                    A developer and engineering student at{' '}
                    <span className="about__highlight">GCET</span> — building fast,
                    clean, and genuinely useful web applications.
                  </p>
                </div>

                {/* Why */}
                <div className="about__story-section">
                  <span className="about__story-label">Why I Build</span>
                  <p>
                    The best way to learn is by shipping real things. Every broken build
                    and stubborn bug taught me more than any textbook — that hunger to
                    solve problems drives everything I create.
                  </p>
                </div>

                {/* Where headed */}
                <div className="about__story-section">
                  <span className="about__story-label">Where I'm Headed</span>
                  <p>
                    Building production-ready full-stack products end-to-end — from
                    database design to polished UI. Always shipping, always learning,
                    always helping other students grow alongside me.
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Highlight Cards Grid */}
          <motion.div
            className="about__highlights"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {highlights.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <TiltCard className="about__highlight-card glass-card" intensity={10}>
                  <div
                    className="about__highlight-icon"
                    style={{
                      '--icon-color': item.color,
                      color: item.color,
                      background: `${item.color}15`,
                      borderColor: `${item.color}30`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div
                    className="about__card-glow"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}12, transparent 70%)` }}
                  />
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

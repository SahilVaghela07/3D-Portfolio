import { motion } from 'framer-motion'
import { FiBookOpen, FiTrendingUp, FiLayers, FiZap, FiArrowRight } from 'react-icons/fi'
import TiltCard from './TiltCard'
import './Learning.css'

const currentlyLearning = [
  { name: 'TypeScript', progress: 35, color: '#3178c6', detail: 'Type-safe React patterns' },
  { name: 'Next.js', progress: 25, color: '#ffffff', detail: 'SSR & API routes' },
  { name: 'MongoDB', progress: 30, color: '#47a248', detail: 'NoSQL data modeling' },
  { name: 'System Design', progress: 20, color: '#6366f1', detail: 'Scalable architecture basics' },
]

const processSteps = [
  {
    step: '01',
    title: 'Understand',
    description: 'Break the problem into user needs, edge cases, and constraints before writing any code.',
    icon: <FiBookOpen />,
    color: '#00d992',
  },
  {
    step: '02',
    title: 'Plan',
    description: 'Sketch the data flow, pick the right tools, and define what "done" looks like.',
    icon: <FiLayers />,
    color: '#6366f1',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Ship a working version fast, then iterate. Messy first drafts beat perfect plans.',
    icon: <FiZap />,
    color: '#f59e0b',
  },
  {
    step: '04',
    title: 'Reflect',
    description: 'Review what worked, what didn't, and document learnings for next time.',
    icon: <FiTrendingUp />,
    color: '#00d992',
  },
]

const resources = [
  { title: 'The Pragmatic Programmer', type: 'Book', note: 'Shaped how I think about craft' },
  { title: 'JavaScript.info', type: 'Resource', note: 'Deep JS fundamentals' },
  { title: 'Three.js Journey', type: 'Course', note: 'Learning 3D web development' },
  { title: 'Fireship.io', type: 'Channel', note: 'Quick, practical tech overviews' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Learning() {
  return (
    <section id="learning" className="section learning">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Always Growing</span>
          <h2>Learning & Process</h2>
          <div className="divider" />
        </motion.div>

        <div className="learning__layout">
          {/* Currently Learning */}
          <motion.div
            className="learning__section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <TiltCard className="learning__card" intensity={6}>
              <div className="learning__card-inner">
                <h3 className="learning__card-title">
                  <FiTrendingUp />
                  Currently Learning
                </h3>
                <div className="learning__progress-list">
                  {currentlyLearning.map((item, i) => (
                    <div key={i} className="learning__progress-item">
                      <div className="learning__progress-header">
                        <span className="learning__progress-name">{item.name}</span>
                        <span className="learning__progress-pct" style={{ color: item.color }}>
                          {item.progress}%
                        </span>
                      </div>
                      <div className="learning__progress-bar">
                        <motion.div
                          className="learning__progress-fill"
                          style={{ background: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <span className="learning__progress-detail">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* My Process */}
          <motion.div
            className="learning__section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="learning__process">
              <h3 className="learning__process-title">
                <FiLayers />
                My Process
              </h3>
              <motion.div
                className="learning__process-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {processSteps.map((step, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <TiltCard className="learning__step glass-card" intensity={10}>
                      <div className="learning__step-inner">
                        <div className="learning__step-number" style={{ color: step.color }}>
                          {step.step}
                        </div>
                        <div className="learning__step-icon" style={{ color: step.color, background: `${step.color}12`, borderColor: `${step.color}25` }}>
                          {step.icon}
                        </div>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </TiltCard>
                    {i < processSteps.length - 1 && (
                      <div className="learning__step-connector">
                        <FiArrowRight />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Resources */}
        <motion.div
          className="learning__resources"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="learning__resources-title">
            <FiBookOpen />
            Resources That Shaped Me
          </h3>
          <div className="learning__resources-grid">
            {resources.map((res, i) => (
              <motion.div
                key={i}
                className="learning__resource glass-card"
                whileHover={{ y: -4 }}
              >
                <span className="learning__resource-type">{res.type}</span>
                <h4>{res.title}</h4>
                <p>{res.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

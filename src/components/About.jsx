import { motion } from 'framer-motion'
import { FiCode, FiBookOpen, FiCpu, FiHeart } from 'react-icons/fi'
import './About.css'

const highlights = [
  {
    icon: <FiCode />,
    title: 'Frontend Craft',
    description: 'Building responsive interfaces with React, motion, and practical component structure.',
  },
  {
    icon: <FiBookOpen />,
    title: 'Engineering Mindset',
    description: 'Studying at GCET while turning classroom concepts into working software.',
  },
  {
    icon: <FiCpu />,
    title: 'Problem Solving',
    description: 'Breaking down product ideas into simple flows, data models, and user actions.',
  },
  {
    icon: <FiHeart />,
    title: 'Community',
    description: 'Sharing what I learn with peers and staying curious through collaboration.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="about__intro">
              I am <span className="about__highlight">Sahil Vaghela</span>, 
              an engineering student at <span className="about__highlight">G.H. Patel
              College of Engineering & Technology (GCET)</span>.
            </p>
            <p>
              I like building web experiences that feel direct, fast, and useful.
              My current focus is React, backend fundamentals, databases, and the
              small product decisions that make software easier to understand.
            </p>
            <p>
              I am always learning by making things, from travel-planning tools to
              interactive portfolio experiments. The goal is simple: keep improving,
              keep shipping, and keep helping other students along the way.
            </p>
          </motion.div>

          <motion.div
            className="about__highlights"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="about__highlight-card glass-card"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="about__highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

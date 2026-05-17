import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiClock, FiMapPin, FiChevronDown, FiChevronUp, FiArrowUpRight } from 'react-icons/fi'
import TiltCard from './TiltCard'
import './Projects.css'

const projects = [
  {
    title: 'Traveloop',
    eyebrow: 'Featured Build',
    status: 'Live',
    problem: 'College friends struggled to plan multi-city trips — no tool combined itineraries, budgets, and sharing in one place.',
    approach: 'Built a full-stack web app with city discovery, activity search, budget tracking, and public itinerary sharing.',
    tools: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'Express'],
    outcome: 'Working product used by 30+ peers. Reduced trip planning time by organizing everything in one dashboard.',
    learned: 'Database schema design, user feedback loops, and the importance of iterative UI improvements.',
    command: 'git clone SahilVaghela07/Traveloop',
    icon: <FiMapPin />,
    github: 'https://github.com/SahilVaghela07/Traveloop',
    color: '#00d992',
    comingSoon: false,
  },
  {
    title: '3D Portfolio',
    eyebrow: 'Experiment',
    status: 'Live',
    problem: 'Traditional portfolios feel flat and forgettable — I wanted mine to demonstrate technical skill at first glance.',
    approach: 'Created an immersive 3D experience using Three.js with reactive particles, floating geometry, and tilt cards.',
    tools: ['React', 'Three.js', 'Framer Motion', 'Vite'],
    outcome: 'Interactive portfolio with 60fps 3D animations, mouse-reactive elements, and a unique developer identity.',
    learned: 'WebGL performance optimization, 3D math, and creating engaging user experiences with minimal load.',
    command: 'git clone SahilVaghela07/3D-Portfolio',
    icon: <FiArrowUpRight />,
    github: 'https://github.com/SahilVaghela07/3D-Portfolio',
    color: '#6366f1',
    comingSoon: false,
  },
  {
    title: 'Coming Soon',
    eyebrow: 'In Progress',
    status: 'Planning',
    problem: 'New problems to solve — currently exploring ideas in AI-powered tools and real-time collaborative systems.',
    approach: 'Researching, prototyping, and validating ideas before committing to a full build.',
    tools: ['Next.js', 'TypeScript', 'MongoDB', 'API'],
    outcome: 'TBD — building in public and documenting the process.',
    learned: 'The value of planning before coding, and saying no to feature creep.',
    command: 'npm run build-next-idea',
    icon: <FiClock />,
    color: '#f59e0b',
    comingSoon: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div variants={cardVariants}>
      <TiltCard className="projects__card-tilt" intensity={8}>
        <div
          className="projects__card glass-card"
          style={{ '--card-accent': project.color }}
        >
          {/* Top accent line */}
          <div className="projects__accent-line" />

          {/* Meta */}
          <div className="projects__meta">
            <span className="projects__eyebrow">{project.eyebrow}</span>
            <span className="projects__status">
              <span
                className="projects__status-dot"
                style={{ background: project.comingSoon ? '#f59e0b' : '#00d992' }}
              />
              {project.status}
            </span>
          </div>

          {/* Header */}
          <div className="projects__card-header">
            <div className="projects__card-icon" style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}10` }}>
              {project.icon}
            </div>
            <div className="projects__card-links">
              {!project.comingSoon && (
                <>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FiGithub />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <FiExternalLink />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="projects__card-title">{project.title}</h3>

          {/* Case Study */}
          <div className="projects__case-study">
            <div className="projects__case-item">
              <span className="projects__case-label">Problem</span>
              <p>{project.problem}</p>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="projects__case-expanded"
                >
                  <div className="projects__case-item">
                    <span className="projects__case-label">Approach</span>
                    <p>{project.approach}</p>
                  </div>
                  <div className="projects__case-item">
                    <span className="projects__case-label">Outcome</span>
                    <p>{project.outcome}</p>
                  </div>
                  <div className="projects__case-item">
                    <span className="projects__case-label">Learned</span>
                    <p>{project.learned}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="projects__expand-btn"
              onClick={() => setExpanded(!expanded)}
              aria-label={expanded ? 'Collapse case study' : 'Expand case study'}
            >
              {expanded ? <FiChevronUp /> : <FiChevronDown />}
              <span>{expanded ? 'Less' : 'Full Case Study'}</span>
            </button>
          </div>

          {/* Command */}
          <code className="projects__command">{project.command}</code>

          {/* Tags */}
          <div className="projects__card-tags">
            {project.tools.map((tag) => (
              <span key={tag} className="projects__tag">{tag}</span>
            ))}
          </div>

          {/* Coming Soon Badge */}
          {project.comingSoon && (
            <div className="projects__coming-soon-badge">
              <span className="projects__pulse" />
              In Development
            </div>
          )}
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">My Work</span>
          <h2>Projects</h2>
          <div className="divider" />
        </motion.div>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>

        <motion.p
          className="projects__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Each project follows: Problem → Approach → Outcome → What I Learned
        </motion.p>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiClock, FiMapPin } from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    title: 'Traveloop',
    description:
      'A multi-city travel planning web app for building itineraries, estimating trip budgets, and sharing travel plans. Features city discovery, activity search, budget tracking, and public itinerary sharing.',
    tags: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'Express'],
    icon: <FiMapPin />,
    github: 'https://github.com/SahilVaghela07/Traveloop',
    comingSoon: false,
  },
  {
    title: 'Coming Soon',
    description:
      'More amazing projects are on the way! I\'m constantly learning and building new things. Check back soon to see my latest work and contributions to the developer community.',
    tags: ['React', 'Node.js', 'MongoDB', 'API'],
    icon: <FiClock />,
    comingSoon: true,
  },
  {
    title: 'Coming Soon',
    description:
      'I\'m working on something special. As a developer who loves creating, I\'m always exploring new technologies and pushing my boundaries. Watch this space for updates!',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'Firebase'],
    icon: <FiClock />,
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
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
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
            <motion.div
              key={index}
              className="projects__card glass-card"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className="projects__card-header">
                <div className="projects__card-icon">{project.icon}</div>
                <div className="projects__card-links">
                  {!project.comingSoon && (
                    <>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><FiExternalLink /></a>
                      )}
                    </>
                  )}
                </div>
              </div>

              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__card-description">{project.description}</p>

              <div className="projects__card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="projects__tag">{tag}</span>
                ))}
              </div>

              {project.comingSoon && (
                <div className="projects__coming-soon-badge">
                  <span className="projects__pulse" />
                  In Development
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="projects__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          🚀 New projects are being built every day. Stay connected!
        </motion.p>
      </div>
    </section>
  )
}

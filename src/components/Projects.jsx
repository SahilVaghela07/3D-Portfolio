import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiClock, FiMapPin } from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    title: 'Traveloop',
    eyebrow: 'Featured Build',
    status: 'Live repository',
    description:
      'A multi-city travel planning web app for building itineraries, estimating trip budgets, and sharing travel plans. Features city discovery, activity search, budget tracking, and public itinerary sharing.',
    tags: ['React', 'Node.js', 'MySQL', 'Tailwind CSS', 'Express'],
    command: 'git clone SahilVaghela07/Traveloop',
    icon: <FiMapPin />,
    github: 'https://github.com/SahilVaghela07/Traveloop',
    comingSoon: false,
  },
  {
    title: 'Coming Soon',
    eyebrow: 'In Progress',
    status: 'Planning',
    description:
      'More projects are on the way as I keep building and learning. This slot is reserved for the next shipped web experience.',
    tags: ['React', 'Node.js', 'MongoDB', 'API'],
    command: 'npm run build-next-idea',
    icon: <FiClock />,
    comingSoon: true,
  },
  {
    title: 'Coming Soon',
    eyebrow: 'Experiment',
    status: 'Prototype',
    description:
      'A space for experiments with TypeScript, Three.js, and real-time services while I sharpen my frontend engineering skills.',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'Firebase'],
    command: 'pnpm create product-lab',
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
              <div className="projects__meta">
                <span>{project.eyebrow}</span>
                <span>{project.status}</span>
              </div>

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

              <code className="projects__command">{project.command}</code>

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
          New builds are being shaped, tested, and shipped as I keep learning.
        </motion.p>
      </div>
    </section>
  )
}

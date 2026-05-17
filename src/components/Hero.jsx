import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiArrowUpRight, FiGithub, FiMail, FiTerminal } from 'react-icons/fi'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__content container">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="hero__badge-dot" />
          <span>Available for opportunities</span>
        </motion.div>

        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6 }}
        >
          Sahil Vaghela / Engineering Student / Developer
        </motion.p>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Building clean web experiences with a developer-first mindset.
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          I am an engineering student at G.H. Patel College of Engineering & Technology, focused on React, full-stack projects, and practical systems that are easy to use.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link to="projects" smooth duration={500} offset={-80}>
            <button className="btn-primary" id="hero-explore-btn">
              <FiArrowUpRight />
              <span>Explore Work</span>
            </button>
          </Link>
          <Link to="contact" smooth duration={500} offset={-80}>
            <button className="btn-outline" id="hero-contact-btn">
              <FiMail />
              <span>Contact Me</span>
            </button>
          </Link>
          <a
            href="https://github.com/SahilVaghela07"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hero__github"
          >
            <FiGithub />
            <span>GitHub</span>
          </a>
        </motion.div>

        <motion.div
          className="hero__console"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__console-header">
            <span className="hero__console-title">
              <FiTerminal />
              portfolio.ts
            </span>
            <span className="hero__console-status">ready</span>
          </div>
          <pre className="hero__code" aria-label="Developer profile code sample">
            <code>{`const sahil = {
  role: 'Engineering Student & Developer',
  focus: ['React', 'Node.js', 'Three.js'],
  location: 'Gujarat, India',
  mission: 'learn, build, teach'
}`}</code>
          </pre>
          <div className="hero__metrics">
            <span><strong>01</strong> featured project</span>
            <span><strong>20+</strong> technologies</span>
            <span><strong>100%</strong> curious</span>
          </div>
        </motion.div>

        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          <Link to="about" smooth duration={500} offset={-80}>
            <span>Scroll</span>
            <FiArrowDown className="hero__scroll-arrow" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

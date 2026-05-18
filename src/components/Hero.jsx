import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiArrowUpRight, FiGithub, FiMail, FiMapPin } from 'react-icons/fi'
import TiltCard from './TiltCard'
import './Hero.css'

/* ─── Typewriter effect ─── */
function TypeWriter({ words, speed = 100, pause = 2000 }) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1))
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pause)
          return
        }
      } else {
        setText(currentWord.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timer)
  }, [text, wordIndex, isDeleting, words, speed, pause])

  return (
    <span className="hero__typewriter">
      {text}
      <span className="hero__cursor">|</span>
    </span>
  )
}

/* ─── Floating 3D Badge ─── */
function FloatingBadge({ icon, label, className = '' }) {
  return (
    <motion.div
      className={`hero__floating-badge ${className}`}
      animate={{
        y: [0, -8, 0],
        rotateZ: [0, 2, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  )
}

export default function Hero() {
  const roles = ['Full-Stack Developer', 'Frontend Engineer', 'UI Engineer', '3D Web Creator']

  return (
    <section id="home" className="hero">
      <div className="hero__content container">
        {/* Identity Layer */}
        <motion.div
          className="hero__identity"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Avatar with 3D ring */}
          <div className="hero__avatar-wrapper">
            <div className="hero__avatar-ring" />
            <div className="hero__avatar">
              <span className="hero__avatar-initials">SV</span>
            </div>
            <div className="hero__avatar-status">
              <span className="hero__status-dot" />
            </div>
          </div>

          {/* Badge */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span>Open to opportunities</span>
          </div>
        </motion.div>

        {/* Name + Role */}
        <motion.div
          className="hero__name-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero__eyebrow">
            <FiMapPin className="hero__eyebrow-icon" />
            Gujarat, India · Remote Ready
          </p>
          <h1 className="hero__title">
            Hi, I'm <span className="hero__name-highlight">Sahil Vaghela</span>
          </h1>
          <h2 className="hero__role">
            <TypeWriter words={roles} speed={80} pause={2500} />
          </h2>
        </motion.div>

        {/* Value Proposition */}
        <motion.p
          className="hero__value-prop"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          I craft clean, performant web experiences that transform complex ideas into
          intuitive interfaces. Focused on React, Three.js, and full-stack systems
          that users actually enjoy using.
        </motion.p>

        {/* Actions */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link to="about" smooth duration={500} offset={-80}>
            <button className="btn-primary" id="hero-explore-btn">
              <FiArrowUpRight />
              <span>Enter Gallery</span>
            </button>
          </Link>
          <Link to="contact" smooth duration={500} offset={-80}>
            <button className="btn-outline" id="hero-contact-btn">
              <FiMail />
              <span>Let's Talk</span>
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

        {/* 3D Console Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard className="hero__console-tilt" intensity={8}>
            <div className="hero__console">
              <div className="hero__console-header">
                <div className="hero__console-dots">
                  <span /><span /><span />
                </div>
                <span className="hero__console-title">portfolio.ts</span>
                <span className="hero__console-status">
                  <span className="hero__status-indicator" />
                  live
                </span>
              </div>
              <pre className="hero__code" aria-label="Developer profile code sample">
                <code>{`const sahil = {
  role: "Full-Stack Developer",
  focus: ["React", "Node.js", "Three.js"],
  location: "Gujarat, India 🇮🇳",
  education: "B.Tech @ GCET",
  passion: "Building things that matter",
  status: "Always learning, always shipping"
}`}</code>
              </pre>
              <div className="hero__metrics">
                <div className="hero__metric">
                  <strong>01</strong>
                  <span>Projects Live</span>
                </div>
                <div className="hero__metric">
                  <strong>20+</strong>
                  <span>Technologies</span>
                </div>
                <div className="hero__metric">
                  <strong>∞</strong>
                  <span>Curiosity</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Floating Badges */}
        <div className="hero__floating-badges">
          <FloatingBadge icon={<span>⚛️</span>} label="React" className="hero__float-1" />
          <FloatingBadge icon={<span>🔺</span>} label="Three.js" className="hero__float-2" />
          <FloatingBadge icon={<span>🟢</span>} label="Node.js" className="hero__float-3" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Link to="about" smooth duration={500} offset={-80}>
            <div className="hero__scroll-line" />
            <span>Scroll to explore</span>
            <FiArrowDown className="hero__scroll-arrow" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

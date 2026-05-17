import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi'
import { Link } from 'react-scroll'
import './Footer.css'

const socialLinks = [
  {
    href: 'https://github.com/SahilVaghela07',
    icon: <FiGithub />,
    label: 'GitHub',
    color: '#ffffff',
  },
  {
    href: 'https://www.linkedin.com/in/sahil-vaghela-022750307',
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    color: '#0a66c2',
  },
  {
    href: 'mailto:sahilsvaghela007@gmail.com',
    icon: <FiMail />,
    label: 'Email',
    color: '#00d992',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* Wave decoration */}
      <div className="footer__wave" />

      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <span className="footer__logo">
              <span className="footer__logo-mark">SV</span>
              <span>Sahil Vaghela</span>
            </span>
            <p className="footer__tagline">
              Engineering student, developer, and lifelong learner.
              <br />
              Building things that matter, one commit at a time.
            </p>
          </div>

          {/* 3D Social Icons */}
          <div className="footer__socials">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="footer__social-cube"
                aria-label={social.label}
                whileHover={{ y: -6, rotateY: 180 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="footer__cube-face footer__cube-front">
                  {social.icon}
                </div>
                <div className="footer__cube-face footer__cube-back">
                  <span>{social.label}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <div className="footer__back-top">
          <Link to="home" smooth duration={800}>
            <motion.button
              className="footer__top-btn"
              whileHover={{ y: -3 }}
              aria-label="Back to top"
            >
              <FiArrowUp />
              <span>Back to top</span>
            </motion.button>
          </Link>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} Sahil Vaghela · Built with <FiHeart className="footer__heart" /> using React & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}

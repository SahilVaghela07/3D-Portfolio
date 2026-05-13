import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    // Simulate sending (replace with EmailJS or backend later)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1500)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Get In Touch</span>
          <h2>Contact Me</h2>
          <div className="divider" />
        </motion.div>

        <div className="contact__layout">
          {/* Info Side */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="contact__info-title">
              Let's build something{' '}
              <span className="gradient-text">amazing</span> together
            </h3>
            <p className="contact__info-text">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology. Feel free to reach out!
            </p>

            <div className="contact__details">
              <div className="contact__detail-item">
                <div className="contact__detail-icon">
                  <FiMail />
                </div>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a href="mailto:sahilsvaghela007@gmail.com" className="contact__detail-value">
                    sahilsvaghela007@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact__detail-item">
                <div className="contact__detail-icon">
                  <FiMapPin />
                </div>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">Gujarat, India</span>
                </div>
              </div>
            </div>

            <div className="contact__socials">
              <a
                href="https://github.com/SahilVaghela07"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
              >
                <FiGithub />
                <span>GitHub</span>
                <FiArrowUpRight className="contact__social-arrow" />
              </a>
              <a
                href="https://www.linkedin.com/in/sahil-vaghela-022750307"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
              >
                <FiLinkedin />
                <span>LinkedIn</span>
                <FiArrowUpRight className="contact__social-arrow" />
              </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.form
            ref={formRef}
            className="contact__form glass-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact__form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="contact-email">Your Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact__form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Hi Sahil, I'd love to discuss..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary contact__submit"
              id="contact-submit-btn"
              disabled={sending}
            >
              {sending ? (
                <span>Sending...</span>
              ) : sent ? (
                <span>✓ Message Sent!</span>
              ) : (
                <>
                  <FiSend />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

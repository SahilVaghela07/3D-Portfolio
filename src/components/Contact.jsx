import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiArrowUpRight, FiClock, FiDownload, FiCheck, FiX } from 'react-icons/fi'
import TiltCard from './TiltCard'
import './Contact.css'

// Replace these EmailJS placeholders with real credentials when the form is ready for production.
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'    // e.g. 'AbCdEfGhIjKlMn'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const formRef = useRef()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setError(false)

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        to_name: 'Sahil Vaghela',
        message: form.message,
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    })
    .catch((err) => {
      setSending(false)
      setError(true)
      console.error('EmailJS Error:', err)
      setTimeout(() => setError(false), 4000)
    })
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
          <span className="subtitle">Let's Connect</span>
          <h2>Contact Me</h2>
          <div className="divider" />
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          className="contact__cta-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="contact__cta-text">
            Building something ambitious and need a <span>driven, fast-learning collaborator</span>? Let's talk.
          </p>
        </motion.div>

        <div className="contact__layout">
          {/* Info Side */}
          <motion.div
            className="contact__info-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <TiltCard className="contact__info-tilt" intensity={6}>
              <div className="contact__info">
                <h3 className="contact__info-title">
                  Open to internships, collaborations, and useful web ideas.
                </h3>
                <p className="contact__info-text">
                  Send a note if you want to discuss a project, an opportunity, or a
                  technical idea worth building. I approach every conversation with context and next steps.
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
                      <span className="contact__detail-value">Gujarat, India · Open to Remote</span>
                    </div>
                  </div>

                  <div className="contact__detail-item">
                    <div className="contact__detail-icon contact__detail-icon--clock">
                      <FiClock />
                    </div>
                    <div>
                      <span className="contact__detail-label">Response Time</span>
                      <span className="contact__detail-value">Typically within 24 hours</span>
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
              </div>
            </TiltCard>
          </motion.div>

          {/* Form Side */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <TiltCard className="contact__form-tilt" intensity={5}>
              <form
                ref={formRef}
                className="contact__form glass-card"
                onSubmit={handleSubmit}
              >
                <div className="contact__form-header">
                  <span className="contact__form-label">Send a Message</span>
                  <span className="contact__form-dot" />
                </div>

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
                  className={`btn-primary contact__submit ${sent ? 'contact__submit--sent' : ''} ${error ? 'contact__submit--error' : ''}`}
                  id="contact-submit-btn"
                  disabled={sending}
                >
                  {sending ? (
                    <span className="contact__sending">
                      <span className="contact__spinner" />
                      Sending...
                    </span>
                  ) : sent ? (
                    <span><FiCheck /> Message Sent!</span>
                  ) : error ? (
                    <span><FiX /> Failed — Try Again</span>
                  ) : (
                    <>
                      <FiSend />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

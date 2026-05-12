import { motion } from 'framer-motion'
import { FiCode, FiBookOpen, FiCpu, FiHeart } from 'react-icons/fi'
import './About.css'

const highlights = [
  {
    icon: <FiCode />,
    title: 'Developer',
    description: 'Passionate about building web applications and exploring new technologies.',
  },
  {
    icon: <FiBookOpen />,
    title: 'Learner',
    description: 'Currently pursuing engineering at GCET, always eager to expand knowledge.',
  },
  {
    icon: <FiCpu />,
    title: 'Problem Solver',
    description: 'Love tackling complex challenges and finding elegant solutions through code.',
  },
  {
    icon: <FiHeart />,
    title: 'Mentor',
    description: 'Excited to teach and share knowledge with fellow developers and students.',
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
              Hey there! I'm <span className="about__highlight">Sahil Vaghela</span>, 
              an engineering student at <span className="about__highlight">G.H. Patel 
              College of Engineering & Technology (GCET)</span>.
            </p>
            <p>
              I'm deeply passionate about technology and software development. 
              I believe in the power of code to transform ideas into reality, 
              and I'm always excited to learn new tools, frameworks, and concepts 
              that push the boundaries of what's possible.
            </p>
            <p>
              Beyond coding, I love sharing what I learn with others. Whether it's 
              mentoring peers or collaborating on projects, I find joy in growing 
              together with the developer community. I'm always ready to build 
              and create something new!
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

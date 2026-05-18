# 🚀 3D Portfolio Website

An interactive, immersive 3D portfolio website built with modern web technologies featuring stunning visual effects and smooth animations.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=flat-square&logo=three.js)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=flat-square)

## ✨ Features

- **3D Particle Field** — 1500+ animated particles floating in 3D space
- **Floating Geometry** — Wireframe icosahedrons, torus shapes, and octahedrons with glow
- **Post-processing** — Bloom and vignette effects for a cinematic look
- **Glassmorphism UI** — Modern frosted glass card design
- **Smooth Animations** — Scroll-triggered reveals with Framer Motion
- **Interactive 3D Skills Sphere** — Skills arranged in a 3D spherical layout
- **Responsive Design** — Works on all devices and screen sizes
- **Dark Space Theme** — Premium dark UI with gradient accents

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Three.js / R3F | 3D Graphics |
| @react-three/drei | 3D Helpers |
| @react-three/postprocessing | Visual Effects |
| Framer Motion | Animations |
| Vite | Build Tool |

## 📂 Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── ParticleField.jsx
│   │   ├── FloatingGeometry.jsx
│   │   ├── HeroScene.jsx
│   │   └── SkillsSphere.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── Loader.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/SahilVaghela07/3D-Portfolio.git

# Navigate to the project
cd 3D-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

## Contact Form Delivery

The contact form posts to `/api/contact`. To send messages to `sahilsvaghela007@gmail.com`, run the included Node server with SMTP credentials:

```bash
cp .env.example .env
# Fill SMTP_PASS with a Gmail app password, then:
npm run build
npm start
```

For Gmail, keep `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, and set `SMTP_USER`/`CONTACT_FROM_EMAIL` to the Gmail account that owns the app password.

## 📬 Contact

- **Email**: sahilsvaghela007@gmail.com
- **LinkedIn**: [Sahil Vaghela](https://www.linkedin.com/in/sahil-vaghela-022750307)
- **GitHub**: [SahilVaghela07](https://github.com/SahilVaghela07)

---

Made with ❤️ by **Sahil Vaghela**

import { useRef, useState } from 'react'

export default function TiltCard({ children, className = '', intensity = 15 }) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity

    // Shine position
    const shineX = (x / rect.width) * 100
    const shineY = (y / rect.height) * 100

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease',
      '--shine-x': `${shineX}%`,
      '--shine-y': `${shineY}%`,
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
      '--shine-x': '50%',
      '--shine-y': '50%',
    })
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-card__shine" />
      {children}
    </div>
  )
}

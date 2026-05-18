import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROOM_DISTANCE = 18
const ROOM_DEPTH = 12
const ROOM_WIDTH = 10
const ROOM_HEIGHT = 5
const PARTICLES_PER_ROOM = 150

const roomThemes = [
  {
    id: 'home',
    name: 'Genesis',
    accent: '#FF7030',
    accentAlt: '#FFD29A',
    wall: '#180A05',
    floor: '#1D0D07',
    fog: '#120703',
    fogNear: 3.2,
    fogFar: 17,
  },
  {
    id: 'about',
    name: 'Memory',
    accent: '#CC5533',
    accentAlt: '#FFB08D',
    wall: '#160B08',
    floor: '#21100C',
    fog: '#100805',
    fogNear: 4,
    fogFar: 19,
  },
  {
    id: 'projects',
    name: 'Bloom',
    accent: '#22CC55',
    accentAlt: '#7DFFC1',
    wall: '#07140C',
    floor: '#0A1C11',
    fog: '#061107',
    fogNear: 3.6,
    fogFar: 18,
  },
  {
    id: 'skills',
    name: 'Structure',
    accent: '#00BBFF',
    accentAlt: '#7A6BFF',
    wall: '#050D17',
    floor: '#07111D',
    fog: '#030811',
    fogNear: 5.2,
    fogFar: 22,
  },
  {
    id: 'contact',
    name: 'Signal',
    accent: '#FFDD88',
    accentAlt: '#FFFFFF',
    wall: '#151209',
    floor: '#1D190D',
    fog: '#0B0A06',
    fogNear: 8,
    fogFar: 32,
  },
]

let activeGallery = null

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function smoothstep(value) {
  const x = clamp(value, 0, 1)
  return x * x * (3 - 2 * x)
}

function injectStyles() {
  const style = document.createElement('style')
  style.dataset.galleryBackground = 'true'
  style.textContent = `
    .gallery-bg-ready {
      background: #050506;
    }

    .gallery-bg-ready #root,
    .gallery-bg-ready .app {
      position: relative;
      z-index: 1;
      background: transparent;
    }

    .gallery-bg-ready section,
    .gallery-bg-ready .section,
    .gallery-bg-ready .hero {
      background: transparent !important;
    }

    .gallery-bg-canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      touch-action: none;
    }

    .gallery-bg-flash {
      position: fixed;
      inset: 0;
      z-index: 10;
      pointer-events: none;
      opacity: 0;
      mix-blend-mode: screen;
      transition: opacity 160ms ease;
    }

    .gallery-bg-rail {
      position: fixed;
      top: 22vh;
      right: 18px;
      bottom: 22vh;
      width: 2px;
      z-index: 10;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 999px;
      overflow: hidden;
    }

    .gallery-bg-rail__fill {
      position: absolute;
      inset: 0;
      transform: scaleY(0);
      transform-origin: top;
      background: linear-gradient(180deg, #FF7030, #00BBFF, #FFDD88);
      box-shadow: 0 0 18px rgba(255, 221, 136, 0.45);
    }

    .gallery-bg-dots {
      position: fixed;
      top: 50%;
      right: 26px;
      z-index: 10;
      display: grid;
      gap: 10px;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .gallery-bg-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 0 rgba(255, 255, 255, 0);
      transform: scale(0.8);
      transition: background 220ms ease, box-shadow 220ms ease, transform 220ms ease;
    }

    .gallery-bg-dot.is-active {
      background: var(--gallery-dot-color, #FFDD88);
      box-shadow: 0 0 18px var(--gallery-dot-color, #FFDD88);
      transform: scale(1.3);
    }

    @media (max-width: 700px) {
      .gallery-bg-rail,
      .gallery-bg-dots {
        display: none;
      }
    }
  `
  document.head.appendChild(style)
  return style
}

function createMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.72,
    metalness: options.metalness ?? 0.08,
    emissive: options.emissive ?? '#000000',
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.opacity !== undefined && options.opacity < 1,
    opacity: options.opacity ?? 1,
  })
}

function createBox({ size, position, color, opacity, emissive, emissiveIntensity, metalness, roughness }) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(size[0], size[1], size[2]),
    createMaterial(color, { opacity, emissive, emissiveIntensity, metalness, roughness })
  )

  mesh.position.set(position[0], position[1], position[2])
  mesh.castShadow = true
  mesh.receiveShadow = true

  return mesh
}

function addEdges(mesh, color, opacity = 0.18) {
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    })
  )

  mesh.add(edges)
}

function createParticleField(theme, zOffset) {
  const positions = new Float32Array(PARTICLES_PER_ROOM * 3)
  const speeds = new Float32Array(PARTICLES_PER_ROOM)

  for (let i = 0; i < PARTICLES_PER_ROOM; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * (ROOM_WIDTH - 1.2)
    positions[i * 3 + 1] = -1.1 + Math.random() * (ROOM_HEIGHT - 0.6)
    positions[i * 3 + 2] = zOffset - ROOM_DEPTH * 0.45 + Math.random() * ROOM_DEPTH * 0.82
    speeds[i] = 0.08 + Math.random() * 0.16
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: theme.accent,
    size: 0.035,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geometry, material)
  points.userData.positions = positions
  points.userData.speeds = speeds
  points.userData.zOffset = zOffset

  return points
}

function updateParticleField(points, delta) {
  const positions = points.userData.positions
  const speeds = points.userData.speeds
  const zOffset = points.userData.zOffset

  for (let i = 0; i < PARTICLES_PER_ROOM; i += 1) {
    positions[i * 3 + 1] += speeds[i] * delta

    if (positions[i * 3 + 1] > ROOM_HEIGHT - 1.1) {
      positions[i * 3 + 1] = -1.16
      positions[i * 3] = (Math.random() - 0.5) * (ROOM_WIDTH - 1.2)
      positions[i * 3 + 2] = zOffset - ROOM_DEPTH * 0.45 + Math.random() * ROOM_DEPTH * 0.82
    }
  }

  points.geometry.attributes.position.needsUpdate = true
}

function createSculpture(theme, index, zOffset) {
  const group = new THREE.Group()
  const primary = theme.accent
  const secondary = theme.accentAlt

  if (index % 3 === 0) {
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.045, 24, 96),
      createMaterial(primary, {
        metalness: 0.28,
        roughness: 0.32,
        emissive: primary,
        emissiveIntensity: 0.38,
      })
    )
    torus.rotation.set(Math.PI / 2.4, 0.35, 0.15)
    group.add(torus)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 1),
      createMaterial(secondary, {
        metalness: 0.22,
        roughness: 0.34,
        emissive: secondary,
        emissiveIntensity: 0.22,
      })
    )
    group.add(core)
  } else if (index % 3 === 1) {
    for (let i = 0; i < 5; i += 1) {
      const block = createBox({
        size: [0.26 + i * 0.12, 0.26, 0.9 - i * 0.08],
        position: [-0.64 + i * 0.32, -0.2 + i * 0.2, 0],
        color: i % 2 === 0 ? primary : secondary,
        opacity: 0.82,
        emissive: i % 2 === 0 ? primary : secondary,
        emissiveIntensity: 0.12,
        metalness: 0.18,
        roughness: 0.42,
      })
      addEdges(block, '#ffffff', 0.16)
      group.add(block)
    }
  } else {
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.46, 0.045, 120, 12),
      createMaterial(primary, {
        metalness: 0.36,
        roughness: 0.26,
        emissive: primary,
        emissiveIntensity: 0.32,
      })
    )
    group.add(knot)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.96, 0.02, 16, 96),
      createMaterial(secondary, {
        metalness: 0.18,
        roughness: 0.38,
        emissive: secondary,
        emissiveIntensity: 0.42,
      })
    )
    ring.rotation.x = Math.PI / 2
    group.add(ring)
  }

  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.62, 0.9, 0.46, 8),
    createMaterial(theme.floor, {
      roughness: 0.44,
      metalness: 0.16,
      emissive: primary,
      emissiveIntensity: 0.05,
    })
  )
  pedestal.position.y = -0.78
  pedestal.castShadow = true
  pedestal.receiveShadow = true
  addEdges(pedestal, primary, 0.35)

  group.add(pedestal)
  group.position.set(index % 2 === 0 ? -4 : 4, -0.2, zOffset - 3.85)
  group.scale.setScalar(0.64)

  return group
}

function createRoom(theme, index) {
  const group = new THREE.Group()
  const zOffset = -index * ROOM_DISTANCE
  const sideGlow = index % 2 === 0 ? 1 : -1

  group.add(createBox({
    size: [ROOM_WIDTH, 0.16, ROOM_DEPTH],
    position: [0, -1.25, zOffset],
    color: theme.floor,
    emissive: theme.accent,
    emissiveIntensity: 0.018,
  }))
  group.add(createBox({
    size: [ROOM_WIDTH, 0.16, ROOM_DEPTH],
    position: [0, ROOM_HEIGHT - 1.25, zOffset],
    color: theme.wall,
    emissive: theme.accent,
    emissiveIntensity: 0.012,
  }))
  group.add(createBox({
    size: [0.16, ROOM_HEIGHT, ROOM_DEPTH],
    position: [-ROOM_WIDTH / 2, 1.25, zOffset],
    color: theme.wall,
    emissive: theme.accent,
    emissiveIntensity: 0.015,
  }))
  group.add(createBox({
    size: [0.16, ROOM_HEIGHT, ROOM_DEPTH],
    position: [ROOM_WIDTH / 2, 1.25, zOffset],
    color: theme.wall,
    emissive: theme.accentAlt,
    emissiveIntensity: 0.015,
  }))
  group.add(createBox({
    size: [ROOM_WIDTH, ROOM_HEIGHT, 0.18],
    position: [0, 1.25, zOffset - ROOM_DEPTH / 2],
    color: theme.wall,
    emissive: theme.accent,
    emissiveIntensity: 0.018,
  }))

  for (let i = 0; i < 7; i += 1) {
    group.add(createBox({
      size: [0.055, 0.055, ROOM_DEPTH - 1.2],
      position: [-3.6 + i * 1.2, -1.14, zOffset - 0.1],
      color: i % 2 === 0 ? theme.accent : theme.accentAlt,
      opacity: 0.5,
      emissive: i % 2 === 0 ? theme.accent : theme.accentAlt,
      emissiveIntensity: 0.35,
      metalness: 0.12,
      roughness: 0.5,
    }))
  }

  const mainLight = new THREE.PointLight(theme.accent, 5.8, 16, 1.25)
  mainLight.position.set(sideGlow * -1.8, 2.72, zOffset + 0.8)
  mainLight.castShadow = true
  mainLight.shadow.mapSize.set(512, 512)

  const accentLight = new THREE.PointLight(theme.accentAlt, 2.5, 13, 1.5)
  accentLight.position.set(sideGlow * 2.8, -0.25, zOffset - 4.3)

  const sculpture = createSculpture(theme, index, zOffset)
  const particles = createParticleField(theme, zOffset)

  group.add(mainLight, accentLight, sculpture, particles)

  return {
    group,
    zOffset,
    theme,
    mainLight,
    accentLight,
    sculpture,
    particles,
    mainBase: mainLight.intensity,
    accentBase: accentLight.intensity,
  }
}

function createCorridor(themeA, themeB, index) {
  const group = new THREE.Group()
  const zA = -index * ROOM_DISTANCE
  const zB = -(index + 1) * ROOM_DISTANCE
  const midZ = (zA + zB) / 2
  const length = ROOM_DISTANCE - ROOM_DEPTH
  const wallColor = '#050508'

  group.add(createBox({
    size: [ROOM_WIDTH, 0.14, length],
    position: [0, -1.24, midZ],
    color: wallColor,
    emissive: themeA.accent,
    emissiveIntensity: 0.01,
  }))
  group.add(createBox({
    size: [ROOM_WIDTH, 0.14, length],
    position: [0, ROOM_HEIGHT - 1.24, midZ],
    color: wallColor,
  }))
  group.add(createBox({
    size: [0.14, ROOM_HEIGHT, length],
    position: [-ROOM_WIDTH / 2, 1.25, midZ],
    color: wallColor,
    emissive: themeA.accent,
    emissiveIntensity: 0.012,
  }))
  group.add(createBox({
    size: [0.14, ROOM_HEIGHT, length],
    position: [ROOM_WIDTH / 2, 1.25, midZ],
    color: wallColor,
    emissive: themeB.accent,
    emissiveIntensity: 0.012,
  }))

  const guide = createBox({
    size: [0.08, 0.08, length - 0.8],
    position: [0, -1.1, midZ],
    color: themeB.accent,
    opacity: 0.52,
    emissive: themeB.accent,
    emissiveIntensity: 0.32,
  })
  group.add(guide)

  return group
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose()
    }

    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => material.dispose())
    }
  })
}

function getSections() {
  const sections = Array.from(document.querySelectorAll('section'))

  if (sections.length <= roomThemes.length) {
    return sections
  }

  return sections.filter((section) => section.id !== 'gallery').slice(0, roomThemes.length)
}

function themeForSection(section, index) {
  return roomThemes.find((theme) => theme.id === section.id) ?? roomThemes[index % roomThemes.length]
}

function createUi(roomCount) {
  const flash = document.createElement('div')
  flash.className = 'gallery-bg-flash'
  flash.setAttribute('aria-hidden', 'true')

  const rail = document.createElement('div')
  rail.className = 'gallery-bg-rail'
  rail.setAttribute('aria-hidden', 'true')

  const railFill = document.createElement('div')
  railFill.className = 'gallery-bg-rail__fill'
  rail.appendChild(railFill)

  const dots = document.createElement('div')
  dots.className = 'gallery-bg-dots'
  dots.setAttribute('aria-hidden', 'true')

  const dotNodes = []
  for (let i = 0; i < roomCount; i += 1) {
    const dot = document.createElement('span')
    dot.className = 'gallery-bg-dot'
    dots.appendChild(dot)
    dotNodes.push(dot)
  }

  document.body.append(flash, rail, dots)

  return { flash, rail, railFill, dots, dotNodes }
}

function flashDoor(ui, color) {
  ui.flash.style.background = `radial-gradient(circle at 50% 48%, ${color}66, transparent 62%)`
  ui.flash.style.opacity = '0.3'

  window.setTimeout(() => {
    ui.flash.style.opacity = '0'
  }, 140)
}

export function initGalleryBackground() {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if (activeGallery) {
    activeGallery.destroy()
  }

  const sections = getSections()

  if (!sections.length) {
    return () => {}
  }

  const selectedThemes = sections.map(themeForSection)
  const style = injectStyles()
  const canvas = document.createElement('canvas')
  canvas.className = 'gallery-bg-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.insertBefore(canvas, document.body.firstChild)
  document.body.classList.add('gallery-bg-ready')

  let renderer

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
  } catch (error) {
    canvas.remove()
    style.remove()
    document.body.classList.remove('gallery-bg-ready')
    console.warn('Gallery background could not start WebGL.', error)
    return () => {}
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap

  const scene = new THREE.Scene()
  scene.add(new THREE.AmbientLight(0x111111, 0.7))

  const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 90)
  const rooms = selectedThemes.map((theme, index) => {
    const room = createRoom(theme, index)
    scene.add(room.group)
    return room
  })

  for (let i = 0; i < selectedThemes.length - 1; i += 1) {
    scene.add(createCorridor(selectedThemes[i], selectedThemes[i + 1], i))
  }

  const cameraPoints = rooms.map((room, index) => (
    new THREE.Vector3(index % 2 === 0 ? -0.65 : 0.65, 1.18, room.zOffset + 4.15)
  ))
  const lookPoints = rooms.map((room, index) => (
    new THREE.Vector3(index % 2 === 0 ? 0.68 : -0.68, 0.42, room.zOffset - 3.4)
  ))

  if (cameraPoints.length === 1) {
    cameraPoints.push(cameraPoints[0].clone().add(new THREE.Vector3(0, 0, -0.01)))
    lookPoints.push(lookPoints[0].clone().add(new THREE.Vector3(0, 0, -0.01)))
  }

  const cameraPath = new THREE.CatmullRomCurve3(cameraPoints, false, 'catmullrom', 0.4)
  const lookPath = new THREE.CatmullRomCurve3(lookPoints, false, 'catmullrom', 0.4)
  const ui = createUi(rooms.length)
  const fogColor = new THREE.Color(selectedThemes[0].fog)
  const clearColor = new THREE.Color(selectedThemes[0].fog)
  const pointer = { x: 0, y: 0 }
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let lastFrameTime = window.performance.now()
  let elapsedTime = 0

  scene.fog = new THREE.Fog(fogColor, selectedThemes[0].fogNear, selectedThemes[0].fogFar)
  renderer.setClearColor(clearColor, 1)

  let targetProgress = 0
  let renderedProgress = 0
  let activeIndex = 0
  let animationFrame = 0
  let destroyed = false

  const resize = () => {
    const width = window.innerWidth || 1
    const height = window.innerHeight || 1

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    ScrollTrigger.refresh()
  }

  const updateActiveRoom = (progress) => {
    const index = clamp(Math.floor(progress * rooms.length), 0, rooms.length - 1)

    if (index === activeIndex) {
      return
    }

    activeIndex = index
    flashDoor(ui, selectedThemes[index].accent)
  }

  const updateAtmosphere = (progress) => {
    const scaled = progress * (rooms.length - 1)
    const fromIndex = clamp(Math.floor(scaled), 0, rooms.length - 1)
    const toIndex = clamp(fromIndex + 1, 0, rooms.length - 1)
    const mix = smoothstep(scaled - fromIndex)
    const from = selectedThemes[fromIndex]
    const to = selectedThemes[toIndex]

    clearColor.set(from.fog).lerp(new THREE.Color(to.fog), mix)
    scene.fog.color.copy(clearColor)
    scene.fog.near = THREE.MathUtils.lerp(from.fogNear, to.fogNear, mix)
    scene.fog.far = THREE.MathUtils.lerp(from.fogFar, to.fogFar, mix)
    renderer.setClearColor(clearColor, 1)

    rooms.forEach((room, index) => {
      const distance = Math.abs(scaled - index)
      const presence = clamp(1 - distance * 0.58, 0.08, 1)
      room.mainLight.intensity = room.mainBase * (0.24 + presence * 0.86)
      room.accentLight.intensity = room.accentBase * (0.18 + presence * 0.92)
      room.group.visible = distance < 2.25
    })
  }

  const updateUi = (progress) => {
    ui.railFill.style.transform = `scaleY(${progress})`

    ui.dotNodes.forEach((dot, index) => {
      const isActive = index === activeIndex
      dot.classList.toggle('is-active', isActive)
      dot.style.setProperty('--gallery-dot-color', selectedThemes[index].accent)
    })
  }

  const scrollTrigger = ScrollTrigger.create({
    id: 'gallery-room-background',
    start: 0,
    end: () => ScrollTrigger.maxScroll(window),
    scrub: 1.5,
    invalidateOnRefresh: true,
    onUpdate(self) {
      targetProgress = clamp(self.progress, 0, 1)
      updateActiveRoom(targetProgress)
      updateUi(targetProgress)
    },
  })

  const handlePointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
  }

  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  resize()
  updateActiveRoom(0)
  updateUi(0)

  const render = () => {
    if (destroyed) {
      return
    }

    const now = window.performance.now()
    const delta = Math.min((now - lastFrameTime) / 1000, 0.05)
    lastFrameTime = now
    elapsedTime += delta
    const elapsed = elapsedTime
    const lerpSpeed = prefersReducedMotion ? 0.22 : 0.065

    renderedProgress = THREE.MathUtils.lerp(renderedProgress, targetProgress, lerpSpeed)
    if (Math.abs(renderedProgress - targetProgress) < 0.0004) {
      renderedProgress = targetProgress
    }

    const cameraPoint = cameraPath.getPoint(clamp(renderedProgress, 0, 1))
    const lookPoint = lookPath.getPoint(clamp(renderedProgress, 0, 1))

    camera.position.copy(cameraPoint)
    camera.position.x += pointer.x * 0.16
    camera.position.y += pointer.y * -0.08 + Math.sin(elapsed * 0.55) * 0.025
    camera.lookAt(
      lookPoint.x + pointer.x * 0.12,
      lookPoint.y + pointer.y * -0.06,
      lookPoint.z
    )

    updateAtmosphere(renderedProgress)

    rooms.forEach((room, index) => {
      const speed = prefersReducedMotion ? 0.12 : 1
      room.sculpture.rotation.y = elapsed * (0.18 + index * 0.015) * speed
      room.sculpture.rotation.x = Math.sin(elapsed * 0.2 + index) * 0.045 * speed
      room.sculpture.position.y = 0.1 + Math.sin(elapsed * 0.85 + index) * 0.06 * speed
      room.mainLight.intensity += Math.sin(elapsed * 0.8 + index) * 0.2
      updateParticleField(room.particles, delta * speed)
    })

    renderer.render(scene, camera)
    animationFrame = window.requestAnimationFrame(render)
  }

  render()

  const controller = {
    destroy() {
      if (destroyed) {
        return
      }

      destroyed = true

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }

      scrollTrigger.kill()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)

      disposeObject(scene)
      renderer.dispose()
      canvas.remove()
      ui.flash.remove()
      ui.rail.remove()
      ui.dots.remove()
      style.remove()
      document.body.classList.remove('gallery-bg-ready')

      if (activeGallery === controller) {
        activeGallery = null
      }
    },
  }

  activeGallery = controller
  ScrollTrigger.refresh()

  return controller.destroy
}

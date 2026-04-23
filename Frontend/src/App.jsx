import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaBars,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMoon,
  FaNodeJs,
  FaReact,
  FaSun,
  FaTimes,
} from 'react-icons/fa'
import { SiExpress, SiTailwindcss } from 'react-icons/si'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

const typingPhrases = ['Full-Stack Web Developer', 'Tech Enthusiast', 'Photographer']
const typingSpeed = 100
const erasingSpeed = 50
const pauseTime = 1500

const experienceItems = [
  {
    period: '2024 - Present',
    title: 'Frontend & UI Development',
    place: 'Personal Portfolio Projects',
    description: 'Designed responsive interfaces, smooth motion, and polished section layouts using React and Framer Motion.',
  },
  {
    period: '2023 - 2024',
    title: 'Full-Stack App Building',
    place: 'Academic & Practice Work',
    description: 'Implemented Express APIs, shared data models, and full-stack features across small production-style apps.',
  },
  {
    period: '2022 - Present',
    title: 'Freelance / Self-Driven Learning',
    place: 'Continuous',
    description: 'Refined JavaScript, Tailwind, and component-driven workflows while building personal portfolio experiences.',
  },
]

function App() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typedRole, setTypedRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isErasingRole, setIsErasingRole] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'

    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  const heroRef = useRef(null)
  const vantaRef = useRef(null)
  const vantaInstanceRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 2)
  const isDark = theme === 'dark'

  const pageClass = isDark ? 'relative isolate overflow-x-hidden bg-[#000000] text-[#f8fafc]' : 'relative isolate overflow-x-hidden bg-[#fffaf2] text-[#2f3e46]'
  const backdropClass = isDark
    ? 'pointer-events-none fixed inset-0 bg-transparent'
    : 'pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(238,96,85,.12),transparent_40%),radial-gradient(circle_at_80%_35%,rgba(96,211,148,.14),transparent_35%)]'
  const topFadeClass = isDark
    ? 'pointer-events-none fixed inset-x-0 top-0 h-52 bg-gradient-to-b from-[#000000] via-[#000000]/60 to-transparent'
    : 'pointer-events-none fixed inset-x-0 top-0 h-52 bg-gradient-to-b from-[#fffaf2] via-[#fffaf2]/80 to-transparent'
  const navShellClass = isDark
    ? 'sticky top-4 z-30 mb-6 flex items-center justify-between gap-4 rounded-[1.75rem] border border-[rgba(50,74,95,0.28)] bg-[rgba(12,24,33,0.88)] px-5 py-3 shadow-2xl shadow-[rgba(0,0,0,0.45)] backdrop-blur-3xl'
    : 'glass sticky top-4 z-30 mb-6 flex items-center justify-between gap-4 rounded-[1.75rem] border border-[rgba(255,155,133,0.28)] bg-[rgba(255,217,125,0.34)] px-5 py-3 shadow-2xl shadow-[rgba(238,96,85,0.12)] backdrop-blur-3xl'
  const navTitleClass = isDark ? 'text-sm font-semibold italic tracking-[0.24em] text-[#f8fafc] md:text-base' : 'text-sm font-semibold italic tracking-[0.24em] text-[#354f52] md:text-base'
  const desktopLinksClass = isDark ? 'hidden flex-wrap items-center gap-5 text-xs text-[rgba(248,250,252,0.84)] lg:flex lg:text-sm' : 'hidden flex-wrap items-center gap-5 text-xs text-[#52796f] lg:flex lg:text-sm'
  const desktopLinkClass = isDark ? 'transition hover:text-[#324a5f]' : 'transition hover:text-[#ee6055]'
  const desktopThemeButtonClass = isDark
    ? 'inline-flex items-center gap-2 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-4 py-2 text-xs font-medium text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)]'
    : 'inline-flex items-center gap-2 rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] px-4 py-2 text-xs font-medium text-[#354f52] transition hover:bg-[rgba(170,246,131,0.24)]'
  const menuButtonClass = isDark
    ? 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)] lg:hidden'
    : 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] text-[#354f52] transition hover:bg-[rgba(170,246,131,0.24)] lg:hidden'
  const mobileMenuOverlayClass = isDark
    ? 'fixed inset-0 z-40 flex items-center justify-center bg-[rgba(0,0,0,0.8)] p-4 backdrop-blur-sm'
    : 'fixed inset-0 z-40 flex items-center justify-center bg-[rgba(255,155,133,0.22)] p-4 backdrop-blur-sm'
  const mobileMenuClass = isDark
    ? 'w-full max-w-[24rem] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[1.75rem] border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.96)] p-2 shadow-2xl shadow-[rgba(0,0,0,0.55)] backdrop-blur-3xl'
    : 'w-full max-w-[24rem] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[1.75rem] border border-[rgba(255,155,133,0.24)] bg-[rgba(255,217,125,0.28)] p-2 shadow-2xl shadow-[rgba(238,96,85,0.14)] backdrop-blur-3xl'
  const mobileMenuLinkClass = isDark
    ? 'flex w-full items-center rounded-2xl px-4 py-3 text-sm font-medium text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.18)] hover:text-[#f8fafc]'
    : 'flex w-full items-center rounded-2xl px-4 py-3 text-sm font-medium text-[#354f52] transition hover:bg-[rgba(170,246,131,0.22)] hover:text-[#2f3e46]'
  const menuLabelClass = isDark ? 'text-[11px] font-medium uppercase tracking-[0.24em] text-[#324a5f]' : 'text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400'
  const closeMenuButtonClass = isDark
    ? 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)] hover:text-[#f8fafc]'
    : 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] text-[#354f52] transition hover:bg-[rgba(170,246,131,0.24)] hover:text-[#2f3e46]'
  const badgeClass = isDark
    ? 'mb-4 inline-flex w-fit max-w-max self-start items-center gap-2 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-3 py-1 text-sm text-[#f8fafc]'
    : 'mb-4 inline-flex w-fit max-w-max self-start items-center gap-2 rounded-full border border-[rgba(96,211,148,0.28)] bg-[rgba(255,217,125,0.4)] px-3 py-1 text-sm text-[#354f52]'
  const textPrimaryClass = isDark ? 'text-[#f8fafc]' : 'text-[#2f3e46]'
  const textSecondaryClass = isDark ? 'text-[rgba(248,250,252,0.82)]' : 'text-[#52796f]'
  const textMutedClass = isDark ? 'text-[rgba(248,250,252,0.6)]' : 'text-[rgba(53,79,82,0.7)]'
  const heroSurfaceClass = isDark
    ? 'mb-8 flex min-h-[42vh] flex-col justify-start rounded-[2.5rem] border border-[rgba(50,74,95,0.24)] bg-gradient-to-b from-[#0c1821] to-[#1b2a41] p-8 text-[#f8fafc] shadow-2xl shadow-[rgba(0,0,0,0.5)] md:p-14'
    : 'mb-8 flex min-h-[42vh] flex-col justify-start rounded-[2.5rem] border border-[rgba(255,155,133,0.24)] bg-gradient-to-b from-[rgba(255,217,125,0.52)] to-[rgba(255,249,242,0.92)] p-8 text-[#2f3e46] shadow-xl shadow-[rgba(238,96,85,0.12)] md:p-14'
  const heroHeadingClass = isDark ? 'max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-[#f8fafc] md:text-7xl' : 'max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-[#2f3e46] md:text-7xl'
  const heroButtonPrimaryClass = isDark
    ? 'rounded-full bg-[#324a5f] px-6 py-3 font-medium text-[#f8fafc] transition hover:bg-[#1b2a41]'
    : 'rounded-full bg-[#60d394] px-6 py-3 font-medium text-[#2f3e46] transition hover:bg-[#aaf683]'
  const heroButtonSecondaryClass = isDark
    ? 'rounded-full border border-[rgba(50,74,95,0.32)] px-6 py-3 font-medium text-[#f8fafc] transition hover:bg-[rgba(27,42,65,0.2)]'
    : 'rounded-full border border-[rgba(238,96,85,0.28)] px-6 py-3 font-medium text-[#2f3e46] transition hover:bg-[rgba(255,155,133,0.2)]'
  const sectionTitleClass = isDark ? 'text-4xl font-semibold tracking-tight text-[#f8fafc] md:text-5xl' : 'text-4xl font-semibold tracking-tight text-[#2f3e46] md:text-5xl'
  const sectionBodyClass = isDark ? 'text-[rgba(248,250,252,0.72)]' : 'text-[#52796f]'
  const sectionSurfaceClass = isDark ? 'rounded-3xl border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.88)] p-7 shadow-xl shadow-[rgba(0,0,0,0.35)] backdrop-blur' : 'rounded-3xl border border-[rgba(255,155,133,0.22)] bg-[rgba(255,249,242,0.82)] p-7 shadow-xl shadow-[rgba(238,96,85,0.1)] backdrop-blur'
  const skillCardClass = isDark ? 'rounded-3xl border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.88)] p-6 shadow-xl shadow-[rgba(0,0,0,0.35)] backdrop-blur' : 'rounded-3xl border border-[rgba(255,155,133,0.22)] bg-[rgba(255,249,242,0.82)] p-6 shadow-xl shadow-[rgba(238,96,85,0.1)] backdrop-blur'
  const skillTrackClass = isDark ? 'mt-4 h-1.5 rounded-full bg-[rgba(27,42,65,0.95)]' : 'mt-4 h-1.5 rounded-full bg-[rgba(255,155,133,0.22)]'
  const skillTextClass = isDark ? 'mt-3 text-sm text-[rgba(248,250,252,0.68)]' : 'mt-3 text-sm text-[#52796f]'
  const projectCardClass = isDark ? 'group rounded-3xl border border-[rgba(50,74,95,0.22)] bg-[rgba(12,24,33,0.88)] p-7 shadow-xl shadow-[rgba(0,0,0,0.35)] backdrop-blur' : 'group rounded-3xl border border-[rgba(96,211,148,0.24)] bg-[rgba(255,217,125,0.22)] p-7 shadow-xl shadow-[rgba(238,96,85,0.1)] backdrop-blur'
  const projectTitleClass = isDark ? 'text-2xl font-medium text-[#f8fafc]' : 'text-2xl font-medium text-[#2f3e46]'
  const projectDescriptionClass = isDark ? 'mt-3 text-[rgba(248,250,252,0.82)]' : 'mt-3 text-[#52796f]'
  const chipClass = isDark
    ? 'rounded-full border border-[rgba(50,74,95,0.22)] bg-[rgba(27,42,65,0.72)] px-3 py-1 text-xs text-[#f8fafc]'
    : 'rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.4)] px-3 py-1 text-xs text-[#2f3e46]'
  const actionButtonClass = isDark
    ? 'inline-flex items-center gap-2 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-4 py-2 text-sm text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)]'
    : 'inline-flex items-center gap-2 rounded-full border border-[rgba(96,211,148,0.24)] bg-[rgba(255,217,125,0.3)] px-4 py-2 text-sm text-[#2f3e46] transition hover:bg-[rgba(170,246,131,0.2)]'
  const contactLinkClass = isDark
    ? 'flex items-center gap-2 rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] p-3 text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)]'
    : 'flex items-center gap-2 rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.3)] p-3 text-[#2f3e46] transition hover:bg-[rgba(255,155,133,0.18)]'
  const iconRowClass = isDark ? 'mt-6 flex flex-wrap gap-3 text-2xl text-[rgba(248,250,252,0.88)]' : 'mt-6 flex flex-wrap gap-3 text-2xl text-[#60d394]'
  const themeToggleLabel = isDark ? 'Light Mode' : 'Dark Mode'
  const themeToggleHint = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'
  const projectsToggleButtonClass = isDark
    ? 'rounded-full border border-[rgba(50,74,95,0.28)] bg-[rgba(27,42,65,0.72)] px-5 py-2 text-sm font-medium text-[#f8fafc] transition hover:bg-[rgba(50,74,95,0.26)]'
    : 'rounded-full border border-[rgba(238,96,85,0.24)] bg-[rgba(255,217,125,0.34)] px-5 py-2 text-sm font-medium text-[#2f3e46] transition hover:bg-[rgba(170,246,131,0.24)]'

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    root.style.colorScheme = theme
    document.body.style.backgroundColor = isDark ? '#000000' : '#fffaf2'
    document.body.style.color = isDark ? '#f8fafc' : '#2f3e46'
    window.localStorage.setItem('theme', theme)
  }, [isDark, theme])

  useEffect(() => {
    if (typeof window === 'undefined' || !vantaRef.current || !window.VANTA?.RINGS) return

    vantaInstanceRef.current?.destroy?.()
    vantaInstanceRef.current = window.VANTA.RINGS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: isDark ? 0x324a5f : 0xee6055,
      backgroundColor: isDark ? 0x000000 : 0xfffaf2,
    })

    return () => {
      vantaInstanceRef.current?.destroy?.()
      vantaInstanceRef.current = null
    }
  }, [isDark])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, skillsRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/projects'),
          fetch('/api/skills'),
        ])
        const [profileData, projectsData, skillsData] = await Promise.all([
          profileRes.json(),
          projectsRes.json(),
          skillsRes.json(),
        ])

        setProfile(profileData)
        setProjects(projectsData)
        setSkills(skillsData)
      } catch (error) {
        console.error('Failed to load portfolio data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const currentPhrase = typingPhrases[roleIndex]
    let timeoutId

    if (!isErasingRole && typedRole === currentPhrase) {
      timeoutId = window.setTimeout(() => {
        setIsErasingRole(true)
      }, pauseTime)
    } else if (isErasingRole && typedRole === '') {
      setIsErasingRole(false)
      setRoleIndex((current) => (current + 1) % typingPhrases.length)
    } else {
      timeoutId = window.setTimeout(() => {
        setTypedRole((currentText) =>
          isErasingRole ? currentText.slice(0, -1) : currentPhrase.slice(0, currentText.length + 1),
        )
      }, isErasingRole ? erasingSpeed : typingSpeed)
    }

    return () => window.clearTimeout(timeoutId)
  }, [isErasingRole, roleIndex, typedRole])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <main className={pageClass}>
      <div ref={vantaRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div className={backdropClass} />
      <div className={topFadeClass} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-10">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={navShellClass}
        >
          <h1 className={navTitleClass} style={{ fontFamily: 'Cambria, Georgia, serif' }}>
            Tanish_Portfolio
          </h1>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className={desktopLinksClass}>
              <a href="#about" className={desktopLinkClass}>
                About
              </a>
              <a href="#experience" className={desktopLinkClass}>
                Experience
              </a>
              <a href="#projects" className={desktopLinkClass}>
                Projects
              </a>
              <a href="#skills" className={desktopLinkClass}>
                Skills
              </a>
              <a href="#contact" className={desktopLinkClass}>
                Contact
              </a>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className={desktopThemeButtonClass}
              title={themeToggleHint}
              aria-label={themeToggleHint}
            >
              {isDark ? <FaSun /> : <FaMoon />}
              <span className="hidden sm:inline">{themeToggleLabel}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={`${menuButtonClass} shrink-0`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </motion.nav>

        {isMenuOpen && (
          <div className={mobileMenuOverlayClass} onClick={handleMenuItemClick}>
            <div className={mobileMenuClass} onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-3">
                <p className={menuLabelClass}>
                  Menu
                </p>
                <button
                  type="button"
                  onClick={handleMenuItemClick}
                  className={closeMenuButtonClass}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-1">
                <a href="#about" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  About
                </a>
                <a href="#experience" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Experience
                </a>
                <a href="#projects" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Projects
                </a>
                <a href="#skills" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Skills
                </a>
                <a href="#contact" onClick={handleMenuItemClick} className={mobileMenuLinkClass}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}

        <motion.section
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className={heroSurfaceClass}
        >
          <p className={badgeClass}>
            <span className="blink-dot" aria-hidden="true" /> Available For Internship
          </p>
          <h2 className={heroHeadingClass}>
            <span className="block text-3xl font-medium leading-none md:text-5xl">Hi, I am</span>
            <span className="block mt-2 text-5xl font-semibold leading-none md:text-8xl">{profile?.name || 'Tanish'}</span>
          </h2>
          <p className={`mt-6 font-mono text-base font-medium md:text-2xl ${textSecondaryClass}`}>
            <span className={isDark ? 'text-[#5bc0be]' : 'text-[#ee6055]'}>A </span>
            <span
              className={isDark ? 'text-[#5bc0be]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#ee6055] via-[#ffd97d] to-[#60d394]'}
            >
              {typedRole}
            </span>
            <span className="ml-1 inline-block w-2 animate-pulse">|</span>
          </p>
        </motion.section>

        <motion.section id="about" {...fadeUp} className="mb-20">
          <h3 className={`${sectionTitleClass} mb-2`}>About Me</h3>
          <p className={`max-w-4xl text-lg leading-relaxed md:text-xl ${textSecondaryClass}`}>
            Passionate about bridging technology and user needs, I am a full-stack web developer with a robust foundation in computer science and a zeal for continuous learning.
          </p>
          <p className={`mt-5 max-w-4xl text-lg leading-relaxed md:text-xl ${textSecondaryClass}`}>
            Specializing in creating seamless, intuitive digital experiences, my expertise spans front-end and back-end development, including technologies like JavaScript, React, and Node.js. I thrive on problem-solving and innovation, aiming to contribute to projects that push technological boundaries. Eager to collaborate with like-minded teams, I am on a quest to develop impactful web solutions that drive success and foster growth.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className={heroButtonPrimaryClass}>
              View My Work
            </a>
            <a href="#contact" className={heroButtonSecondaryClass}>
              Contact Me
            </a>
          </div>
        </motion.section>

        <motion.section id="experience" {...fadeUp} className="mb-20">
          <h3 className={sectionTitleClass}>Experience</h3>
          <p className={`mb-8 max-w-2xl ${sectionBodyClass}`}>
            A snapshot of hands-on work across interface design, full-stack development, and ongoing learning.
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {experienceItems.map((item, index) => (
              <motion.article
                key={`${item.period}-${item.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                className={sectionSurfaceClass}
              >
                <p className={`text-xs uppercase tracking-[0.24em] ${textMutedClass}`}>{item.period}</p>
                <h4 className={`mt-3 text-2xl font-semibold ${textPrimaryClass}`}>{item.title}</h4>
                <p className={`mt-1 font-medium ${textSecondaryClass}`}>{item.place}</p>
                <p className={`mt-4 leading-relaxed ${textSecondaryClass}`}>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="skills" {...fadeUp} className="mb-20">
          <motion.h3
            className={sectionTitleClass}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            Built With Modern Stack
          </motion.h3>
          <p className={`mb-8 max-w-2xl ${sectionBodyClass}`}>Focused on performance, delightful motion, and clean full-stack engineering.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.article
                key={skill.name}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                className={skillCardClass}
              >
                <p className={`text-lg font-medium ${textPrimaryClass}`}>{skill.name}</p>
                <div className={skillTrackClass}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      isDark
                        ? 'bg-gradient-to-r from-[#324a5f] via-[#1b2a41] to-[#0c1821]'
                        : 'bg-gradient-to-r from-[#ee6055] via-[#ffd97d] to-[#60d394]'
                    }`}
                  />
                </div>
                <p className={skillTextClass}>{skill.level}% Confidence</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" {...fadeUp} className="mb-20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h3 className={sectionTitleClass}>Featured Work</h3>
            {projects.length > 2 && (
              <button
                type="button"
                onClick={() => setShowAllProjects((current) => !current)}
                className={projectsToggleButtonClass}
              >
                {showAllProjects ? 'Hide Extra' : 'View All'}
              </button>
            )}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={projectCardClass}
              >
                <h4 className={projectTitleClass}>{project.title}</h4>
                <p className={projectDescriptionClass}>{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={actionButtonClass}
                    >
                      <FaGithub /> GitHub Repo
                    </a>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mb-16 grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article className={`${sectionSurfaceClass} h-full w-full min-h-[360px] flex flex-col justify-between rounded-[2rem] p-8 md:p-10`}>
            <h3 className={`text-3xl font-semibold ${textPrimaryClass}`}>Why Work With Me</h3>
            <p className={`mt-4 ${textSecondaryClass}`}>
              I love combining clean visuals and robust APIs, with smooth interactions inspired by premium product experiences.
            </p>
            <div className={iconRowClass}>
              <FaReact />
              <SiTailwindcss />
              <FaNodeJs />
              <SiExpress />
            </div>
          </article>

          <article id="contact" className={`${sectionSurfaceClass} h-full w-full min-h-[360px] flex flex-col justify-start rounded-[2rem] p-8 md:p-10`}>
            <h3 className={`text-3xl font-semibold ${textPrimaryClass}`}>Contact</h3>
            <div className="mt-6 flex flex-col gap-3">
              <a href={`mailto:${profile?.email || 'sarraftanish@gmail.com'}`} className={`${contactLinkClass} w-full`}>
                <FaEnvelope className="text-xl" />
                Email
              </a>
              <a
                href={profile?.github || 'https://github.com/SarrafTanish'}
                target="_blank"
                rel="noreferrer"
                className={`${contactLinkClass} w-full`}
              >
                <FaGithub className="text-xl" />
                GitHub
              </a>
              <a
                href={`https://linkedin.com/in/${profile?.linkedin || 'tanish-sarraf-520144346'}`}
                target="_blank"
                rel="noreferrer"
                className={`${contactLinkClass} w-full`}
              >
                <FaLinkedin className="text-xl" />
                LinkedIn
              </a>
            </div>
          </article>
        </motion.section>

        <footer className="pb-6 text-center text-sm">
          <p className={`font-semibold ${isDark ? 'text-[#f8fafc]' : 'text-[#000000]'}`}>
            Built by Tanish Kumar Sarraf · © {new Date().getFullYear()} All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}

export default App

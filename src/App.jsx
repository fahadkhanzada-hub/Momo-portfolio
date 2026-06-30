import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageSquareQuote,
  Phone,
  Search,
  Sparkles,
  SquareArrowOutUpRight,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { certifications, education, experience, expertise, highlights, languages, profile, projects } from './data'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return <motion.div className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-accent" style={{ scaleX }} />
}

function PageShell({ children }) {
  return <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">{children}</motion.div>
}

function AnimatedSection({ id, eyebrow, title, subtitle, children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-110px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-24 md:py-32 ${className}`}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent/90">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl text-text md:text-5xl">{title}</h2>
          {subtitle ? <p className="mt-4 text-base leading-7 text-muted md:text-lg">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </motion.section>
  )
}

function MagneticButton({ children, className = '', variant = 'primary', ...props }) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const Component = props.href ? motion.a : motion.button

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setPosition({ x: (event.clientX - centerX) * 0.15, y: (event.clientY - centerY) * 0.15 })
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 })
  }

  const base =
    variant === 'primary'
      ? 'bg-accent text-black shadow-[0_10px_40px_rgba(232,255,71,0.16)] hover:shadow-[0_12px_50px_rgba(232,255,71,0.22)]'
      : 'border border-border bg-transparent text-text hover:border-accent hover:text-accent'

  return (
    <Component
      ref={buttonRef}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${base} ${className}`}
      style={{ x: position.x, y: position.y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(props.href ? {} : { type: 'button' })}
      {...props}
    >
      {children}
    </Component>
  )
}

function AppHeader({ onOpenCv }) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#about', label: 'About' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg text-text">
          Malaika <span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-muted transition hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenCv}
            className="rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent"
          >
            View CV
          </button>
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-surface md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-muted transition hover:text-text" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <button type="button" onClick={onOpenCv} className="text-left text-sm text-accent" >
                View CV
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

function Hero({ onOpenCv }) {
  const nameLetters = useMemo(() => profile.name.split(''), [])

  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-hero-grid bg-hero-grid [background-position:0_0,0_0]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,255,71,0.1),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(79,255,255,0.09),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1.25fr_0.75fr] md:py-28">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-accent backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Available for remote tutoring and digital marketing work
          </motion.div>

          <motion.h1 variants={item} className="mt-7 font-display text-5xl leading-[0.95] tracking-tight text-text md:text-7xl lg:text-8xl">
            {nameLetters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className={letter === ' ' ? 'inline-block w-3 md:w-4' : 'inline-block'}
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            {profile.title}. Building engaging learning experiences, sharper content systems, and clean SEO-driven workflows for students and brands.
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-7 text-text/80 md:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#projects">
              View Work
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton onClick={onOpenCv} variant="secondary">
              View CV
              <SquareArrowOutUpRight size={16} />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="relative">
          <div className="absolute -inset-6 rounded-[2rem] border border-accent/15 bg-accent/5 blur-3xl" />
          <div className="relative rounded-[2rem] border border-border bg-surface/90 p-6 shadow-glow backdrop-blur-xl md:p-8">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Profile</p>
                <h2 className="mt-2 font-display text-2xl text-text">Kohat, Pakistan</h2>
              </div>
              <div className="rounded-full border border-accent/30 bg-accent-subtle px-4 py-2 font-mono text-xs text-accent">
                Remote ready
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {highlights.map((highlight) => (
                <div key={highlight.label} className="rounded-2xl border border-border bg-surface-2 p-4 transition hover:border-border-hover hover:bg-white/5">
                  <p className="font-display text-2xl text-text">{highlight.value}</p>
                  <p className="mt-1 text-sm text-muted">{highlight.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-white/3 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Focus</p>
              <p className="mt-3 text-sm leading-7 text-text/80">
                English teaching, lesson design, student support, SEO audits, content writing, and AI-enhanced learning tools.
              </p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

function ExpertiseSection() {
  const iconMap = {
    book: BookOpen,
    search: Search,
    sparkles: Sparkles,
  }

  return (
    <AnimatedSection
      id="expertise"
      eyebrow="Expertise"
      title="A focused mix of teaching, strategy, and content work"
      subtitle="The portfolio centers on work that connects language, clarity, and growth. Each area below reflects how I build useful experiences for students and clients."
    >
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-6 md:grid-cols-3">
        {expertise.map((section) => {
          const Icon = iconMap[section.icon]
          return (
            <motion.article key={section.title} variants={item} whileHover={{ y: -8 }} className="group rounded-[1.75rem] border border-border bg-surface p-6 transition hover:border-accent/40 hover:shadow-glow md:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/4 text-accent transition group-hover:border-accent/40">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Section</span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-text">{section.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                {section.items.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          )
        })}
      </motion.div>
    </AnimatedSection>
  )
}

function AboutSection() {
  return (
    <AnimatedSection
      id="about"
      eyebrow="About"
      title="Teaching that feels structured, supportive, and human"
      subtitle="The work is grounded in language education, but it also reaches into digital marketing and educational technology. That combination makes the portfolio practical for schools, tutoring, and content-oriented roles."
      className="pt-0"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-border bg-surface p-6 md:p-8">
          <p className="text-base leading-8 text-text/80 md:text-lg">
            {profile.summary}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {languages.map((language) => (
              <div key={language} className="rounded-2xl border border-border bg-white/4 px-4 py-4">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Language</p>
                <p className="mt-2 text-lg text-text">{language}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-surface p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white/4 text-accent">
              <Brain size={20} strokeWidth={1.6} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Approach</p>
              <p className="mt-1 text-lg text-text">Clear planning, high engagement</p>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted md:text-base">
            <p>Lesson plans are designed to give students direction, confidence, and visible progress.</p>
            <p>SEO and content work stay focused on clarity, discoverability, and practical outcomes.</p>
            <p>AI tools are used to speed up routine tasks while keeping the work thoughtful and human.</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function ExperienceSection() {
  return (
    <AnimatedSection
      id="experience"
      eyebrow="Experience"
      title="Tutoring and digital marketing experience"
      subtitle="A concise work history that shows direct teaching experience and current digital marketing practice."
    >
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5">
        {experience.map((entry) => (
          <motion.article key={entry.role} variants={item} whileHover={{ x: 6 }} className="rounded-[1.5rem] border border-border bg-surface p-6 transition hover:border-accent/35 md:p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-2xl text-text">{entry.role}</p>
                <p className="mt-1 text-sm text-muted">{entry.company}</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/4 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                <Briefcase size={14} />
                {entry.period}
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-text/75 md:text-base">{entry.summary}</p>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}

function ProjectsSection() {
  return (
    <AnimatedSection
      id="projects"
      eyebrow="Projects"
      title="Work samples built around learning and growth"
      subtitle="These projects represent lesson creation, audit work, and content systems rather than code-heavy product builds."
    >
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <motion.article key={project.title} variants={item} whileHover={{ y: -8 }} className="group rounded-[1.75rem] border border-border bg-surface p-6 transition hover:border-accent/40 hover:shadow-glow">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-border bg-white/4 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">{project.tag}</span>
              <SquareArrowOutUpRight size={16} className="text-muted transition group-hover:text-accent" />
            </div>
            <h3 className="mt-5 font-display text-2xl text-text">{project.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  )
}

function EducationSection() {
  return (
    <AnimatedSection
      id="education"
      eyebrow="Education"
      title="Academic and professional training"
      subtitle="The academic background combines linguistics with practical digital marketing training."
    >
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid gap-5 lg:grid-cols-2">
        {education.map((entry) => (
          <motion.article key={entry.title} variants={item} className="rounded-[1.5rem] border border-border bg-surface p-6 transition hover:border-accent/35 md:p-7">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-white/4 text-accent">
                <GraduationCap size={20} strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="font-display text-2xl text-text">{entry.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{entry.institution}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">{entry.meta}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-border bg-surface p-6 md:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Certifications</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {certifications.map((certification) => (
              <span key={certification} className="rounded-full border border-border bg-white/4 px-4 py-2 text-sm text-text/80 transition hover:border-accent hover:text-accent">
                {certification}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-border bg-accent-subtle p-6 md:p-7">
          <div className="flex items-center gap-3 text-accent">
            <Layers3 size={20} strokeWidth={1.6} />
            <p className="font-mono text-xs uppercase tracking-[0.24em]">Tools</p>
          </div>
          <p className="mt-4 text-sm leading-7 text-text/80 md:text-base">
            Canva, Microsoft Office, ChatGPT prompt engineering, SEO tools, and content editing workflows are used to support teaching and marketing work.
          </p>
        </div>
      </div>
    </AnimatedSection>
  )
}

function ContactSection({ onOpenCv }) {
  return (
    <AnimatedSection
      id="contact"
      eyebrow="Contact"
      title="Open to tutoring, content, and SEO work"
      subtitle="If the fit is right, the fastest path is email or phone. The CV stays available for viewing directly in the browser."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-border bg-surface p-6 md:p-8">
          <div className="space-y-4">
            <a href={`mailto:${profile.email}`} className="flex items-center justify-between rounded-2xl border border-border bg-white/4 px-4 py-4 transition hover:border-accent hover:text-accent">
              <span className="flex items-center gap-3 text-sm text-text/80">
                <Mail size={18} />
                {profile.email}
              </span>
              <ArrowRight size={16} />
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="flex items-center justify-between rounded-2xl border border-border bg-white/4 px-4 py-4 transition hover:border-accent hover:text-accent">
              <span className="flex items-center gap-3 text-sm text-text/80">
                <Phone size={18} />
                {profile.phone}
              </span>
              <ArrowRight size={16} />
            </a>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-white/4 px-4 py-4">
              <span className="flex items-center gap-3 text-sm text-text/80">
                <MapPin size={18} />
                {profile.location}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-border bg-surface p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">CV viewer</p>
          <p className="mt-4 text-base leading-7 text-text/80">
            View the CV in a browser-friendly document layout. It opens in a modal on this page and in a dedicated route for a fuller reading experience.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <MagneticButton onClick={onOpenCv}>
              View CV
              <SquareArrowOutUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="/cv" target="_blank" rel="noreferrer" variant="secondary">
              Open CV page
              <MessageSquareQuote size={16} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>Built for Malaika Guljahan.</p>
        <p>English teaching, SEO, and content work with a dark editorial feel.</p>
      </div>
    </footer>
  )
}

function CvViewer({ onClose }) {
  return (
    <div className="min-h-screen bg-bg px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-6 flex max-w-5xl items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">CV Viewer</p>
          <h1 className="mt-2 font-display text-3xl text-text md:text-4xl">{profile.name}</h1>
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent">
          Close
        </button>
      </div>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-surface shadow-glow">
        <div className="border-b border-border bg-white/3 px-6 py-5 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Responsive document viewer</p>
          <p className="mt-2 text-sm text-muted">Browser-friendly CV preview. No download controls are provided.</p>
        </div>
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <aside className="border-b border-border p-6 lg:border-b-0 lg:border-r md:p-8">
            <div className="rounded-[1.5rem] border border-border bg-accent-subtle p-6">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Profile</p>
              <h2 className="mt-3 font-display text-3xl text-text">English Teacher</h2>
              <p className="mt-4 text-sm leading-7 text-text/80">{profile.summary}</p>
            </div>
            <div className="mt-6 space-y-3 text-sm text-muted">
              <p>{profile.location}</p>
              <p>{profile.phone}</p>
              <p>{profile.email}</p>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-border bg-white/4 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Core strengths</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-text/75">
                <li>TESOL and English tutoring</li>
                <li>Lesson planning and student engagement</li>
                <li>SEO, website audits, and content writing</li>
                <li>AI-powered educational tools and workflows</li>
              </ul>
            </div>
          </aside>
          <main className="p-6 md:p-8">
            <div className="space-y-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Experience</p>
                <div className="mt-4 space-y-4">
                  {experience.map((entry) => (
                    <div key={entry.role} className="rounded-[1.25rem] border border-border bg-white/4 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl text-text">{entry.role}</h3>
                          <p className="mt-1 text-sm text-muted">{entry.company}</p>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{entry.period}</span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-text/75">{entry.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Education</p>
                <div className="mt-4 space-y-4">
                  {education.map((entry) => (
                    <div key={entry.title} className="rounded-[1.25rem] border border-border bg-white/4 p-5">
                      <h3 className="font-display text-xl text-text">{entry.title}</h3>
                      <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                      <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-accent">{entry.meta}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Certifications</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {certifications.map((certification) => (
                    <span key={certification} className="rounded-full border border-border bg-white/4 px-4 py-2 text-sm text-text/80">
                      {certification}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function HomePage({ onOpenCv }) {
  return (
    <PageShell>
      <Hero onOpenCv={onOpenCv} />
      <main>
        <AboutSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection onOpenCv={onOpenCv} />
      </main>
      <Footer />
    </PageShell>
  )
}

function AppRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cvOpen, setCvOpen] = useState(false)
  const [bodyLocked, setBodyLocked] = useState(false)

  useEffect(() => {
    setBodyLocked(cvOpen)
  }, [cvOpen])

  useEffect(() => {
    document.body.style.overflow = bodyLocked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [bodyLocked])

  return (
    <>
      <ScrollProgressBar />
      <AppHeader onOpenCv={() => setCvOpen(true)} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage onOpenCv={() => setCvOpen(true)} />} />
          <Route path="/cv" element={<PageShell><CvViewer onClose={() => navigate('/')} /></PageShell>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <AnimatePresence>
        {cvOpen ? (
          <motion.div
            className="fixed inset-0 z-[120] overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-xl sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="mx-auto max-w-5xl">
              <div className="mb-4 flex justify-end">
                <button type="button" onClick={() => setCvOpen(false)} className="rounded-full border border-border bg-bg px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent">
                  Close CV
                </button>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-glow">
                <div className="border-b border-border px-6 py-4 text-sm text-muted">
                  View-only CV modal. No download controls are included.
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                  <CvViewer onClose={() => setCvOpen(false)} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return <AppRoutes />
}

import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Phone,
  SquareArrowOutUpRight,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { certifications, education, experience, expertise, highlights, languages, profile, projects } from './data'

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22, ease: 'easeIn' } },
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const textFadeVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

function FadeInText({ as = 'p', className = '', children, delay = 0 }) {
  const shared = {
    className,
    variants: textFadeVariants,
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin: '-60px' },
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    children,
  }

  if (as === 'h1') return <motion.h1 {...shared} />
  if (as === 'h2') return <motion.h2 {...shared} />
  if (as === 'h3') return <motion.h3 {...shared} />
  if (as === 'span') return <motion.span {...shared} />
  return <motion.p {...shared} />
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return <motion.div className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-accent" style={{ scaleX }} />
}

function Section({ id, index, title, subtitle, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      className="border-t border-border py-20 md:py-24"
      initial={{ opacity: 0, y: 45 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeInText as="p" className="font-mono text-xs uppercase tracking-[0.34em] text-accent">{index}</FadeInText>
            <FadeInText as="h2" delay={0.06} className="mt-3 font-display text-[38px] leading-[1.02] tracking-[-0.03em] text-text md:text-[48px] md:leading-[48px]">{title}</FadeInText>
          </div>
          {subtitle ? <FadeInText delay={0.12} className="max-w-xl text-[16px] leading-7 text-muted">{subtitle}</FadeInText> : null}
        </div>
        {children}
      </div>
    </motion.section>
  )
}

function MagneticButton({ children, className = '', variant = 'primary', ...props }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const Component = props.href ? motion.a : motion.button

  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setPosition({ x: (event.clientX - centerX) * 0.15, y: (event.clientY - centerY) * 0.15 })
  }

  const base =
    variant === 'primary'
      ? 'bg-accent text-black hover:bg-accent/90'
      : 'border border-border text-text hover:border-accent hover:text-accent'

  return (
    <Component
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${base} ${className}`}
      style={{ x: position.x, y: position.y }}
      onMouseMove={onMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(props.href ? {} : { type: 'button' })}
      {...props}
    >
      {children}
    </Component>
  )
}

function Header({ onOpenCv }) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#work', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-text">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border">MG</span>
          {profile.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="relative text-base text-text transition hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100">
              {link.label}
            </a>
          ))}
          <button type="button" onClick={onOpenCv} className="rounded-full border border-border px-4 py-2 text-base text-text transition hover:border-accent hover:text-accent">
            View CV
          </button>
        </nav>
        <button type="button" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-border bg-surface px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-muted transition hover:text-text">
                  {link.label}
                </a>
              ))}
              <button type="button" onClick={onOpenCv} className="text-left text-sm text-accent">View CV</button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

function Hero({ onOpenCv }) {
  const letters = useMemo(() => profile.name.split(''), [])

  return (
    <section className="relative overflow-hidden border-b border-border py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 hero-noise" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div variants={listVariants} initial="hidden" animate="show">
          <motion.p variants={itemVariants} className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
            01 / Intro
          </motion.p>
          <FadeInText as="h1" delay={0.08} className="mt-5 text-balance font-display text-[52px] leading-[0.9] tracking-[-0.03em] text-text md:text-[86px] md:leading-[0.9] md:tracking-[-0.03em]">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className={letter === ' ' ? 'inline-block w-3 md:w-4' : 'inline-block'}
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.028, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </FadeInText>
          <FadeInText delay={0.16} className="mt-6 max-w-3xl text-[18px] leading-[29px] text-muted">
            English teaching, SEO content, and educational technology workflows that create measurable learner progress.
          </FadeInText>
          <FadeInText delay={0.22} className="mt-4 max-w-2xl text-[18px] leading-[29px] text-muted">
            {profile.summary}
          </FadeInText>
          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#work">
              View Work
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton onClick={onOpenCv} variant="secondary">
              View CV
              <SquareArrowOutUpRight size={16} />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="grid gap-4">
          {highlights.map((value) => (
            <motion.div key={value.label} whileHover={{ y: -6 }} className="rounded-2xl border border-border bg-surface p-5 transition hover:border-border-hover">
              <p className="font-display text-[32px] tracking-[-0.02em] text-text">{value.value}</p>
              <p className="mt-1 text-[16px] text-muted">{value.label}</p>
            </motion.div>
          ))}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Location</p>
            <p className="mt-2 text-[16px] text-text">{profile.location}</p>
            <p className="mt-1 text-[16px] text-muted">Remote friendly</p>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

function WorkSection() {
  return (
    <Section
      id="work"
      index="02 / Work"
      title="Recent Projects"
      subtitle="Production-quality teaching and digital projects with clear practical outcomes."
    >
      <motion.div variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }} className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <motion.article key={project.title} variants={itemVariants} whileHover={{ y: -7 }} className="group rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40">
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">{project.tag}</span>
              <ExternalLink size={16} className="text-muted transition group-hover:text-accent" />
            </div>
            <h3 className="mt-5 font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-text">{project.title}</h3>
            <FadeInText className="mt-3 text-sm leading-7 text-muted">{project.description}</FadeInText>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

function SkillsSection() {
  const skillCloud = expertise.flatMap((group) => group.items)

  return (
    <Section
      id="skills"
      index="03 / Skills"
      title="Core Expertise"
      subtitle="English teaching depth backed by digital marketing and AI-assisted content workflows."
    >
      <motion.div variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }} className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Professional Skills</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {skillCloud.map((skill) => (
              <motion.span key={skill} whileHover={{ scale: 1.05 }} className="rounded-full border border-border px-4 py-2 text-sm text-text/85 transition hover:border-accent hover:text-accent">
                {skill}
              </motion.span>
            ))}
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-muted">Languages</p>
            <p className="mt-3 text-sm text-text">{languages.join(' · ')}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Education + Certifications</p>
          <div className="mt-4 space-y-4">
            {education.slice(0, 3).map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-[#111] p-4">
                <p className="font-display text-2xl text-text">{item.title}</p>
                <FadeInText className="mt-1 text-sm text-muted">{item.institution}</FadeInText>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {certifications.map((name) => (
              <span key={name} className="rounded-full border border-border px-3 py-1 text-xs text-muted">{name}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}

function ExperienceSection() {
  return (
    <Section
      id="experience"
      index="04 / Experience"
      title="Work History"
      subtitle="Hands-on tutoring and digital marketing experience with direct student and client impact."
    >
      <motion.div variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-90px' }} className="space-y-4">
        {experience.map((entry) => (
          <motion.article key={entry.role} variants={itemVariants} whileHover={{ x: 6 }} className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/40 md:p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-text">{entry.role}</h3>
                <p className="mt-1 text-[16px] text-muted">{entry.company}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                <Briefcase size={14} />
                {entry.period}
              </span>
            </div>
            <FadeInText className="mt-4 max-w-3xl text-[18px] leading-[29px] text-muted">{entry.summary}</FadeInText>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}

function ContactSection({ onOpenCv }) {
  return (
    <Section
      id="contact"
      index="05 / Contact"
      title="Let's Work Together"
      subtitle="Available for tutoring, educational content, and digital marketing support."
    >
      <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
        <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-border bg-surface p-6">
          <a href={`mailto:${profile.email}`} className="flex items-center justify-between border-b border-border pb-4 text-sm text-text/90 transition hover:text-accent">
            <span className="inline-flex items-center gap-2"><Mail size={16} /> {profile.email}</span>
            <ArrowRight size={15} />
          </a>
          <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="mt-4 flex items-center justify-between border-b border-border pb-4 text-sm text-text/90 transition hover:text-accent">
            <span className="inline-flex items-center gap-2"><Phone size={16} /> {profile.phone}</span>
            <ArrowRight size={15} />
          </a>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted"><MapPin size={16} /> {profile.location}</p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">CV Access</p>
          <FadeInText className="mt-3 text-sm leading-7 text-muted">
            Open the CV in a browser-first viewer. No direct download controls are shown.
          </FadeInText>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <MagneticButton onClick={onOpenCv}>
              View CV
              <SquareArrowOutUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="/cv" target="_blank" rel="noreferrer" variant="secondary">
              Open CV page
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{profile.name} · English Teacher · Digital Marketing</p>
        <p>Available for remote opportunities</p>
      </div>
    </footer>
  )
}

function CvViewer({ onClose }) {
  return (
    <div className="min-h-screen bg-bg px-4 py-10 md:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-6 py-5 md:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">CV Viewer</p>
            <h1 className="mt-2 font-display text-3xl text-text md:text-4xl">{profile.name}</h1>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-border px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent">Close</button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="border-b border-border p-6 lg:border-b-0 lg:border-r md:p-8">
            <div className="rounded-2xl border border-border bg-[#111] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Summary</p>
              <p className="mt-3 text-sm leading-7 text-text/80">{profile.summary}</p>
            </div>
            <div className="mt-5 space-y-2 text-sm text-muted">
              <p className="inline-flex items-center gap-2"><MapPin size={15} /> {profile.location}</p>
              <p className="inline-flex items-center gap-2"><Phone size={15} /> {profile.phone}</p>
              <p className="inline-flex items-center gap-2"><Mail size={15} /> {profile.email}</p>
            </div>
            <div className="mt-5 rounded-2xl border border-border bg-[#111] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Languages</p>
              <p className="mt-3 text-sm text-text/80">{languages.join(' · ')}</p>
            </div>
          </aside>

          <main className="p-6 md:p-8">
            <div className="space-y-8">
              <section>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Experience</p>
                <div className="mt-4 space-y-4">
                  {experience.map((item) => (
                    <div key={item.role} className="rounded-xl border border-border bg-[#111] p-4">
                      <h3 className="font-display text-2xl text-text">{item.role}</h3>
                      <p className="text-sm text-muted">{item.company} · {item.period}</p>
                      <p className="mt-2 text-sm leading-7 text-text/80">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Education</p>
                <div className="mt-4 space-y-4">
                  {education.map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-[#111] p-4">
                      <h3 className="font-display text-xl text-text">{item.title}</h3>
                      <p className="text-sm text-muted">{item.institution}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-accent">{item.meta}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Certifications</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {certifications.map((item) => (
                    <span key={item} className="rounded-full border border-border px-3 py-1 text-xs text-text/80">{item}</span>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function HomePage({ onOpenCv }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero onOpenCv={onOpenCv} />
      <WorkSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection onOpenCv={onOpenCv} />
      <Footer />
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cvOpen, setCvOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = cvOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cvOpen])

  return (
    <>
      <ScrollProgressBar />
      <Header onOpenCv={() => setCvOpen(true)} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage onOpenCv={() => setCvOpen(true)} />} />
          <Route path="/cv" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><CvViewer onClose={() => navigate('/')} /></motion.div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {cvOpen ? (
          <motion.div className="fixed inset-0 z-[120] overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-lg md:px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 15, opacity: 0 }} transition={{ duration: 0.32, ease: 'easeOut' }} className="mx-auto max-w-5xl">
              <div className="mb-3 flex justify-end">
                <button type="button" onClick={() => setCvOpen(false)} className="rounded-full border border-border bg-bg px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent">Close CV</button>
              </div>
              <div className="max-h-[86vh] overflow-y-auto rounded-3xl border border-border">
                <CvViewer onClose={() => setCvOpen(false)} />
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

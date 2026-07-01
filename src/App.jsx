import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  SquareArrowOutUpRight,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { certifications, education, experience, expertise, highlights, languages, profile, projects, cv } from './data'

const heroPortraitSrc = '/hero-portrait.jpeg'
const heroFloralSrc = '/hero-floral.jpeg'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.25, ease: 'easeIn' } },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })
  return <motion.div className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left hero-gradient" style={{ scaleX }} />
}

function SectionFrame({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section-surface py-20 md:py-28 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.18, margin: '-80px' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <motion.div variants={itemVariants}>
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-accent">{eyebrow}</p>
            <h2 className="mt-3 font-display text-[36px] leading-[1.02] tracking-[-0.01em] text-text md:text-[52px]">{title}</h2>
          </motion.div>
          {subtitle ? <motion.p variants={itemVariants} className="max-w-xl text-[16px] leading-7 text-muted">{subtitle}</motion.p> : null}
        </div>
        {children}
      </div>
    </motion.section>
  )
}

function GlowButton({ children, variant = 'primary', className = '', ...props }) {
  const Component = props.href ? motion.a : motion.button
  const base =
    variant === 'primary'
      ? 'hero-gradient text-white shadow-[0_18px_40px_rgba(56,189,248,0.28)] hover:shadow-[0_22px_52px_rgba(14,165,233,0.34)]'
      : 'border border-slate-200 bg-white text-text hover:border-accent hover:text-accent shadow-[0_14px_30px_rgba(15,23,42,0.08)]'

  return (
    <Component
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${base} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
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
    { href: '#about', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-3xl font-semibold tracking-[-0.03em] text-accent">
          MG
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-[15px] font-medium text-slate-700 transition hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
          <GlowButton onClick={onOpenCv} className="px-5 py-2.5 text-[15px]">
            Let’s Connect <ArrowRight size={16} />
          </GlowButton>
        </nav>

        <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5">
              {links.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 transition hover:text-accent">
                  {link.label}
                </a>
              ))}
              <button type="button" onClick={onOpenCv} className="text-left text-sm font-semibold text-accent">
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
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 hero-noise" />
      <div className="absolute left-4 top-8 h-24 w-24 rounded-full bg-sky-300/20 blur-3xl md:left-16 md:top-12 md:h-40 md:w-40" />
      <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl md:right-20 md:h-52 md:w-52" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.08fr] lg:items-center">
          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p variants={itemVariants} className="font-mono text-[12px] uppercase tracking-[0.34em] text-accent">Hello, I’m</motion.p>
            <motion.h1 variants={itemVariants} className="mt-4 font-display text-[56px] leading-[0.92] tracking-[-0.02em] text-text md:text-[84px] lg:text-[90px]">
              Malaika Guljahan
            </motion.h1>
            {/* <motion.p variants={itemVariants} className="mt-5 text-[18px] font-semibold text-accent md:text-[20px]">
              
            </motion.p> */}
            <motion.p variants={itemVariants} className="mt-4 max-w-xl text-[17px] leading-8 text-muted md:text-[18px]">
              Curious minds create meaningful change. I'm Malaika Gul Jahan, an English linguistics graduate, researcher, and lifelong learner passionate about education, language, and innovation.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GlowButton href="#projects" className="px-6 py-3.5">
                View My Work <ArrowRight size={16} />
              </GlowButton>
              <GlowButton onClick={onOpenCv} variant="secondary" className="px-6 py-3.5">
                View CV <SquareArrowOutUpRight size={16} />
              </GlowButton>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Mail, href: `mailto:${profile.email}` },
                { icon: Phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
                { icon: MapPin, href: '#contact' },
                { icon: SquareArrowOutUpRight, href: '/cv' },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-accent shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="relative min-w-0">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(96,165,250,0.12),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(186,230,253,0.6),transparent_28%)] blur-2xl" />

            <div className="glass-panel relative overflow-hidden rounded-[2.6rem] bg-white p-4 md:p-5 lg:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(186,230,253,0.55),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(56,189,248,0.16),transparent_20%),radial-gradient(circle_at_70%_88%,rgba(96,165,250,0.12),transparent_24%)]" />

              <div className="relative min-h-[620px]">
                <figure className="relative min-h-[620px] overflow-hidden rounded-[2.3rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(248,250,252,0.92))] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(186,230,253,0.34),transparent_30%)]" />
                  <div className="absolute inset-0">
                    <img
                      src={heroPortraitSrc}
                      alt="Portrait of Malaika Guljahan"
                      className="block h-full w-full object-cover object-center"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
// about section
function AboutSection() {
  return (
    <SectionFrame>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <motion.div variants={itemVariants} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <img
            src={heroFloralSrc}
            alt="Blue watercolor floral background"
            className="block h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">About Me</p>
            <h3 className="mt-3 font-display text-[34px] leading-[1.05] text-text md:text-[42px]">Malaika Guljahan</h3>
          </div>
          {/* <p className="max-w-xl text-[16px] leading-8 text-slate-700">{profile.summary}</p> */}
          <p className="max-w-xl text-[16px] leading-8 text-slate-700">
           I Malaika Gul, an English Linguistics graduate, researcher, and lifelong learner passionate about language, education, and innovation. My interests lie at the intersection of linguistics, artificial intelligence, and educational technology, where I explore how research and digital solutions can enhance learning. Through research, teaching projects, digital marketing, and continuous professional development, I have built strong skills in communication, critical thinking, and problem-solving. This portfolio reflects my journey, achievements, and commitment to making a meaningful impact through education and research.
          </p>
          <div className="flex flex-wrap gap-3">
            {languages.map((language) => (
              <span key={language} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                {language}
              </span>
            ))}
          </div>
          <GlowButton href="#contact" variant="secondary" className="px-5 py-2.5">
            More About Me <ArrowRight size={16} />
          </GlowButton>
        </motion.div>
      </div>
    </SectionFrame>
  )
}

function ServicesSection() {
  const iconMap = { book: BookOpen, search: Layers3, sparkles: Sparkles }

  return (
    <SectionFrame id="services" eyebrow="What I Do" title="My Services" subtitle="Personalized English Coaching
Academic Research & Literature Review
Lesson Plan & Teaching Material Design
SEO & Digital Marketing" className="bg-white">
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.2, margin: '-80px' }} className="grid gap-5 md:grid-cols-3">
        {expertise.map((group) => {
          const Icon = iconMap[group.icon]
          return (
            <motion.article key={group.title} variants={itemVariants} whileHover={{ y: -8 }} className="group rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition hover:border-accent hover:shadow-[0_20px_45px_rgba(56,189,248,0.18)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full hero-gradient text-white shadow-[0_16px_30px_rgba(56,189,248,0.28)]">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-center font-display text-[28px] text-text">{group.title}</h3>
              <ul className="mt-4 space-y-3 text-center text-[15px] leading-7 text-muted">
                {group.items.slice(0, 4).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionFrame>
  )
}

function ProjectsSection() {
  return (
    <SectionFrame id="projects" eyebrow="Featured Work" title="My Recent Projects" subtitle="The Impact of Artificial Intelligence on English Language Learning (Self-Directed Research Project)
 Foundational Principles of Language Teaching (TESOL Video Presentation)
 ESL Lesson Plan & Teaching Materials (Lesson plans, worksheets, quizzes, and classroom activities)" className="bg-[#f8fafc]">
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.18, margin: '-80px' }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <motion.article key={project.title} variants={itemVariants} whileHover={{ y: -8 }} className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition hover:border-accent hover:shadow-[0_20px_46px_rgba(56,189,248,0.18)]">
            <div className="h-40 hero-gradient opacity-90" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{project.tag}</span>
                <ExternalLink size={16} className="text-accent opacity-70 transition group-hover:opacity-100" />
              </div>
              <h3 className="mt-5 font-display text-[28px] leading-[1.05] text-text">{project.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">{project.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionFrame>
  )
}

function SkillsExperienceSection() {
  return (
    <SectionFrame id="skills" eyebrow="Professional Depth" title="Skills & Experience" subtitle="The structure stays calm and premium while still showing the teaching and marketing depth behind the portfolio." className="bg-white">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={itemVariants} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full hero-gradient text-white shadow-[0_16px_32px_rgba(56,189,248,0.28)]">
              <Layers3 size={20} />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Expertise</p>
              <p className="mt-1 font-display text-[30px] text-text">Core Skills</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {expertise.flatMap((group) => group.items).map((skill) => (
              <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[14px] text-slate-600 transition hover:border-accent hover:bg-sky-50 hover:text-accent">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Certifications</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {certifications.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          {experience.map((entry) => (
            <article key={entry.role} className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_46px_rgba(56,189,248,0.18)] md:p-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-[30px] leading-[1.05] text-text">{entry.role}</h3>
                  <p className="mt-1 text-[15px] text-muted">{entry.company}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                  <Briefcase size={14} />
                  {entry.period}
                </span>
              </div>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">{entry.summary}</p>
            </article>
          ))}

          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-accent">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="font-display text-[22px] text-text">{item.title}</p>
                    <p className="text-[14px] text-muted">{item.institution}</p>
                  </div>
                </div>
                <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-accent">{item.meta}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  )
}

function ContactSection({ onOpenCv }) {
  return (
    <SectionFrame id="contact" eyebrow="Let’s Connect" title="Open to collaborations and teaching opportunities" subtitle="If you’re looking for a polished, student-friendly portfolio experience, this is the best place to start." className="bg-[#f8fafc]">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={itemVariants} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_34px_rgba(15,23,42,0.08)] md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Get in touch</p>
          <div className="mt-5 space-y-4">
            <a href={`mailto:${profile.email}`} className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-accent hover:bg-sky-50 hover:text-accent">
              <span className="inline-flex items-center gap-3 text-[15px] text-slate-700"><Mail size={18} /> {profile.email}</span>
              <ArrowRight size={16} />
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-accent hover:bg-sky-50 hover:text-accent">
              <span className="inline-flex items-center gap-3 text-[15px] text-slate-700"><Phone size={18} /> {profile.phone}</span>
              <ArrowRight size={16} />
            </a>
            <div className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 text-[15px] text-slate-700">
              <span className="inline-flex items-center gap-3"><MapPin size={18} /> {profile.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-[2rem] hero-gradient p-[1px] shadow-[0_16px_34px_rgba(56,189,248,0.22)]">
          <div className="rounded-[calc(2rem-1px)] bg-white p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">CV Viewer</p>
            <p className="mt-4 text-[17px] leading-8 text-slate-700">The CV opens in a polished browser viewer with no download button, keeping the experience clean and professional.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <GlowButton onClick={onOpenCv}>View CV <SquareArrowOutUpRight size={16} /></GlowButton>
              <GlowButton href="/cv" target="_blank" rel="noreferrer" variant="secondary">Open CV page <ExternalLink size={16} /></GlowButton>
            </div>
            <div className="mt-8 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(56,189,248,0.12),rgba(186,230,253,0.45))] p-5">
              <p className="font-display text-[28px] text-text">Available for opportunities</p>
              <p className="mt-2 text-[15px] leading-7 text-slate-600">English teaching, educational content, tutoring, SEO, and digital support.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionFrame>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>{profile.name} · English Teacher · Digital Marketing</p>
        <p>Built By FADI</p>
      </div>
    </footer>
  )
}

function CvViewer({ onClose }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-10 md:px-6">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 md:px-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">CV Viewer</p>
            <h1 className="mt-2 font-display text-[30px] text-text md:text-[42px]">{profile.name}</h1>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent">
            Close
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
          <section className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r md:p-8">
            <div className="text-center">
              <p className="font-display text-[26px] tracking-[0.06em] text-slate-600">SUMMARY</p>
              <div className="mx-auto mt-3 h-px w-40 bg-slate-400" />
            </div>
            <p className="mt-6 text-[14px] leading-6 text-slate-700">{cv.summary}</p>

            <div className="mt-8">
              <p className="font-display text-[20px] tracking-[0.08em] text-slate-600">EDUCATION</p>
              <div className="mt-2 h-px w-36 bg-slate-400" />

              <div className="mt-5 space-y-5 text-[13px] leading-6 text-slate-700">
                {cv.education.map((group) => (
                  <div key={group.heading}>
                    <p className="font-semibold text-slate-700">{group.heading}</p>
                    <div className="mt-2 space-y-3">
                      {group.items.map((item) => (
                        <div key={item.title}>
                          <p className="font-semibold text-slate-700">{item.title}</p>
                          <p className="text-slate-600">{item.subtitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="font-display text-[20px] tracking-[0.08em] text-slate-600">SKILLS</p>
              <div className="mt-2 h-px w-24 bg-slate-400" />
              <ul className="mt-5 list-disc space-y-1 pl-5 text-[13px] leading-5 text-slate-700">
                {cv.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="font-display text-[20px] tracking-[0.08em] text-slate-600">CERTIFICATIONS</p>
              <div className="mt-2 h-px w-40 bg-slate-400" />
              <ul className="mt-5 list-disc space-y-1 pl-5 text-[13px] leading-5 text-slate-700">
                {cv.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="font-display text-[20px] tracking-[0.08em] text-slate-600">LANGUAGES</p>
              <div className="mt-2 h-px w-36 bg-slate-400" />
              <p className="mt-4 text-[13px] tracking-[0.2em] text-slate-700">{cv.languages.join(' | ')}</p>
            </div>
          </section>

          <section className="p-6 md:p-8">
            <p className="font-display text-[20px] tracking-[0.08em] text-slate-600">WORK EXPERIENCE</p>
            <div className="mt-2 h-px w-52 bg-slate-400" />

            <div className="mt-5 space-y-6 text-[13px] leading-6 text-slate-700">
              {cv.workExperience.map((item) => (
                <div key={item.title}>
                  <p className="font-semibold text-slate-700">{item.title}</p>
                  <p className="text-slate-600">{item.subtitle}</p>
                  {item.role ? <p className="mt-1 text-slate-600">{item.role}</p> : null}
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-display text-[20px] tracking-[0.08em] text-slate-600">PROJECTS</p>
              <div className="mt-2 h-px w-28 bg-slate-400" />
              <div className="mt-5 space-y-4 text-[13px] leading-6 text-slate-700">
                {cv.projects.map((item) => (
                  <div key={item.title}>
                    <p className="font-semibold text-slate-700">• {item.title}</p>
                    <p className="pl-4 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5 text-[13px] text-slate-700">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-semibold uppercase tracking-[0.08em] text-slate-600">PORTFOLIO (CLICK OR SCAN)</p>
                  <p className="mt-1">View Documents Portfolio or Scan QR Code</p>
                </div>
                <figure className="shrink-0 rounded-[0.9rem] border border-slate-200 bg-white p-2 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                  <img
                    src="/portfolio-qr.svg"
                    alt="QR code linking to the portfolio"
                    className="block h-[110px] w-[110px] object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </figure>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function HomePage({ onOpenCv }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero onOpenCv={onOpenCv} />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <SkillsExperienceSection />
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
          <motion.div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/75 px-4 py-8 backdrop-blur-xl md:px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="mx-auto max-w-5xl">
              <div className="mb-3 flex justify-end">
                <button type="button" onClick={() => setCvOpen(false)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent">
                  Close CV
                </button>
              </div>
              <CvViewer onClose={() => setCvOpen(false)} />
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

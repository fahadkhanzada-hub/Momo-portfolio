---
name: portfolio-frontend
description: Build portfolio website components and pages using React, Framer Motion,
and Tailwind CSS. Use this skill when building or editing any part of the personal
portfolio site — hero sections, project cards, nav, contact forms, animations,
or page transitions. Optimized for remote job hunting in the US market.
---

## Stack
- React 18 + Vite
- Framer Motion 11 (animations, page transitions, scroll effects)
- Tailwind CSS (utility styling)
- React Router v6 (routing)
- Google Fonts: Syne, DM Sans, JetBrains Mono
- **lucide-react** — icon library (tree-shakeable, consistent stroke style)

---

## Icons

### Library
Always use **`lucide-react`** for icons. Never use inline SVGs for any icon that
lucide covers. Install once: `npm install lucide-react`.

```jsx
// Named imports only — tree-shaking ensures bundle stays small
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Download } from 'lucide-react'
```

### Icon Sizing Convention
| Context | Size class | px equiv |
|---|---|---|
| Nav / inline text | `size-4` | 16px |
| Button / tag | `size-4` or `size-5` | 16–20px |
| Section label / callout | `size-5` | 20px |
| Social links (contact) | `size-5` | 20px |
| Hero decorative | `size-6` | 24px |

Always pass `size` prop or use `className="w-4 h-4"` — never rely on default size.

### Icons Per Section

#### Navbar
```jsx
import { Menu, X } from 'lucide-react'
// Mobile hamburger toggle — Menu open, X close
```

#### Hero
```jsx
import { ArrowDown, Download, ArrowRight, MapPin } from 'lucide-react'
// ArrowDown   → scroll indicator
// Download    → "Download Resume" button
// ArrowRight  → "View Work" CTA
// MapPin      → location / timezone badge (optional)
```

#### Projects
```jsx
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
// Github       → GitHub repo link on each card
// ExternalLink → Live site link on each card
// ArrowUpRight → alternative for live link (more directional)
```

#### Skills / Tech Stack
```jsx
import { Layers, Code2, Database, Globe } from 'lucide-react'
// Layers   → Backend callout card label
// Code2    → Frontend callout card label
// Database → MySQL / database pill label
// Globe    → headless / web card
```

#### Experience / Timeline
```jsx
import { Briefcase, MapPin, Calendar } from 'lucide-react'
// Briefcase → role / company label
// MapPin    → location tag
// Calendar  → date range tag
```

#### Contact
```jsx
import { Mail, Github, Linkedin, Send } from 'lucide-react'
// Mail     → Email link card
// Github   → GitHub link card
// Linkedin → LinkedIn link card
// Send     → "Send me an email" CTA button
```

#### Footer
```jsx
import { Heart, Code } from 'lucide-react'
// optional decorative usage in "Built with ♥ + React" line
```

### Icon Hover Animations
All icon-bearing interactive elements must animate the icon on hover:

```jsx
// Rotate + scale on social icons (spring physics)
<motion.a whileHover={{ scale: 1.2, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
  <Github size={20} />
</motion.a>

// Arrow slides right on CTA buttons
<motion.span
  className="inline-flex items-center gap-2"
  whileHover="hover"
>
  View Work
  <motion.span variants={{ hover: { x: 4 } }} transition={{ duration: 0.2 }}>
    <ArrowRight size={16} />
  </motion.span>
</motion.span>

// External link icon appears on card hover (opacity 0 → 1)
<motion.span
  initial={{ opacity: 0, x: -4 }}
  whileHover={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.2 }}
>
  <ExternalLink size={14} />
</motion.span>
```

### Do / Don't
- ✅ Use lucide icons for all UI chrome (buttons, links, labels, social)
- ✅ Animate icons with Framer Motion — never static
- ✅ Match stroke color to parent text color via `currentColor`
- ✅ Use `strokeWidth={1.5}` for a refined, editorial feel on larger icons
- ❌ Do NOT use `react-icons` — inconsistent stroke styles
- ❌ Do NOT use inline `<svg>` when a lucide icon exists
- ❌ Do NOT hardcode icon colors — always inherit via `currentColor`

## Design System

### Aesthetic Direction
Dark, editorial, senior-engineer energy. Think Linear.app meets a creative agency.
Every section should feel CRAFTED — not generated. Generous whitespace, sharp
typographic contrast, and motion that rewards attention. The one unforgettable
detail: an electric lime accent (#e8ff47) used sparingly but boldly.

### Typography
- Display: `Syne` (weight 700–800) — for headings and hero name
- Body: `DM Sans` (weight 400–500) — clean, readable, professional
- Mono: `JetBrains Mono` — for tech tags, labels, code snippets, dates

Import in index.html:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Color Palette — CSS Variables (define in :root, index.css)
```css
:root {
  --bg:            #080808;
  --surface:       #0f0f0f;
  --surface-2:     #161616;
  --border:        #222222;
  --border-hover:  #333333;
  --text:          #f2f2f2;
  --muted:         #666666;
  --muted-2:       #444444;
  --accent:        #e8ff47;   /* electric lime — use sparingly, high impact */
  --accent-2:      #4fffff;   /* cyan — secondary highlights, links */
  --accent-subtle: #1a1f00;   /* lime tint for subtle backgrounds */
  --glass:         rgba(255, 255, 255, 0.03);
  --glass-border:  rgba(255, 255, 255, 0.06);
}
```

### Spacing Scale
Use Tailwind's default scale. Key rules:
- Section padding: `py-24 md:py-32`
- Container: `max-w-6xl mx-auto px-6`
- Card padding: `p-6 md:p-8`
- Gap between grid items: `gap-6`

---

## Animation Rules — MANDATORY

**These are NOT optional. Every component MUST implement ALL applicable animations.**
When in doubt, animate. The goal is a site that feels alive at every scroll position.

### 1. Scroll-Triggered Section Entrance
Every section entering the viewport MUST use scroll-triggered reveal.
Use this exact pattern for all top-level section wrappers:

```jsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function AnimatedSection({ children, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
```

### 2. Staggered Children — ALL Lists and Grids
Project cards, skill tags, nav links, experience items, social links —
EVERY list or grid must use staggered entrance. No exceptions.

```jsx
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
}

// Usage
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-80px" }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* card content */}
    </motion.div>
  ))}
</motion.div>
```

### 3. Hero — Cinematic Layered Entrance
The hero is the first impression. Build it with multiple staggered layers:

```jsx
// Layer 1 (delay 0s):    "Available for remote" badge fades in
// Layer 2 (delay 0.2s):  Name slides up from y:60, large Syne font
// Layer 3 (delay 0.5s):  Role/tagline fades up
// Layer 4 (delay 0.7s):  Description paragraph fades in
// Layer 5 (delay 0.9s):  CTA buttons slide up with spring physics
// Layer 6 (delay 1.1s):  Scroll indicator pulses in

// Name: split into individual characters, each animating with stagger 0.03s
// CTA buttons use spring: { type: 'spring', stiffness: 120, damping: 18 }

const heroVariants = {
  hidden: { opacity: 0, y: 60 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  })
}
```

### 4. Hover States — ALL Interactive Elements
Every card, button, tag, link, and icon MUST respond to hover. No static elements.

```jsx
// Project cards
whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
// + CSS: box-shadow transition to accent glow on hover

// Primary buttons
whileHover={{ scale: 1.04 }}
whileTap={{ scale: 0.96 }}
// + background fill animation via CSS transition

// Secondary / ghost buttons
whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
whileTap={{ scale: 0.97 }}

// Tech stack tags
whileHover={{ backgroundColor: 'var(--accent)', color: '#000', scale: 1.05 }}
transition={{ duration: 0.15 }}

// Nav links: animated underline using scaleX
// ::after pseudo-element: scaleX 0→1 on hover, transform-origin: left

// Social icons
whileHover={{ scale: 1.2, rotate: 8 }}
transition={{ type: 'spring', stiffness: 300, damping: 15 }}

// Experience / timeline rows
whileHover={{ x: 6, color: 'var(--text)' }}
```

### 5. Page Transitions (React Router v6)
Wrap ALL routes in AnimatePresence. Every page must fade/slide on entry and exit.

```jsx
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } }
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

// In App.jsx:
const location = useLocation()
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
    <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
  </Routes>
</AnimatePresence>
```

### 6. Scroll Progress Bar
Fixed top bar that fills as user scrolls. Always include on every page.

```jsx
import { useScroll, useSpring, motion } from 'framer-motion'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
      style={{ scaleX, transformOrigin: '0%', backgroundColor: 'var(--accent)' }}
    />
  )
}
```

### 7. Magnetic Hover on CTA Buttons
Primary CTA buttons follow the cursor with a subtle magnetic pull effect.

```jsx
import { useMotionValue, useSpring, motion } from 'framer-motion'

function MagneticButton({ children, ...props }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.25)
    y.set((e.clientY - centerY) * 0.25)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
```

### 8. Number Counter Animation
For stats (years of experience, projects shipped, etc.):

```jsx
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

function AnimatedCounter({ from = 0, to, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionVal = useMotionValue(from)
  const spring = useSpring(motionVal, { duration: 2000 })
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (isInView) motionVal.set(to)
  }, [isInView])

  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring])

  return <span ref={ref}>{display}{suffix}</span>
}

// Usage: <AnimatedCounter to={10} suffix="+" /> → animates 0 → 10+
```

---

## Visual Requirements — MANDATORY

**Every section needs a visual treatment. Plain dark backgrounds are NOT acceptable.**

### Hero Section
```css
/* Animated gradient mesh — 3 color orbs drifting slowly */
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.hero-bg::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(232,255,71,0.12) 0%, transparent 70%);
  top: -100px; left: -100px;
  animation: drift1 12s ease-in-out infinite alternate;
}

.hero-bg::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(79,255,255,0.08) 0%, transparent 70%);
  bottom: -100px; right: -100px;
  animation: drift2 15s ease-in-out infinite alternate;
}

@keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(80px, 60px) scale(1.1); } }
@keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-60px, -80px) scale(1.15); } }

/* Subtle grid lines */
.hero-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Noise texture overlay */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.4;
}
```

### About / Skills Section
```
REQUIRED visuals:
✓ Infinite horizontal marquee of tech logos (CSS animation, pause on hover)
✓ Skill proficiency bars — width animates from 0 to % on scroll trigger
✓ Stats row: "10+ Years", "50+ Projects", "30+ Clients" with AnimatedCounter
✓ Subtle dot-grid background pattern on the section
✓ Profile image: grayscale → color on hover, with accent border ring
```

Marquee CSS:
```css
.marquee-track {
  display: flex;
  gap: 3rem;
  animation: marquee 25s linear infinite;
  width: max-content;
}
.marquee-track:hover { animation-play-state: paused; }
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

### Projects Section
```
REQUIRED visuals per card:
✓ Glassmorphism surface:
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.06);
✓ Hover: accent-colored glow
  box-shadow: 0 0 0 1px var(--accent), 0 20px 60px rgba(232,255,71,0.08);
✓ Project thumbnail: scale(1.05) on hover, overflow hidden, 0.4s ease
✓ Tech tags: each tag stagger-animates in on card entrance
✓ Numbered project index in large muted Syne font (01, 02, 03...)
  positioned top-right of card, opacity 0.06, font-size 5rem
✓ Live/GitHub link icons animate with arrow direction on hover
```

### Experience / Timeline Section
```
REQUIRED visuals:
✓ Vertical connecting line draws itself on scroll:
  Use motion.div with height animating from 0 to 100% via useInView
  Color: linear-gradient from var(--accent) to var(--border)
✓ Timeline nodes: pulsing ring animation when entering view
  @keyframes pulse-ring: scale 1→1.5, opacity 1→0, repeat
✓ Company name: gradient text on hover (accent to cyan)
✓ Date range: JetBrains Mono, var(--muted) color
✓ Each experience entry slides in alternating left/right on desktop
```

Timeline line animation:
```jsx
const timelineRef = useRef(null)
const isInView = useInView(timelineRef, { once: true })

<div className="relative">
  <motion.div
    ref={timelineRef}
    className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-[var(--accent)] to-[var(--border)]"
    initial={{ height: 0 }}
    animate={isInView ? { height: '100%' } : {}}
    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
  />
  {/* experience items */}
</div>
```

### Contact / Footer Section
```
REQUIRED visuals:
✓ Large display heading "Let's Work Together" — Syne 800, 5–7rem
  Each word animates in with stagger (word-by-word, not char-by-char)
✓ Email address: gradient text (accent → cyan), underline draw on hover
✓ "Open to Remote · US Timezone Friendly" badge with pulsing green dot
✓ Social icons row: scale + rotate spring on hover
✓ Background: subtle radial accent glow at very low opacity (0.05)
✓ Footer bottom: thin border-top, copyright left, "Built with React + Framer Motion" right
```

Pulsing availability dot:
```css
.available-dot {
  width: 8px; height: 8px;
  background: #22c55e;
  border-radius: 50%;
  position: relative;
}
.available-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: #22c55e;
  opacity: 0.4;
  animation: ping 1.5s ease-out infinite;
}
@keyframes ping {
  0%   { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(2.2); opacity: 0; }
}
```

---

## Portfolio Sections Checklist

When building the full site, ALL of these must be present and visually complete:

- [ ] **Navbar** — fixed, blur backdrop, scroll-aware opacity, mobile hamburger with AnimatePresence
- [ ] **Hero** — animated background, cinematic text entrance, magnetic CTA buttons, scroll indicator
- [ ] **About** — profile image, bio, stats counters, tech marquee
- [ ] **Skills** — animated proficiency bars, tech tags with stagger
- [ ] **Projects** — glassmorphism cards, hover glow, numbered index
- [ ] **Experience** — self-drawing timeline, alternating layout
- [ ] **Contact** — large heading, availability badge, social links
- [ ] **ScrollProgressBar** — fixed top, always present
- [ ] **Custom cursor** — optional but recommended (larger dot + ring, accent color)


## Component Conventions
- ALL animated elements use `motion.*` — never plain `div` for key UI elements
- `useInView` with `margin: "-100px"` for all scroll triggers
- `AnimatePresence` wraps any conditionally rendered or route-changed UI
- CSS variables for ALL colors — zero hardcoded hex in JSX/TSX
- Mobile-first responsive — animations must work on mobile too
- Always respect reduced motion:

```jsx
import { useReducedMotion } from 'framer-motion'

function SafeMotion({ children, animationProps, ...rest }) {
  const prefersReduced = useReducedMotion()
  const props = prefersReduced
    ? { initial: false }
    : animationProps
  return <motion.div {...props} {...rest}>{children}</motion.div>
}
```

---

## Prompt Patterns for Full Visual Rebuild

When asked to "rebuild", "enhance visuals", "add animations", or "make it premium",
the agent MUST perform this full audit in order:

1. Add scroll-triggered reveal to every section not yet animated
2. Add stagger to every list, grid, and tag collection
3. Add hover states to every interactive element
4. Add background visual treatment to every plain section
5. Implement ScrollProgressBar if not present
6. Wire up AnimatePresence for page transitions
7. Add the animated timeline line to Experience
8. Add the tech marquee to About/Skills
9. Add glassmorphism + glow to project cards
10. Add the availability pulsing dot to Contact
11. Add AnimatedCounter to all stat numbers
12. Final pass: check every section has non-plain background
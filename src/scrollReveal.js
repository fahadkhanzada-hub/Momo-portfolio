let revealObserver = null
let domObserver = null
let animationFrameId = null

function ensureRevealClasses() {
  const root = document.getElementById('root')
  if (!root) return []

  const targets = root.querySelectorAll('h1, h2, h3, p, li, .reveal-target')
  targets.forEach((el) => {
    el.classList.add('reveal', 'animate__animated', 'animate__fadeInUp')
  })

  return Array.from(root.querySelectorAll('.reveal'))
}

function resetRevealClasses(element) {
  element.classList.remove('is-visible', 'animate__animated', 'animate__fadeInUp')
  void element.offsetWidth
  element.classList.add('animate__animated', 'animate__fadeInUp')
}

export function initScrollReveal() {
  const elements = ensureRevealClasses()
  if (!elements.length) return

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target
          if (entry.isIntersecting) {
            resetRevealClasses(element)
            element.classList.add('is-visible')
          } else {
            element.classList.remove('is-visible', 'animate__animated', 'animate__fadeInUp')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
  }

  elements.forEach((el) => {
    revealObserver.observe(el)
  })

  if (!domObserver) {
    const root = document.getElementById('root')
    if (!root) return

    domObserver = new MutationObserver(() => {
      const newElements = ensureRevealClasses()
      newElements.forEach((el) => revealObserver.observe(el))
    })

    domObserver.observe(root, { childList: true, subtree: true })
  }
}

class PortfolioLoader {
  constructor() {
    this.counterEl = document.getElementById('loader-counter')
    this.fillEl = document.getElementById('loader-fill')
    this.overlayEl = document.getElementById('loader')
    this.progress = 0
    this.shown = 0
    this.pageLoaded = document.readyState === 'complete'

    window.addEventListener('load', () => {
      this.pageLoaded = true
    })

    this.tick = this.tick.bind(this)
    animationFrameId = window.requestAnimationFrame(this.tick)
  }

  tick() {
    if (!this.overlayEl || !this.counterEl || !this.fillEl) return

    const cap = this.pageLoaded ? 100 : 92
    if (this.progress < cap) {
      const remaining = cap - this.progress
      const step = Math.max(0.2, remaining * 0.05) * (0.6 + Math.random() * 0.7)
      this.progress = Math.min(this.progress + step, cap)
    }

    this.shown += (this.progress - this.shown) * 0.18
    const display = Math.min(100, Math.round(this.shown))

    this.counterEl.textContent = String(display)
    this.fillEl.style.width = `${Math.min(100, this.shown)}%`

    if (display >= 100 && this.pageLoaded) {
      this.finish()
      return
    }

    animationFrameId = window.requestAnimationFrame(this.tick)
  }

  finish() {
    window.setTimeout(() => {
      this.overlayEl.classList.add('loader-hidden')
      document.body.classList.add('is-loaded')
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }, 350)
  }
}

export function initLoader() {
  document.addEventListener('DOMContentLoaded', () => new PortfolioLoader(), { once: true })
}

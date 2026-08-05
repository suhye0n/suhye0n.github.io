import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { navItems, profile } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { shatterGlass } from '@/lib/sceneEvents'

const SECTION_IDS = navItems.map((item) => item.id)

const TAP_WINDOW = 700
const TAPS_TO_SHATTER = 5

export default function Header() {
  const active = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const taps = useRef(0)
  const lastTap = useRef(0)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, (value) => `${value * 100}%`)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mql.matches && setMenuOpen(false)

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const onLogoClick = () => {
    const now = performance.now()

    taps.current = now - lastTap.current < TAP_WINDOW ? taps.current + 1 : 1
    lastTap.current = now

    if (taps.current >= TAPS_TO_SHATTER) {
      taps.current = 0
      shatterGlass()
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/8 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#hero" onClick={onLogoClick} className="group flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping bg-white/70" />
              <span className="relative inline-flex size-2 bg-white" />
            </span>
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-white uppercase">
              {profile.nameEn}
            </span>
          </a>

          <nav aria-label="주요 섹션" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors ${
                  active === item.id ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 border border-white/25 bg-white/8"
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="flex size-10 items-center justify-center border border-white/14 text-white/75 transition hover:border-white/50 hover:text-white lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
            >
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>

        <motion.div
          style={{ width: progressWidth }}
          className="h-px bg-linear-to-r from-white/30 via-white to-white/30"
        />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="모바일 메뉴"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/8 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-6 py-4">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between border-b border-white/6 py-3.5 font-display text-lg tracking-tight transition-colors ${
                      active === item.id ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-white/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { navItems, profile } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useTheme } from '@/hooks/useTheme'
import { shatterGlass } from '@/lib/sceneEvents'

const SECTION_IDS = navItems.map((item) => item.id)

const TAP_WINDOW = 700
const TAPS_TO_SHATTER = 5

export default function Header() {
  const active = useActiveSection(SECTION_IDS)
  const { theme, toggleTheme } = useTheme()
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
      <div className="border-b border-fg/8 bg-surface/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#hero" onClick={onLogoClick} className="group flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping bg-fg/70" />
              <span className="relative inline-flex size-2 bg-fg" />
            </span>
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-fg uppercase">
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
                  active === item.id ? 'text-fg' : 'text-fg/40 hover:text-fg/80'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 border border-fg/25 bg-fg/8"
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
              className="flex size-10 items-center justify-center border border-fg/14 text-fg/75 transition hover:border-fg/50 hover:text-fg"
            >
              {theme === 'dark' ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              className="flex size-10 items-center justify-center border border-fg/14 text-fg/75 transition hover:border-fg/50 hover:text-fg lg:hidden"
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
        </div>

        <motion.div
          style={{ width: progressWidth }}
          className="h-px bg-linear-to-r from-fg/30 via-fg to-fg/30"
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
            className="border-b border-fg/8 bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-6 py-4">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between border-b border-fg/6 py-3.5 font-display text-lg tracking-tight transition-colors ${
                      active === item.id ? 'text-fg' : 'text-fg/60'
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-fg/25">
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

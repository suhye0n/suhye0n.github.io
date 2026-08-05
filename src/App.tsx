import { AnimatePresence, motion } from 'motion/react'
import { Suspense, lazy, useEffect, useState } from 'react'

import CursorGlow from '@/components/CursorGlow'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Marquee from '@/components/Marquee'
import ScrollTop from '@/components/ScrollTop'
import { navItems } from '@/data/site'
import { useHandheld } from '@/hooks/useHandheld'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { useSectionHue } from '@/hooks/useSectionHue'
import { toggleFrenzy, useFrenzy } from '@/lib/sceneEvents'
import About from '@/sections/About'
import ActivitySection from '@/sections/Activity'
import Awards from '@/sections/Awards'
import CareerSection from '@/sections/Career'
import Contact from '@/sections/Contact'
import Education from '@/sections/Education'
import Hero from '@/sections/Hero'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'

const GlobalScene = lazy(() => import('@/three/GlobalScene'))
const Terminal = lazy(() => import('@/components/Terminal'))

const BAND = [
  'React',
  'Redux',
  'Next.js',
  'Vue.js',
  'Electron',
  'React Native',
  'Flutter',
  'Spring Boot',
  'NestJS',
  'Vert.x',
  'Kubernetes',
  'Docker',
]

const HUE_SECTIONS = ['hero', ...navItems.map((item) => item.id)]

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalLoaded, setTerminalLoaded] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const handheld = useHandheld()
  const frenzy = useFrenzy()

  useSectionHue(HUE_SECTIONS)
  useKonamiCode(toggleFrenzy)

  useEffect(() => {
    if (handheld) return

    if (typeof window.requestIdleCallback !== 'function') {
      const timer = window.setTimeout(() => setSceneReady(true), 300)
      return () => window.clearTimeout(timer)
    }

    const handle = window.requestIdleCallback(() => setSceneReady(true), { timeout: 2000 })
    return () => window.cancelIdleCallback(handle)
  }, [handheld])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'k' || !(event.ctrlKey || event.metaKey)) return

      event.preventDefault()
      setTerminalLoaded(true)
      setTerminalOpen((open) => !open)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <div aria-hidden className="studio-veil pointer-events-none fixed inset-0 -z-20" />

      {sceneReady && !handheld && (
        <Suspense fallback={null}>
          <GlobalScene />
        </Suspense>
      )}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-ink-950/0 via-ink-950/78 to-ink-950/92"
      />

      <div className="grain relative flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-white focus:px-5 focus:py-2.5 focus:text-ink-950"
        >
          본문으로 건너뛰기
        </a>

        <CursorGlow />
        <Header />

        <main id="main" className="flex-1">
          <Hero />

          <div className="relative border-y border-white/8 bg-ink-950/55 py-6 backdrop-blur-sm">
            <span aria-hidden className="sheen" />
            <Marquee items={BAND} duration={45} />
          </div>

          <About />
          <Skills />
          <CareerSection />
          <Projects />
          <Awards />
          <Education />
          <ActivitySection />
          <Contact />
        </main>

        <Footer />
      </div>

      <ScrollTop />

      {terminalLoaded && (
        <Suspense fallback={null}>
          <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
        </Suspense>
      )}

      <AnimatePresence>
        {frenzy && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-6 z-80 border border-white/25 bg-ink-950/70 px-3 py-2 font-mono text-[10px] tracking-[0.25em] text-white uppercase backdrop-blur-xl"
          >
            Frenzy — ↑↑↓↓←→←→BA 로 해제
          </motion.p>
        )}
      </AnimatePresence>
    </>
  )
}

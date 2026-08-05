import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const dashOffset = useTransform(scrollYProgress, (value) => 1 - value)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="맨 위로"
          initial={{ opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          className="group fixed right-6 bottom-6 z-80 flex size-13 items-center justify-center border border-white/15 bg-ink-950/70 text-white/60 backdrop-blur-xl transition-colors hover:border-white/45 hover:text-white"
        >
          <svg
            aria-hidden
            viewBox="0 0 52 52"
            className="pointer-events-none absolute inset-0 size-full"
            fill="none"
          >
            <motion.rect
              x="0.5"
              y="0.5"
              width="51"
              height="51"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray={1}
              style={{ strokeDashoffset: dashOffset }}
              className="text-white/80"
            />
          </svg>

          <svg
            viewBox="0 0 24 24"
            className="relative size-4.5 transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

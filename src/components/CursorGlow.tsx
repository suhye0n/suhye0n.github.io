import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function CursorGlow() {
  const reducedMotion = useReducedMotion()
  const [hot, setHot] = useState(false)

  const [pointerFine] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const enabled = pointerFine && !reducedMotion

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 })
  const glowX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.8 })
  const glowY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.8 })

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)

      const target = event.target as Element | null
      setHot(Boolean(target?.closest('a, button, [role="button"]')))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-90">
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -top-48 -left-48 size-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_62%)] mix-blend-difference"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hot ? 2.2 : 1, opacity: hot ? 0.95 : 0.5, rotate: hot ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className="absolute -top-3.5 -left-3.5 size-7 border border-white/75 mix-blend-difference"
      />
      <motion.div
        style={{ x, y }}
        className="absolute -top-0.5 -left-0.5 size-1 bg-white mix-blend-difference"
      />
    </div>
  )
}

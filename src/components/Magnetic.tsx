import { motion, useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

export default function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const reducedMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-flex ${className ?? ''}`}
    >
      {children}
    </motion.span>
  )
}

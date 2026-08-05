import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

type TiltCardProps = {
  children: ReactNode
  className?: string
  amount?: number
}

export default function TiltCard({ children, className = '', amount = 7 }: TiltCardProps) {
  const reducedMotion = useReducedMotion()

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(167,139,250,0.16), transparent 60%)`

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    rotateY.set((px - 0.5) * amount * 2)
    rotateX.set((0.5 - py) * amount * 2)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ backgroundImage: glare }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  )
}

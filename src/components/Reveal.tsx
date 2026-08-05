import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

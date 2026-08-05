import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#'

type ScrambleTextProps = {
  text: string
  className?: string
  stagger?: number
}

export default function ScrambleText({ text, className, stagger = 2 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reducedMotion = useReducedMotion()
  const [output, setOutput] = useState('')

  useEffect(() => {
    if (!inView || reducedMotion) return

    let frame = 0
    let raf = 0

    const tick = () => {
      const chars = text.split('').map((char, index) => {
        if (char === ' ') return ' '

        const start = index * stagger
        if (frame < start) return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        if (frame < start + 8) return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        return char
      })

      setOutput(chars.join(''))
      frame += 1

      if (frame < text.length * stagger + 10) raf = requestAnimationFrame(tick)
      else setOutput(text)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text, stagger, reducedMotion])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{reducedMotion ? text : output || text.replace(/\S/g, ' ')}</span>
    </span>
  )
}

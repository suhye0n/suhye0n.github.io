import type { ReactNode } from 'react'

import Reveal from '@/components/Reveal'
import ScrambleText from '@/components/ScrambleText'
import { cn } from '@/lib/cn'

type SectionProps = {
  id: string
  index: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export default function Section({
  id,
  index,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative scroll-mt-24 overflow-hidden py-24 sm:py-32', className)}
    >
      <span
        aria-hidden
        className="text-ghost pointer-events-none absolute -top-8 right-2 font-display text-[8rem] leading-none font-bold tracking-tighter select-none sm:right-10 sm:text-[15rem]"
      >
        {index}
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="border border-white/15 px-2 py-1 font-mono text-[10px] tracking-[0.3em] text-white/80">
              {index}
            </span>
            <span className="hairline w-16" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
              {id}
            </span>
          </div>

          <h2
            id={`${id}-heading`}
            className="mt-6 pb-1 font-display text-4xl leading-[1.2] font-bold tracking-[-0.03em] sm:text-5xl"
          >
            <ScrambleText text={title} className="text-gradient" />
          </h2>

          {description && (
            <p className="mt-4 max-w-2xl leading-relaxed text-white/55">{description}</p>
          )}
        </Reveal>

        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}

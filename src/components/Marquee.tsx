import { cn } from '@/lib/cn'

type MarqueeProps = {
  items: readonly string[]
  duration?: number
  reverse?: boolean
  className?: string
}

export default function Marquee({ items, duration = 40, reverse, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
          style={{
            animation: `marquee ${duration}s linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {items.map((item) => (
            <li key={item} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-2xl font-medium tracking-tight text-white/25 transition-colors duration-500 hover:text-white sm:text-3xl">
                {item}
              </span>
              <span aria-hidden className="h-3 w-px bg-white/25" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

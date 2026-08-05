import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

type CarouselProps = {
  images: string[]
  alt: string
  autoPlay?: boolean
  interval?: number
  fit?: 'cover' | 'contain'
  ratio?: string
}

const SWIPE_DISTANCE = 60
const SWIPE_VELOCITY = 400

export default function Carousel({
  images,
  alt,
  autoPlay = true,
  interval = 4500,
  fit = 'cover',
  ratio = 'aspect-16/10',
}: CarouselProps) {
  const reducedMotion = useReducedMotion()
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)

  const paginate = useCallback(
    (step: number) => {
      setState(([current]) => [(current + step + images.length) % images.length, step])
    },
    [images.length],
  )

  const playing = autoPlay && !paused && !reducedMotion && images.length > 1

  useEffect(() => {
    if (!playing) return

    const timer = setInterval(() => paginate(1), interval)
    return () => clearInterval(timer)
  }, [playing, interval, paginate, index])

  useEffect(() => {
    if (images.length < 2) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') paginate(-1)
      if (event.key === 'ArrowRight') paginate(1)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [paginate, images.length])

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={`relative overflow-hidden rounded-sm border border-white/10 bg-ink-900 ${ratio}`}
        style={{ perspective: 1400 }}
      >
        <motion.div
          key={`glow-${index}`}
          aria-hidden
          initial={{ opacity: 0.55 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(167,139,250,0.4),transparent_70%)]"
        />

        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${alt} 이미지 ${index + 1}`}
            loading="lazy"
            draggable={false}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction >= 0 ? '55%' : '-55%',
              scale: 0.9,
              rotateY: direction >= 0 ? 16 : -16,
              filter: 'blur(14px)',
            }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
            exit={{
              opacity: 0,
              x: direction >= 0 ? '-35%' : '35%',
              scale: 0.94,
              rotateY: direction >= 0 ? -12 : 12,
              filter: 'blur(10px)',
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) paginate(1)
              else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY)
                paginate(-1)
            }}
            className={`absolute inset-0 size-full cursor-grab active:cursor-grabbing ${
              fit === 'contain' ? 'bg-white object-contain' : 'object-cover'
            }`}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <CarouselButton side="left" onClick={() => paginate(-1)} />
            <CarouselButton side="right" onClick={() => paginate(1)} />

            <span className="absolute top-4 right-4 z-20 border border-white/12 bg-ink-950/60 px-3 py-1 font-mono text-[11px] text-white/70 backdrop-blur">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((image, dotIndex) =>
            dotIndex === index ? (
              <span
                key={image}
                aria-current="true"
                className="relative h-1.5 w-8 overflow-hidden bg-white/15"
              >
                <motion.span
                  key={`progress-${index}-${playing}`}
                  initial={{ width: playing ? '0%' : '100%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: playing ? interval / 1000 : 0, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-accent-400 to-aqua-400"
                />
              </span>
            ) : (
              <button
                key={image}
                type="button"
                aria-label={`${dotIndex + 1}번째 이미지 보기`}
                onClick={() => setState([dotIndex, dotIndex > index ? 1 : -1])}
                className="size-1.5 rounded-full bg-white/25 transition-all hover:scale-125 hover:bg-white/60"
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}

function CarouselButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const isLeft = side === 'left'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? '이전 이미지' : '다음 이미지'}
      className={`absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-ink-950/60 text-white/80 backdrop-blur transition hover:border-accent-400/70 hover:bg-ink-950/80 hover:text-white ${
        isLeft ? 'left-3' : 'right-3'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={isLeft ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  )
}

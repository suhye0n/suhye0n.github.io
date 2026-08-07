import { motion } from 'motion/react'

import Magnetic from '@/components/Magnetic'
import { profile, socials } from '@/data/site'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
}

const charRise = {
  hidden: { opacity: 0, y: '0.55em', rotateX: -70 },
  show: { opacity: 1, y: '0em', rotateX: 0 },
}

function SplitText({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              variants={charRise}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </>
  )
}

const SPEC = [
  { key: 'ROLE', value: profile.role },
  { key: 'BASE', value: 'Republic of Korea' },
  { key: 'FOCUS', value: 'Web · Server' },
]

export default function Hero() {
  const [firstName, lastName] = profile.nameEn.split(' ')

  return (
    <section id="hero" className="relative flex min-h-dvh items-center overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aurora top-[-18%] left-[8%] size-[42rem] animate-drift bg-fg/8" />
        <div className="aurora right-[-4%] bottom-[-16%] size-[34rem] animate-drift bg-fg/5 [animation-delay:-9s]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(90deg,rgb(var(--fg-rgb)/0.05)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,transparent,#000_35%,#000_70%,transparent)] [background-size:120px_100%] opacity-60"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent to-surface/70"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.03, delayChildren: 0.15 }}
          className="max-w-3xl"
          style={{ perspective: 900 }}
        >
          <motion.p
            variants={rise}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] text-fg/45 uppercase"
          >
            <span className="size-1.5 animate-pulse bg-fg" />
            {profile.role}
            <span className="hairline w-14" />
            <span className="text-fg/25">{profile.birth.slice(0, 4)}</span>
          </motion.p>

          <h1 className="mt-8 font-display text-[clamp(3.2rem,12vw,9rem)] leading-[0.86] font-bold tracking-[-0.04em]">
            <span className="text-gradient text-gradient-anim block pb-1">
              <SplitText text={firstName} />
            </span>
            <span
              aria-hidden
              className="text-ghost block pb-2 [-webkit-text-stroke:2px_rgb(var(--fg-rgb)/0.22)]"
            >
              <SplitText text={lastName} />
            </span>
            <span className="sr-only">{lastName}</span>
          </h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 max-w-xl border-l border-fg/15 pl-5 text-lg leading-relaxed text-fg/60 sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a href="#projects" className="btn btn-primary">
                <span aria-hidden className="sheen" />
                <span className="relative">Projects</span>
                <svg
                  viewBox="0 0 24 24"
                  className="relative size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>

            {socials.map((social) => (
              <Magnetic key={social.label} strength={0.25}>
                <a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  {social.label}
                </a>
              </Magnetic>
            ))}
          </motion.div>

          <motion.dl
            variants={rise}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid max-w-lg grid-cols-1 gap-px border border-fg/8 bg-fg/8 sm:grid-cols-3"
          >
            {SPEC.map((item) => (
              <div key={item.key} className="bg-surface/80 px-4 py-3">
                <dt className="font-mono text-[10px] tracking-[0.3em] text-fg/30">{item.key}</dt>
                <dd className="mt-1.5 text-sm text-fg/75">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        className="absolute top-1/2 right-6 hidden -translate-y-1/2 font-mono text-[10px] tracking-[0.5em] text-fg/20 uppercase [writing-mode:vertical-rl] xl:block"
      >
        Liquid Chrome — Portfolio
      </motion.span>

      <motion.a
        href="#about"
        aria-label="아래로 스크롤"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg/30 transition-colors hover:text-fg sm:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-fg/15">
          <motion.span
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-4 bg-linear-to-b from-transparent to-fg"
          />
        </span>
      </motion.a>
    </section>
  )
}

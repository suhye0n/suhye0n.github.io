import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import { archives, profile } from '@/data/site'

export default function Contact() {
  return (
    <Section id="contact" index="08" title="Contact">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-sm px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="aurora top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow bg-accent-500/25"
          />

          <p className="relative font-mono text-xs tracking-[0.3em] text-fg/40 uppercase">
            Let&rsquo;s work together
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="text-gradient relative mt-6 inline-block pb-1 font-display text-3xl leading-[1.3] font-semibold break-all transition-opacity hover:opacity-80 sm:text-5xl"
          >
            {profile.email}
          </a>

          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            {archives.map((archive) => (
              <a
                key={archive.href}
                href={archive.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                {archive.label}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

import LinkChip from '@/components/LinkChip'
import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import TiltCard from '@/components/TiltCard'
import { archives, profile } from '@/data/site'

const facts = [
  { label: 'Name', value: `${profile.name} (${profile.nameEn})`, wide: true },
  { label: 'Birth', value: profile.birth },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
]

export default function About() {
  return (
    <Section id="about" index="01" title="About me">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <Reveal>
          <TiltCard className="group mx-auto w-full max-w-xs" amount={9}>
            <div className="glass relative overflow-hidden rounded-sm p-3">
              <div
                aria-hidden
                className="absolute -inset-16 bg-[conic-gradient(from_0deg,rgba(167,139,250,0.35),rgba(34,211,238,0.25),transparent_60%)] opacity-60 blur-2xl"
              />
              <img
                src={profile.avatar}
                alt={`${profile.name} 프로필 사진`}
                loading="lazy"
                className="relative aspect-square w-full rounded-sm object-cover"
              />
            </div>
          </TiltCard>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <dl className="grid gap-px overflow-hidden rounded-sm border border-fg/8 bg-fg/5 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className={`bg-surface/70 p-5 ${fact.wide ? 'sm:col-span-2' : ''}`}
                >
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-accent-300/80 uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm text-fg/80">
                    {fact.href ? (
                      <a href={fact.href} className="transition-colors hover:text-accent-300">
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="mt-10 font-mono text-xs tracking-[0.25em] text-fg/40 uppercase">
              Archiving
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {archives.map((archive) => (
                <LinkChip key={archive.href} href={archive.href} label={archive.display} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

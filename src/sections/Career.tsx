import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import { careers } from '@/data/site'
import { resolveDuration } from '@/lib/career'

export default function CareerSection() {
  return (
    <Section
      id="career"
      index="03"
      title="Career"
      description="메신저 · 커머스 · SaaS 서비스를 프론트엔드부터 서버까지 맡아 개발하고 운영했습니다."
      className="bg-linear-to-b from-transparent via-accent-600/4 to-transparent"
    >
      <ol className="relative border-l border-white/10 pl-6 sm:pl-10">
        {careers.map((career, index) => (
          <li key={career.slug} className="relative pb-10 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-3 -left-[1.6rem] size-2.5 rounded-full ring-4 ring-ink-950 sm:-left-[2.6rem] ${
                career.current
                  ? 'animate-pulse-glow bg-linear-to-br from-accent-400 to-aqua-400'
                  : 'bg-white/25'
              }`}
            />

            <Reveal delay={index * 0.06}>
              <article className="glass glass-hover rounded-sm p-6 sm:p-7">
                <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {career.company}
                  </h3>
                  {career.location && (
                    <span className="text-sm text-white/35">{career.location}</span>
                  )}
                  {career.current && (
                    <span className="self-center border border-aqua-400/40 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-aqua-300">
                      재직중
                    </span>
                  )}
                </header>

                <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/45">
                  <span className="font-mono text-[11px] tracking-wider text-accent-300/85">
                    {career.period} · {resolveDuration(career)}
                  </span>
                  <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
                  {career.department}
                </p>

                <div className="hairline my-6" />

                <ul className="space-y-5">
                  {career.works.map((work) => (
                    <li key={work.title}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="font-medium text-white/90">{work.title}</h4>
                        {work.period && (
                          <span className="font-mono text-[11px] text-white/30">{work.period}</span>
                        )}
                      </div>

                      <ul className="mt-2.5 flex flex-wrap gap-1.5">
                        {work.stack.map((item) => (
                          <li key={item} className="chip text-[11px]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}

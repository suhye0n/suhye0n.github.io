import { useState } from 'react'

import Lightbox from '@/components/Lightbox'
import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import { educations, type Credential } from '@/data/site'

export default function Education() {
  const [viewing, setViewing] = useState<Credential | null>(null)

  return (
    <Section id="education" index="06" title="Education">
      <ol className="relative border-l border-fg/10 pl-6 sm:pl-10">
        {educations.map((education, index) => (
          <li key={education.slug} className="relative pb-8 last:pb-0">
            <span
              aria-hidden
              className="absolute top-2 -left-[1.6rem] size-2.5 rounded-full bg-linear-to-br from-accent-400 to-aqua-400 ring-4 ring-surface sm:-left-[2.6rem]"
            />

            <Reveal delay={index * 0.06}>
              <button
                type="button"
                onClick={() => setViewing(education)}
                aria-label={`${education.title} 수료증 보기`}
                className="glass glass-hover group flex w-full items-center gap-5 rounded-sm p-4 text-left"
              >
                <span className="hidden size-20 shrink-0 overflow-hidden rounded-sm bg-white sm:block">
                  <img
                    src={education.images[0]}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] tracking-wider text-accent-300/85">
                      {education.date}
                    </span>
                    {education.tag && (
                      <span className="border border-aqua-400/35 px-2 py-0.5 font-mono text-[10px] tracking-wider text-aqua-300 uppercase">
                        {education.tag}
                      </span>
                    )}
                  </span>

                  <span className="mt-1.5 block font-display text-lg font-semibold text-fg">
                    {education.title}
                  </span>

                  <span className="mt-0.5 block text-sm text-fg/45">
                    {education.note ?? education.organization}
                  </span>
                </span>

                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 text-fg/25 transition-colors group-hover:text-accent-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </button>
            </Reveal>
          </li>
        ))}
      </ol>

      <Lightbox
        images={viewing?.images ?? null}
        caption={viewing ? `${viewing.title} · ${viewing.organization}` : undefined}
        ratio="aspect-4/3"
        onClose={() => setViewing(null)}
      />
    </Section>
  )
}

import { useState } from 'react'

import ActivityDialog from '@/components/ActivityDialog'
import Lightbox from '@/components/Lightbox'
import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import TiltCard from '@/components/TiltCard'
import { activities, volunteer, type Activity } from '@/data/site'

export default function ActivitySection() {
  const [selected, setSelected] = useState<Activity | null>(null)
  const [volunteerOpen, setVolunteerOpen] = useState(false)

  return (
    <Section
      id="activity"
      index="07"
      title="Activity"
      description="동아리 운영과 교육 봉사 등 개발 밖에서 쌓은 경험입니다."
      className="bg-linear-to-b from-transparent via-aqua-400/4 to-transparent"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {activities.map((activity, index) => (
          <Reveal key={activity.slug} delay={index * 0.08}>
            <TiltCard className="group h-full" amount={6}>
              <button
                type="button"
                onClick={() => setSelected(activity)}
                aria-label={`${activity.title} 활동 자세히 보기`}
                className="glass glass-hover flex h-full w-full items-center gap-6 rounded-sm p-6 text-left"
              >
                <span className="flex size-24 shrink-0 items-center justify-center rounded-sm border border-white/8 bg-white/5 p-3">
                  <img
                    src={activity.logo}
                    alt=""
                    loading="lazy"
                    className="size-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-mono text-[11px] tracking-wider text-accent-300/85">
                    {activity.period}
                  </span>

                  <span className="mt-1.5 flex flex-wrap items-baseline gap-2">
                    <span className="font-display text-xl font-semibold text-white">
                      {activity.title}
                    </span>
                    <span className="text-sm text-white/45">{activity.role}</span>
                  </span>

                  <span className="mt-2 block text-sm leading-relaxed text-white/50">
                    {activity.kind}
                  </span>
                </span>
              </button>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-16 font-mono text-xs tracking-[0.25em] text-white/40 uppercase">
          Volunteer
        </h3>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="glass mt-6 grid gap-8 rounded-sm p-6 sm:p-8 md:grid-cols-[1fr_minmax(0,280px)]">
          <div>
            <h4 className="font-display text-xl leading-snug font-semibold text-white">
              {volunteer.title}
            </h4>

            <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {volunteer.details.map((detail) => (
                <div key={detail.label} className="flex gap-3 text-sm">
                  <dt className="w-20 shrink-0 text-white/35">{detail.label}</dt>
                  <dd className="text-white/75">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <button
            type="button"
            onClick={() => setVolunteerOpen(true)}
            aria-label="봉사활동 확인서 보기"
            className="group relative overflow-hidden rounded-sm border border-white/10 bg-white"
          >
            <img
              src={volunteer.images[0]}
              alt=""
              loading="lazy"
              className="aspect-4/3 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-ink-950/80 to-transparent p-3 text-xs text-white/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              확인서 크게 보기
            </span>
          </button>
        </div>
      </Reveal>

      <ActivityDialog activity={selected} onClose={() => setSelected(null)} />
      <Lightbox
        images={volunteerOpen ? [...volunteer.images] : null}
        caption={volunteer.title}
        onClose={() => setVolunteerOpen(false)}
      />
    </Section>
  )
}

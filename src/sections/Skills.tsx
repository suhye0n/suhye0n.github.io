import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import { skillGroups } from '@/data/site'

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      title="Skills"
      description="프로젝트를 진행하며 실제로 사용해 본 기술들입니다."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.07}>
            <div className="glass glass-hover h-full rounded-sm p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold text-white">{group.category}</h3>
                <span className="font-mono text-xs text-white/25">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>

              <div className="hairline my-5" />

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

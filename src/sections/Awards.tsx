import { useState } from 'react'

import CredentialCard from '@/components/CredentialCard'
import Lightbox from '@/components/Lightbox'
import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import { awards, certificates, type Credential } from '@/data/site'

export default function Awards() {
  const [viewing, setViewing] = useState<Credential | null>(null)

  return (
    <Section
      id="awards"
      index="05"
      title="Award & Certificate"
      description="논문 경진대회와 팀 프로젝트에서 받은 상, 그리고 취득한 자격증입니다."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((award, index) => (
          <Reveal key={award.slug} delay={index * 0.08}>
            <CredentialCard credential={award} onOpen={() => setViewing(award)} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-16 font-mono text-xs tracking-[0.25em] text-white/40 uppercase">
          Certificate
        </h3>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <Reveal key={certificate.slug} delay={index * 0.08}>
            <CredentialCard credential={certificate} onOpen={() => setViewing(certificate)} />
          </Reveal>
        ))}
      </div>

      <Lightbox
        images={viewing?.images ?? null}
        caption={viewing ? `${viewing.title} · ${viewing.organization}` : undefined}
        onClose={() => setViewing(null)}
      />
    </Section>
  )
}

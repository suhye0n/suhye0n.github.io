import { useState } from 'react'

import ProjectCard from '@/components/ProjectCard'
import ProjectDialog from '@/components/ProjectDialog'
import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import { projects, type Project } from '@/data/site'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section
      id="projects"
      index="04"
      title="Projects"
      description="카드를 누르면 화면과 사용한 기술을 자세히 볼 수 있습니다."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} onOpen={() => setSelected(project)} />
          </Reveal>
        ))}
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}

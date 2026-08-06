import { useState } from 'react'

import ProjectCard from '@/components/ProjectCard'
import ProjectDialog from '@/components/ProjectDialog'
import Reveal from '@/components/Reveal'
import Section from '@/components/Section'
import { projects, type Project } from '@/data/site'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section id="projects" index="04" title="Projects">
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

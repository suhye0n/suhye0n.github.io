import Carousel from '@/components/Carousel'
import LinkChip from '@/components/LinkChip'
import Modal from '@/components/Modal'
import type { Project } from '@/data/site'

type ProjectDialogProps = {
  project: Project | null
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  return (
    <Modal
      open={project !== null}
      onClose={onClose}
      label={project?.title ?? '프로젝트 상세'}
      panelClassName="max-w-4xl"
    >
      {project && (
        <div className="glass max-h-[82vh] overflow-y-auto rounded-sm p-5 sm:p-8">
          <Carousel images={project.images} alt={project.title} />

          <h3 className="text-gradient mt-8 font-display text-3xl font-semibold">
            {project.title}
          </h3>
          <p className="mt-2 text-fg/55">{project.summary}</p>

          <div className="hairline my-7" />

          <DialogBlock title="개요">
            <ul className="space-y-2 text-sm leading-relaxed text-fg/70">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-400" />
                  {highlight}
                </li>
              ))}
            </ul>
          </DialogBlock>

          <DialogBlock title="Link">
            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <LinkChip key={link.href} href={link.href} label={link.display} />
              ))}
            </div>
          </DialogBlock>

          <DialogBlock title="Part">
            <div className="flex flex-wrap gap-2">
              {project.parts.map((part) => (
                <span key={part} className="chip">
                  {part}
                </span>
              ))}
            </div>
          </DialogBlock>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            {project.stacks.map((stack) => (
              <div key={stack.category}>
                <h4 className="font-mono text-xs tracking-[0.2em] text-accent-300/90 uppercase">
                  {stack.category}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}

function DialogBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-7 first:mt-0">
      <h4 className="font-mono text-xs tracking-[0.2em] text-accent-300/90 uppercase">{title}</h4>
      <div className="mt-3">{children}</div>
    </div>
  )
}

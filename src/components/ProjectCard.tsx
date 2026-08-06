import TiltCard from '@/components/TiltCard'
import type { Project } from '@/data/site'

type ProjectCardProps = {
  project: Project
  onOpen: () => void
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <TiltCard className="group h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${project.title} 자세히 보기`}
        className="glass glass-hover flex h-full w-full flex-col overflow-hidden rounded-sm text-left"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <img
            src={project.images[0]}
            alt=""
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="img-veil absolute inset-0" />

          <div className="absolute bottom-4 left-5 flex flex-wrap gap-2">
            {project.parts.map((part) => (
              <span key={part} className="chip bg-surface/60">
                {part}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold text-fg transition-colors group-hover:text-accent-300">
            {project.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-fg/55">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stacks
              .flatMap((stack) => stack.items)
              .slice(0, 4)
              .map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
          </ul>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-300">
            자세히 보기
            <svg
              viewBox="0 0 24 24"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </button>
    </TiltCard>
  )
}

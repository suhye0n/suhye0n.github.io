import Carousel from '@/components/Carousel'
import Modal from '@/components/Modal'
import type { Activity } from '@/data/site'

type ActivityDialogProps = {
  activity: Activity | null
  onClose: () => void
}

export default function ActivityDialog({ activity, onClose }: ActivityDialogProps) {
  return (
    <Modal
      open={activity !== null}
      onClose={onClose}
      label={activity?.title ?? '활동 상세'}
      panelClassName="max-w-3xl"
    >
      {activity && (
        <div className="glass max-h-[82vh] overflow-y-auto rounded-sm p-5 sm:p-8">
          <Carousel images={activity.images} alt={activity.title} />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <h3 className="text-gradient font-display text-3xl font-semibold">{activity.title}</h3>
            <span className="chip">{activity.role}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">{activity.kind}</span>
            <span className="chip font-mono">{activity.period}</span>
          </div>

          <div className="hairline my-7" />

          <h4 className="font-mono text-xs tracking-[0.2em] text-accent-300/90 uppercase">
            주요 활동
          </h4>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fg/70">
            {activity.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-400" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  )
}

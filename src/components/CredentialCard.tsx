import TiltCard from '@/components/TiltCard'
import type { Credential } from '@/data/site'

type CredentialCardProps = {
  credential: Credential
  onOpen: () => void
}

export default function CredentialCard({ credential, onOpen }: CredentialCardProps) {
  return (
    <TiltCard className="group h-full" amount={5}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${credential.title} 원본 보기`}
        className="glass glass-hover flex h-full w-full flex-col overflow-hidden rounded-sm text-left"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-white">
          <img
            src={credential.images[0]}
            alt=""
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-surface/0 transition-colors duration-500 group-hover:bg-surface/25" />

          {credential.images.length > 1 && (
            <span className="absolute top-3 right-3 flex items-center gap-1.5 border border-fg/15 bg-surface/70 px-2.5 py-1 font-mono text-[10px] text-fg/80 backdrop-blur">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="size-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="13" height="13" rx="2" />
                <path d="M8 21h11a2 2 0 0 0 2-2V8" />
              </svg>
              {credential.images.length}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wider text-accent-300/85">
            {credential.date}
            {credential.tag && (
              <span className="border border-accent-400/30 px-2 py-0.5 text-accent-300">
                {credential.tag}
              </span>
            )}
          </div>

          <h3 className="mt-2 font-display text-base leading-snug font-semibold text-fg">
            {credential.title}
          </h3>

          <p className="mt-1.5 text-sm text-fg/45">{credential.organization}</p>

          {credential.note && (
            <p className="mt-3 border-l border-fg/12 pl-3 text-xs leading-relaxed text-fg/40">
              {credential.note}
            </p>
          )}
        </div>
      </button>
    </TiltCard>
  )
}

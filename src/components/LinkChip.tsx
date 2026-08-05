type LinkChipProps = {
  href: string
  label: string
}

export default function LinkChip({ href, label }: LinkChipProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="chip font-mono">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-3.5 text-accent-300"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
      </svg>
      {label}
    </a>
  )
}

import { profile, socials } from '@/data/site'

export default function Footer() {
  return (
    <footer className="border-t border-fg/8 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 font-mono text-xs tracking-wider text-fg/35 uppercase sm:flex-row">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {profile.nameEn}
        </p>

        <ul className="flex gap-5">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="transition-colors hover:text-fg"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

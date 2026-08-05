import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { awards, careers, navItems, profile, projects, skillGroups, socials } from '@/data/site'
import { resolveDuration } from '@/lib/career'
import { shatterGlass, toggleFrenzy } from '@/lib/sceneEvents'

type Tone = 'out' | 'dim' | 'strong' | 'error' | 'echo'
type Line = { tone: Tone; text: string }

const TONE_CLASS: Record<Tone, string> = {
  out: 'text-white/75',
  dim: 'text-white/35',
  strong: 'text-white',
  error: 'text-white/75 [text-decoration:underline_wavy_rgba(255,255,255,0.4)]',
  echo: 'text-white/45',
}

const line = (text: string, tone: Tone = 'out'): Line => ({ tone, text })

const WELCOME: Line[] = [
  line(`${profile.nameEn} — portfolio shell`, 'strong'),
  line('help 을 입력하면 쓸 수 있는 명령이 나옵니다. Esc 로 닫습니다.', 'dim'),
  line(''),
]

const HELP: Line[] = [
  line('COMMANDS', 'strong'),
  line('  help            이 목록'),
  line('  whoami          프로필 한 줄 요약'),
  line('  ls              섹션 목록'),
  line('  ls <목록>       projects · career · awards · skills'),
  line('  cat <슬러그>    항목 자세히 보기'),
  line('  go <섹션>       해당 섹션으로 이동'),
  line('  contact         연락처'),
  line('  eggs            이 사이트에 숨겨 둔 것들'),
  line('  clear           화면 비우기'),
  line('  exit            닫기'),
  line(''),
]

function lookup(slug: string): Line[] | null {
  const project = projects.find((item) => item.slug === slug)
  if (project) {
    return [
      line(project.title, 'strong'),
      line(project.summary, 'dim'),
      line(''),
      ...project.highlights.map((text) => line(`  · ${text}`)),
      line(''),
      ...project.stacks.map((stack) =>
        line(`  ${stack.category.padEnd(12)} ${stack.items.join(', ')}`, 'dim'),
      ),
      line(''),
      ...project.links.map((link) => line(`  ${link.label.padEnd(12)} ${link.display}`, 'dim')),
      line(''),
    ]
  }

  const career = careers.find((item) => item.slug === slug)
  if (career) {
    return [
      line(`${career.company} — ${career.department}`, 'strong'),
      line(`${career.period} (${resolveDuration(career)})`, 'dim'),
      line(''),
      ...career.works.flatMap((work) => [
        line(`  · ${work.title}`),
        line(`    ${work.period ?? ''} ${work.stack.join(', ')}`.trimEnd(), 'dim'),
      ]),
      line(''),
    ]
  }

  const award = awards.find((item) => item.slug === slug)
  if (award) {
    return [
      line(award.title, 'strong'),
      line(`${award.organization} · ${award.date}`, 'dim'),
      ...(award.note ? [line(`  ${award.note}`)] : []),
      line(''),
    ]
  }

  return null
}

function run(input: string, close: () => void): Line[] {
  const [command, ...rest] = input.trim().split(/\s+/)
  const argument = rest.join(' ')

  switch (command) {
    case 'help':
      return HELP

    case 'whoami':
      return [
        line(`${profile.name} (${profile.nameEn})`, 'strong'),
        line(profile.role, 'dim'),
        line(profile.tagline),
        line(''),
      ]

    case 'ls': {
      if (!argument) {
        return [...navItems.map((item) => line(`  ${item.id.padEnd(12)} ${item.label}`)), line('')]
      }
      if (argument === 'projects') {
        return [
          ...projects.map((item) => line(`  ${item.slug.padEnd(20)} ${item.title}`)),
          line('cat <슬러그> 로 자세히 볼 수 있습니다.', 'dim'),
          line(''),
        ]
      }
      if (argument === 'career') {
        return [
          ...careers.map((item) =>
            line(`  ${item.slug.padEnd(20)} ${item.company} · ${item.period}`),
          ),
          line(''),
        ]
      }
      if (argument === 'awards') {
        return [...awards.map((item) => line(`  ${item.slug.padEnd(26)} ${item.date}`)), line('')]
      }
      if (argument === 'skills') {
        return [
          ...skillGroups.map((group) =>
            line(`  ${group.category.padEnd(16)} ${group.items.join(', ')}`),
          ),
          line(''),
        ]
      }
      return [line(`ls: ${argument}: 그런 목록은 없습니다.`, 'error'), line('')]
    }

    case 'cat': {
      if (!argument) return [line('cat: 슬러그가 필요합니다.', 'error'), line('')]
      const found = lookup(argument)
      return found ?? [line(`cat: ${argument}: 그런 항목이 없습니다.`, 'error'), line('')]
    }

    case 'go': {
      const target = navItems.find((item) => item.id === argument) ? argument : null
      if (!target)
        return [line(`go: ${argument || '(빈 값)'}: 그런 섹션이 없습니다.`, 'error'), line('')]

      close()
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      return []
    }

    case 'contact':
      return [
        line(profile.email, 'strong'),
        ...socials.map((social) => line(`  ${social.label.padEnd(10)} ${social.href}`, 'dim')),
        line(''),
      ]

    case 'eggs':
      return [
        line('숨겨 둔 것들', 'strong'),
        line('  ↑↑↓↓←→←→BA     배경의 유리가 폭주합니다. 다시 입력하면 진정됩니다.'),
        line('  헤더 이름 5연타  유리가 산산조각 났다가 제자리로 돌아옵니다.'),
        line('  Ctrl+K          지금 보고 계신 이 창.'),
        line('  콘솔의 hello()  이력 요약이 표로 나옵니다.'),
        line(''),
      ]

    case 'konami':
      toggleFrenzy()
      return [line('직접 입력해 보시는 게 더 재밌습니다. 그래도 켜 드렸습니다.', 'dim'), line('')]

    case 'shatter':
      shatterGlass()
      return [line('쨍.', 'dim'), line('')]

    case 'clear':
      return []

    case 'exit':
      close()
      return []

    case '':
      return []

    default:
      return [line(`${command}: command not found`, 'error'), line('')]
  }
}

type TerminalProps = {
  open: boolean
  onClose: () => void
}

export default function Terminal({ open, onClose }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const cursor = useRef(-1)

  useEffect(() => {
    if (!open) return

    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    const output = outputRef.current
    if (output) output.scrollTop = output.scrollHeight
  }, [lines])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()

    const entered = input
    const result = run(entered, onClose)

    setLines(entered.trim() === 'clear' ? [] : [...lines, line(`> ${entered}`, 'echo'), ...result])
    if (entered.trim()) setHistory([entered, ...history])
    cursor.current = -1
    setInput('')
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
    if (history.length === 0) return

    event.preventDefault()
    const next =
      event.key === 'ArrowUp'
        ? Math.min(cursor.current + 1, history.length - 1)
        : Math.max(cursor.current - 1, -1)

    cursor.current = next
    setInput(next === -1 ? '' : history[next])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-100 flex items-start justify-center bg-ink-950/70 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="시크릿 터미널"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass flex w-full max-w-2xl flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                {profile.nameEn.toLowerCase().replace(' ', '@')} — shell
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="터미널 닫기"
                className="font-mono text-[10px] tracking-[0.2em] text-white/35 uppercase transition-colors hover:text-white"
              >
                esc
              </button>
            </div>

            <div
              ref={outputRef}
              className="max-h-[52vh] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((item, index) => (
                <p
                  key={`${index}-${item.text}`}
                  className={`whitespace-pre-wrap ${TONE_CLASS[item.tone]}`}
                >
                  {item.text || ' '}
                </p>
              ))}
            </div>

            <form
              onSubmit={submit}
              className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
            >
              <span aria-hidden className="font-mono text-[13px] text-white">
                &gt;
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onInputKeyDown}
                aria-label="명령 입력"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-white/25"
                placeholder="help"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

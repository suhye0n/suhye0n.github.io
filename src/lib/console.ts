import { careers, profile, projects, socials } from '@/data/site'
import { resolveDuration } from '@/lib/career'

declare global {
  interface Window {
    hello?: () => string
  }
}

const BADGE =
  'background:linear-gradient(90deg,#ffffff,#9aa0aa);color:#08080a;padding:5px 12px;font-weight:700;letter-spacing:0.22em;font-size:11px'
const DIM = 'color:#8b8f99'
const KEY = 'color:#ffffff;font-weight:700'

const ASCII = String.raw`
   ___ _   _ _  ___   _____ ___  _  _
  / __| | | | || \ \ / / __/ _ \| \| |
  \__ \ |_| | __ |\ V /| _| (_) | .  |
  |___/\___/|_||_| |_| |___\___/|_|\_|
`

export function printConsoleGreeting() {
  console.log('%cSUHYEON PARK', BADGE)
  console.log(`%c${ASCII}`, DIM)
  console.log(`%c${profile.tagline}`, DIM)
  console.log(`%c${profile.email}`, KEY)
  console.log('')

  console.log('%c여기까지 열어 보셨으니, 숨겨 둔 것들을 알려 드립니다.', KEY)
  console.log(
    '%c  ↑ ↑ ↓ ↓ ← → ← → B A%c   배경의 유리가 폭주합니다. 한 번 더 입력하면 진정됩니다.',
    KEY,
    DIM,
  )
  console.log(
    '%c  헤더의 이름을 5번 연타%c   유리가 산산조각 났다가 제자리로 돌아옵니다.',
    KEY,
    DIM,
  )
  console.log(
    '%c  Ctrl + K%c                시크릿 터미널이 열립니다. help 부터 쳐 보세요.',
    KEY,
    DIM,
  )
  console.log('%c  hello()%c                 아래 콘솔에 입력해 보세요.', KEY, DIM)
  console.log('')

  window.hello = () => {
    console.log('%c안녕하세요, 박수현입니다.', KEY)

    console.table(
      careers.map((career) => ({
        회사: career.company,
        소속: career.department,
        기간: career.period,
        재직: resolveDuration(career),
      })),
    )

    console.table(
      projects.map((project) => ({
        프로젝트: project.title,
        역할: project.parts.join(', '),
        스택: project.stacks
          .flatMap((stack) => stack.items)
          .slice(0, 4)
          .join(', '),
      })),
    )

    socials.forEach((social) => console.log(`%c${social.label}%c  ${social.href}`, KEY, DIM))

    return '더 궁금한 건 Ctrl+K 로 터미널을 열어 ls / cat 을 써 보세요.'
  }
}

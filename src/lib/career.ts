import type { Career } from '@/data/site'

const START_MONTH = /(\d{4})\.(\d{1,2})/
const LOADED_AT = new Date()

function formatMonths(months: number) {
  const years = Math.floor(months / 12)
  const rest = months % 12

  if (years === 0) return `${rest}개월`
  if (rest === 0) return `${years}년`
  return `${years}년 ${rest}개월`
}

export function resolveDuration(career: Career, now: Date = LOADED_AT) {
  if (career.duration) return career.duration

  const match = START_MONTH.exec(career.period)
  if (!match) return ''

  const months =
    (now.getFullYear() - Number(match[1])) * 12 + (now.getMonth() + 1 - Number(match[2]))

  return formatMonths(Math.max(1, months))
}

import { useState } from 'react'

const HANDHELD = '(max-width: 767px), (pointer: coarse) and (max-width: 1024px)'

export function useHandheld() {
  const [handheld] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(HANDHELD).matches,
  )

  return handheld
}

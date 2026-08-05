import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import { hueStore } from '@/lib/hue'

export function useSmoothHue() {
  const hue = useRef(hueStore.target)

  useFrame((_, delta) => {
    const diff = ((hueStore.target - hue.current + 540) % 360) - 180
    hue.current = (hue.current + diff * Math.min(1, delta * 1.6) + 360) % 360
  })

  return hue
}

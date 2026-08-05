import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { CanvasTexture, ClampToEdgeWrapping, type Mesh, RepeatWrapping } from 'three'

import { profile } from '@/data/site'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const LINES = [
  profile.nameEn.toUpperCase(),
  'FRONTEND · FULLSTACK',
  '보이는 것부터 동작하는 것까지',
  'REACT / SPRING / KUBERNETES',
  'BUILT END TO END',
  'PORTFOLIO — SUHYE0N',
]

const TILE_WIDTH = 1536
const TILE_HEIGHT = 1024
const ROW_HEIGHT = TILE_HEIGHT / LINES.length

function createWall() {
  const canvas = document.createElement('canvas')
  canvas.width = TILE_WIDTH
  canvas.height = TILE_HEIGHT

  const ctx = canvas.getContext('2d')
  const texture = new CanvasTexture(canvas)

  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = RepeatWrapping
  texture.anisotropy = 4
  texture.repeat.set(1, 1.8)

  const redraw = () => {
    if (!ctx) return

    ctx.clearRect(0, 0, TILE_WIDTH, TILE_HEIGHT)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    LINES.forEach((line, index) => {
      const y = ROW_HEIGHT * (index + 0.5)
      const outlined = index % 2 === 1

      ctx.font = `${outlined ? 600 : 700} ${outlined ? 108 : 124}px Outfit, 'Pretendard Variable', sans-serif`
      ctx.letterSpacing = outlined ? '0.18em' : '0.02em'

      if (outlined) {
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(255,255,255,0.34)'
        ctx.strokeText(line, TILE_WIDTH / 2, y)
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.17)'
        ctx.fillText(line, TILE_WIDTH / 2, y)
      }

      ctx.fillStyle = 'rgba(255,255,255,0.055)'
      ctx.fillRect(0, ROW_HEIGHT * (index + 1) - 1, TILE_WIDTH, 1)
    })

    texture.needsUpdate = true
  }

  redraw()
  return { texture, redraw }
}

let wall: ReturnType<typeof createWall> | null = null

function getWall() {
  if (!wall) wall = createWall()
  return wall
}

export default function TypeWall() {
  const mesh = useRef<Mesh>(null)
  const scroll = useScrollProgress()

  useEffect(() => {
    let alive = true
    document.fonts?.ready.then(() => {
      if (alive) getWall().redraw()
    })

    return () => {
      alive = false
    }
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    getWall().texture.offset.y = -scroll.current * 1.35 - time * 0.0045

    if (mesh.current) {
      mesh.current.position.z = -6 + Math.sin(time * 0.18) * 0.25
      mesh.current.rotation.z += delta * 0.002
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -6]}>
      <planeGeometry args={[26, 17]} />
      <meshBasicMaterial
        map={getWall().texture}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

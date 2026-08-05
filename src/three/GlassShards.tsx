import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { type InstancedMesh, type MeshStandardMaterial, Object3D } from 'three'

import { sceneSignals } from '@/lib/sceneEvents'

const COUNT = 72
const DURATION = 1.75

type Seed = {
  dir: [number, number, number]
  distance: number
  spin: [number, number, number]
  scale: number
}

const SEEDS: Seed[] = Array.from({ length: COUNT }, (_, index) => {
  const y = 1 - (index / (COUNT - 1)) * 2
  const radius = Math.sqrt(Math.max(0, 1 - y * y))
  const theta = Math.PI * (3 - Math.sqrt(5)) * index

  const wobble = (offset: number) => Math.abs(Math.sin(index * 12.9898 + offset))

  return {
    dir: [Math.cos(theta) * radius, y, Math.sin(theta) * radius],
    distance: 2.2 + wobble(1.1) * 3.4,
    spin: [wobble(2.3) * 6 - 3, wobble(4.7) * 6 - 3, wobble(7.1) * 6 - 3],
    scale: 0.05 + wobble(9.3) * 0.11,
  }
})

const dummy = new Object3D()

export default function GlassShards() {
  const mesh = useRef<InstancedMesh>(null)
  const material = useRef<MeshStandardMaterial>(null)
  const seen = useRef(0)
  const age = useRef(Number.POSITIVE_INFINITY)

  useFrame((state, delta) => {
    const target = mesh.current
    if (!target) return

    if (seen.current !== sceneSignals.shatterCount) {
      seen.current = sceneSignals.shatterCount
      age.current = 0
    }

    if (age.current > DURATION) {
      if (target.visible) target.visible = false
      return
    }

    target.visible = true
    age.current += delta

    const progress = Math.min(1, age.current / DURATION)
    const bell = Math.sin(progress * Math.PI)
    const travel = Math.pow(bell, 0.65)

    SEEDS.forEach((seed, index) => {
      const distance = seed.distance * travel

      dummy.position.set(seed.dir[0] * distance, seed.dir[1] * distance, seed.dir[2] * distance)
      dummy.rotation.set(
        seed.spin[0] * age.current,
        seed.spin[1] * age.current,
        seed.spin[2] * age.current,
      )
      dummy.scale.setScalar(seed.scale * bell)
      dummy.updateMatrix()
      target.setMatrixAt(index, dummy.matrix)
    })

    target.instanceMatrix.needsUpdate = true

    if (material.current) {
      if (sceneSignals.frenzy) {
        material.current.color.setHSL((state.clock.elapsedTime * 0.32) % 1, 0.8, 0.62)
      } else {
        material.current.color.setRGB(0.9, 0.905, 0.925)
      }
    }
  })

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, COUNT]}
      visible={false}
      frustumCulled={false}
    >
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial ref={material} metalness={1} roughness={0.12} envMapIntensity={2.4} />
    </instancedMesh>
  )
}

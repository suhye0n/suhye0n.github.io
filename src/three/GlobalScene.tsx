import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { Group } from 'three'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import Backdrop from '@/three/Backdrop'
import GlassCluster from '@/three/GlassCluster'
import TypeWall from '@/three/TypeWall'

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return

    const damp = 1 - Math.pow(0.002, delta)
    group.current.rotation.y += (state.pointer.x * 0.16 - group.current.rotation.y) * damp
    group.current.rotation.x += (-state.pointer.y * 0.1 - group.current.rotation.x) * damp
  })

  return <group ref={group}>{children}</group>
}

function StudioRig() {
  return (
    <Environment resolution={384} frames={1}>
      <Lightformer
        form="rect"
        intensity={6}
        color="#ffffff"
        position={[0, 6, 1]}
        scale={[12, 4, 1]}
      />
      <Lightformer
        form="rect"
        intensity={4}
        color="#ffffff"
        position={[-7, 1, -2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[8, 6, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2.6}
        color="#dfe3ea"
        position={[7, -1, -1]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[8, 5, 1]}
      />
      <Lightformer form="ring" intensity={3.2} color="#ffffff" position={[1, 2, -8]} scale={6} />
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#9aa0aa"
        position={[0, -6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[12, 6, 1]}
      />
    </Environment>
  )
}

function useSceneQuality() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = () => setCompact(mql.matches)

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return useMemo(
    () =>
      compact
        ? {
            cluster: { compact: true, samples: 3, resolution: 128, secondaryGlass: false },
            dpr: [1, 1.25] as [number, number],
          }
        : {
            cluster: { compact: false, samples: 6, resolution: 256, secondaryGlass: true },
            dpr: [1, 1.5] as [number, number],
          },
    [compact],
  )
}

export default function GlobalScene() {
  const reducedMotion = useReducedMotion()
  const { cluster, dpr } = useSceneQuality()

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_28%,rgba(255,255,255,0.16),transparent_70%)]"
      />
    )
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 9], fov: 38 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Backdrop />
          <TypeWall />

          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 6, 6]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-6, -2, 3]} intensity={0.9} color="#c9ccd4" />

          <ParallaxRig>
            <GlassCluster {...cluster} />
          </ParallaxRig>

          <StudioRig />
        </Suspense>
      </Canvas>
    </div>
  )
}

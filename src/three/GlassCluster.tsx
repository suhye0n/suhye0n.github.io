import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh, MeshStandardMaterial } from 'three'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import { sceneSignals } from '@/lib/sceneEvents'
import GlassShards from '@/three/GlassShards'
import { useSmoothHue } from '@/three/useSmoothHue'

export type ClusterQuality = {
  compact: boolean
  samples: number
  resolution: number
  secondaryGlass: boolean
}

const SHATTER_DURATION = 1.75

export default function GlassCluster({
  compact,
  samples,
  resolution,
  secondaryGlass,
}: ClusterQuality) {
  const rig = useRef<Group>(null)
  const knot = useRef<Mesh>(null)
  const lens = useRef<Mesh>(null)
  const chrome = useRef<MeshStandardMaterial>(null)
  const scroll = useScrollProgress()
  const hue = useSmoothHue()

  const heat = useRef(0)
  const shatterSeen = useRef(0)
  const shatterAge = useRef(Number.POSITIVE_INFINITY)

  const homeX = compact ? 0 : 2.45
  const homeY = compact ? 0.35 : 0.15
  const baseScale = compact ? 0.66 : 1

  useFrame((state, delta) => {
    const damp = 1 - Math.pow(0.0016, delta)
    const away = Math.min(1, scroll.current * 2.6)

    const wanted = sceneSignals.frenzy ? 1 : 0
    heat.current += (wanted - heat.current) * Math.min(1, delta * (wanted ? 2.6 : 1.4))
    const fever = heat.current

    if (shatterSeen.current !== sceneSignals.shatterCount) {
      shatterSeen.current = sceneSignals.shatterCount
      shatterAge.current = 0
    }
    shatterAge.current += delta

    const broken =
      shatterAge.current < SHATTER_DURATION
        ? Math.sin((shatterAge.current / SHATTER_DURATION) * Math.PI)
        : 0

    if (rig.current) {
      const pushX = state.pointer.x * (compact ? 0.3 : 0.95)
      const pushY = state.pointer.y * (compact ? 0.2 : 0.6)

      const targetX = (homeX + pushX - away * (compact ? 0.5 : 2.2)) * (1 - fever * 0.92)
      const targetY = homeY + pushY + away * 1.25 * (1 - fever)
      const targetZ = fever * 2.1

      rig.current.position.x += (targetX - rig.current.position.x) * damp
      rig.current.position.y += (targetY - rig.current.position.y) * damp
      rig.current.position.z += (targetZ - rig.current.position.z) * damp

      rig.current.rotation.z +=
        (away * 0.9 - rig.current.rotation.z) * damp * (1 - fever) + delta * fever * 1.7

      const target = baseScale * (1 - away * 0.34) * (1 + fever * 0.5) * (1 - broken * 0.88)
      rig.current.scale.x += (target - rig.current.scale.x) * Math.min(1, delta * 9)
      rig.current.scale.setScalar(rig.current.scale.x)
    }

    if (knot.current) {
      knot.current.rotation.y += delta * (0.22 + fever * 2.6)
      knot.current.rotation.x += delta * (0.09 + fever * 1.4)
    }

    if (lens.current) {
      lens.current.rotation.y -= delta * (0.14 + fever * 1.8)
      lens.current.position.x += (state.pointer.x * 0.5 - lens.current.position.x) * delta * 1.1
      lens.current.position.y += (-state.pointer.y * 0.35 - 0.2 - lens.current.position.y) * delta
    }

    if (chrome.current) {
      const base = hue.current / 360
      const rainbow = (state.clock.elapsedTime * 0.3) % 1

      chrome.current.color.setHSL(
        (base + rainbow * fever) % 1,
        0.12 + fever * 0.68,
        0.72 - fever * 0.08,
      )
    }
  })

  return (
    <group ref={rig} position={[homeX, homeY, 0]} scale={baseScale}>
      <Float speed={1.15} rotationIntensity={0.4} floatIntensity={0.85}>
        <mesh ref={knot} scale={1.28}>
          <torusKnotGeometry args={[1, 0.36, 220, 40]} />
          <MeshTransmissionMaterial
            backside
            samples={samples}
            resolution={resolution}
            transmission={1}
            thickness={1.9}
            roughness={0.03}
            ior={1.52}
            chromaticAberration={0.14}
            anisotropicBlur={0.4}
            distortion={0.42}
            distortionScale={0.4}
            temporalDistortion={0.14}
            clearcoat={1}
            attenuationDistance={3.2}
            attenuationColor="#ffffff"
            color="#ffffff"
          />
        </mesh>
      </Float>

      {secondaryGlass && (
        <mesh ref={lens} position={[-0.9, -0.2, -1.7]} scale={1.05}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            transmissionSampler
            transmission={1}
            thickness={2.6}
            roughness={0}
            ior={1.34}
            chromaticAberration={0.22}
            distortion={0.15}
            distortionScale={0.6}
            temporalDistortion={0.06}
            color="#ffffff"
          />
        </mesh>
      )}

      <Float speed={0.9} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh position={[1.55, 1.35, -0.9]} rotation={[0.6, 0.3, 0]} scale={0.72}>
          <torusGeometry args={[1, 0.1, 32, 128]} />
          <meshStandardMaterial ref={chrome} metalness={1} roughness={0.06} envMapIntensity={2.6} />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1.4} floatIntensity={1.6}>
        <mesh position={[-1.9, -1.55, 0.9]} scale={0.34}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            metalness={1}
            roughness={0.14}
            color="#dcdce2"
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={1.1} floatIntensity={1.3}>
        <mesh position={[2.25, -1.15, 0.5]} scale={0.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial metalness={1} roughness={0.2} color="#b8b8c0" envMapIntensity={2} />
        </mesh>
      </Float>

      <GlassShards />
    </group>
  )
}

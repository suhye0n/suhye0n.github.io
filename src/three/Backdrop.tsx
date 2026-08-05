import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { ShaderMaterial } from 'three'
import { Vector2 } from 'three'

import { useSmoothHue } from '@/three/useSmoothHue'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uHue;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    vec3 temperature = hsl2rgb(vec3(uHue, 0.06, 0.5));

    vec2 keyCenter = vec2(sin(uTime * 0.06) * 0.12, 0.46);
    float key = exp(-dot((p - keyCenter) * vec2(1.05, 1.9), (p - keyCenter) * vec2(1.05, 1.9)) * 3.4);

    vec2 bounceCenter = vec2(sin(uTime * 0.04 + 2.0) * 0.2, -0.52);
    float bounce = exp(-dot((p - bounceCenter) * vec2(0.85, 2.6), (p - bounceCenter) * vec2(0.85, 2.6)) * 3.0);

    float strip = exp(-pow(abs(p.y - 0.16 + sin(p.x * 1.6 + uTime * 0.12) * 0.04) * 26.0, 2.0));

    vec3 color = vec3(0.026, 0.026, 0.03);
    color += vec3(0.62) * key * 0.44;
    color += temperature * key * 0.16;
    color += vec3(0.5) * bounce * 0.14;
    color += vec3(0.85) * strip * 0.05;

    float vignette = smoothstep(1.15, 0.2, length(p) * 1.5);
    color *= mix(0.28, 1.0, vignette);

    color += (hash(uv * uResolution) - 0.5) * 0.008;

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function Backdrop() {
  const material = useRef<ShaderMaterial>(null)
  const size = useThree((state) => state.size)
  const hue = useSmoothHue()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHue: { value: hue.current / 360 },
      uResolution: { value: new Vector2(1, 1) },
    }),
    [hue],
  )

  useFrame((_, delta) => {
    if (!material.current) return

    material.current.uniforms.uTime.value += delta
    material.current.uniforms.uHue.value = hue.current / 360
    material.current.uniforms.uResolution.value.set(size.width, size.height)
  })

  return (
    <mesh renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

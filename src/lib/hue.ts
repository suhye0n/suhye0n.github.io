export const SECTION_HUES: Record<string, number> = {
  hero: 262,
  about: 248,
  skills: 232,
  career: 216,
  projects: 204,
  awards: 78,
  education: 258,
  activity: 288,
  contact: 312,
}

export const DEFAULT_HUE = SECTION_HUES.hero

export const hueStore = { target: DEFAULT_HUE }

export function setHue(hue: number) {
  hueStore.target = hue
  document.documentElement.style.setProperty('--hue', String(hue))
}

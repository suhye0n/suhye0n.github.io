import { useSyncExternalStore } from 'react'

export const sceneSignals = {
  frenzy: false,
  shatterCount: 0,
}

type Listener = () => void

const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function toggleFrenzy() {
  sceneSignals.frenzy = !sceneSignals.frenzy
  emit()
  return sceneSignals.frenzy
}

export function shatterGlass() {
  sceneSignals.shatterCount += 1
  emit()
}

export function useFrenzy() {
  return useSyncExternalStore(
    subscribe,
    () => sceneSignals.frenzy,
    () => false,
  )
}

import { useEffect, useState } from 'react'
export function useReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)'
  const [r, setR] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(q).matches)
  useEffect(() => { const m = matchMedia(q); const f = (e: MediaQueryListEvent) => setR(e.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return r
}

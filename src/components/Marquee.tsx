import { useLayoutEffect, useRef, useState } from 'react'
import type { Institucion } from '../data/historias'
import { useReducedMotion } from './useReducedMotion'
/** Prueba: tarjetas solo con logo. Poner en true para volver a mostrar nombre y municipio. */
export const SHOW_INST_NAMES = false
const PX_POR_SEG = 40
function Card({ s, dup }: { s: Institucion; dup?: boolean }) {
  return (
    <li className="m-card" aria-hidden={dup || undefined}>
      {s.logo ? <img src={s.logo} alt={dup ? '' : s.nombre} width={200} height={115} loading="lazy" decoding="async" /> : <span className="m-noimg">{s.nombre}</span>}
      {SHOW_INST_NAMES && <strong>{s.nombre}</strong>}
      {SHOW_INST_NAMES && s.municipio && <span>{s.municipio}</span>}
    </li>
  )
}
export function Marquee({ titulo, items }: { titulo: string; items: Institucion[] }) {
  const reduce = useReducedMotion(), [paused, setPaused] = useState(false), row = useRef<HTMLUListElement>(null), [dur, setDur] = useState(60)
  useLayoutEffect(() => {
    const r = row.current; if (!r || reduce) return
    const f = () => setDur(Math.max(10, r.scrollWidth / 2 / PX_POR_SEG)); f()
    const ro = new ResizeObserver(f); ro.observe(r); return () => ro.disconnect()
  }, [reduce, items])
  return (
    <div className="marquee" data-paused={paused || undefined} data-static={reduce || undefined}>
      <h3 className="sec-title wrap">{titulo}</h3>
      <div className="m-view" tabIndex={reduce ? 0 : -1} aria-label={titulo} role={reduce ? 'region' : undefined}>
        <ul className="m-row" ref={row} aria-label={titulo} style={{ ['--dur' as string]: `${dur}s` }}>
          {items.map((s, j) => <Card key={j} s={s} />)}
          {!reduce && items.map((s, j) => <Card key={`d${j}`} s={s} dup />)}
        </ul>
      </div>
      {!reduce && <div className="wrap m-ctl">
        <button type="button" className="m-pause" aria-pressed={paused} aria-label={paused ? 'Reproducir cinta de instituciones' : 'Pausar cinta de instituciones'} onClick={() => setPaused(p => !p)}>
          <span className="m-pause-dot">{paused
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z" /></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}</span>
        </button>
      </div>}
    </div>
  )
}

import { useEffect, useLayoutEffect, useState } from 'react'
import type { Institucion } from '../data/historias'
import { useReducedMotion } from './useReducedMotion'
const DUR = 3000
/** Prueba: tarjetas solo con logo. Poner en true para volver a mostrar nombre y municipio. */
export const SHOW_INST_NAMES = false
const Chev = ({ d }: { d: string }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d={d} /></svg>
interface Props { titulo: string; items: Institucion[]; isPlaceholder: boolean; active: boolean }
export function InstitutionsSlider({ titulo, items, isPlaceholder, active }: Props) {
  const n = items.length, reduce = useReducedMotion()
  const [i, setI] = useState(0), [userPaused, setUserPaused] = useState(false), [hover, setHover] = useState(false), [focus, setFocus] = useState(false)
  const auto = !reduce && n > 1, running = auto && active && !userPaused && !hover && !focus
  const [jump, setJump] = useState(false) // sin transición al saltar en el bucle
  const PEEK = Math.min(n, 6), cur = i % n
  useEffect(() => { if (!running) return; const t = setTimeout(() => setI(k => k + 1), DUR); return () => clearTimeout(t) }, [running, i, n])
  // al llegar a la copia (i === n) volvemos a 0 sin animación
  useEffect(() => { if (i < n) return; const t = setTimeout(() => { setJump(true); setI(0) }, reduce ? 0 : 340); return () => clearTimeout(t) }, [i, n, reduce])
  useLayoutEffect(() => { if (!jump) return; const r = requestAnimationFrame(() => requestAnimationFrame(() => setJump(false))); return () => cancelAnimationFrame(r) }, [jump])
  const next = () => setI(k => k >= n ? 1 : k + 1)
  const prev = () => { if (i === 0) { setJump(true); setI(n); requestAnimationFrame(() => requestAnimationFrame(() => { setJump(false); setI(n - 1) })) } else setI(k => k - 1) }
  return (
    <div className="inst" data-placeholder={isPlaceholder || undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false) }}>
      <h4>{titulo}</h4>
      <ul className="sr">{items.map(s => <li key={s.nombre}>{s.nombre}{s.municipio ? `, ${s.municipio}` : ''}</li>)}</ul>
      <div className="inst-view" aria-hidden="true">
        <div className={`inst-row${jump ? ' no-anim' : ''}`} style={{ ['--i' as string]: i }}>
          {[...items, ...items.slice(0, PEEK)].map((s, j) => (
            <div key={j} className={`inst-card${SHOW_INST_NAMES ? '' : ' logo-only'}`}>
              <span className="inst-logo">{s.logo && <img src={s.logo} alt={SHOW_INST_NAMES ? '' : s.nombre} width={160} height={120} loading="lazy" decoding="async" />}</span>
              {SHOW_INST_NAMES && <strong>{s.nombre}</strong>}
              {(s.isExample || s.logoIsExample) && <span className="tag-ej">{s.isExample ? 'Ejemplo' : 'Logo de ejemplo'}</span>}
              {SHOW_INST_NAMES && s.municipio && <span className="inst-mun">{s.municipio}</span>}
            </div>
          ))}
        </div>
      </div>
      {auto && <div className="inst-prog" aria-hidden="true"><i key={`${cur}-${active}-${running}`} className={`run${running ? '' : ' paused'}`} style={{ ['--dur' as string]: `${DUR}ms` }} /></div>}
      <div className="inst-bar">
        {auto ? <button className="nav" aria-label={userPaused ? 'Reproducir el carrusel de instituciones' : 'Pausar el carrusel de instituciones'} onClick={() => setUserPaused(p => !p)}>
          {userPaused ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}
        </button> : <span />}
        <div className="right">
          <button className="nav prev" aria-label={`Institución anterior: ${items[(cur - 1 + n) % n].nombre} (${(cur - 1 + n) % n + 1} de ${n})`} onClick={prev}><Chev d="m15 6-6 6 6 6" /></button>
          <span className="count" aria-hidden="true">{cur + 1} / {n}</span>
          <button className="nav next" aria-label={`Institución siguiente: ${items[(cur + 1) % n].nombre} (${(cur + 1) % n + 1} de ${n})`} onClick={next}><Chev d="m9 6 6 6-6 6" /></button>
        </div>
      </div>
    </div>
  )
}

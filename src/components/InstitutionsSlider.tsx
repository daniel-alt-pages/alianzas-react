import { useEffect, useState } from 'react'
import type { Institucion } from '../data/historias'
import { useReducedMotion } from './useReducedMotion'
const DUR = 5000
const Chev = ({ d }: { d: string }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d={d} /></svg>
interface Props { titulo: string; items: Institucion[]; isPlaceholder: boolean; active: boolean }
export function InstitutionsSlider({ titulo, items, isPlaceholder, active }: Props) {
  const n = items.length, reduce = useReducedMotion()
  const [i, setI] = useState(0), [userPaused, setUserPaused] = useState(false), [hover, setHover] = useState(false), [focus, setFocus] = useState(false)
  const auto = !reduce && n > 1, running = auto && active && !userPaused && !hover && !focus
  useEffect(() => { if (!running) return; const t = setTimeout(() => setI(k => (k + 1) % n), DUR); return () => clearTimeout(t) }, [running, i, n])
  const go = (k: number) => setI((k + n) % n)
  return (
    <div className="inst" data-placeholder={isPlaceholder || undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false) }}>
      <h4>{titulo}</h4>
      <ul className="sr">{items.map(s => <li key={s.nombre}>{s.nombre}{s.municipio ? `, ${s.municipio}` : ''}</li>)}</ul>
      <div className="inst-view" aria-hidden="true">
        <div className="inst-row" style={{ transform: `translateX(${-i * 100}%)` }}>
          {items.map((s, j) => <div key={s.nombre} className="inst-card" style={{ visibility: Math.abs(j - i) > 1 ? 'hidden' : undefined }}>{s.logo && <img src={s.logo} alt="" width={56} height={56} loading="lazy" decoding="async" />}<div><strong>{s.nombre}</strong>{s.municipio && <span>{s.municipio}</span>}{(s.isExample || s.logoIsExample) && <span className="tag-ej">{s.isExample ? 'Ejemplo' : 'Logo de ejemplo'}</span>}</div></div>)}
        </div>
      </div>
      {auto && <div className="inst-prog" aria-hidden="true"><i key={`${i}-${active}`} className={`run${running ? '' : ' paused'}`} style={{ ['--dur' as string]: `${DUR}ms` }} /></div>}
      <div className="inst-bar">
        {auto ? <button className="nav" aria-label={userPaused ? 'Reanudar el carrusel de instituciones' : 'Pausar el carrusel de instituciones'} aria-pressed={userPaused} onClick={() => setUserPaused(p => !p)}>
          {userPaused ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}
        </button> : <span />}
        <div className="right">
          <button className="nav prev" aria-label={`Institución anterior: ${items[(i - 1 + n) % n].nombre} (${(i - 1 + n) % n + 1} de ${n})`} onClick={() => go(i - 1)}><Chev d="m15 6-6 6 6 6" /></button>
          <span className="count" aria-hidden="true">{i + 1} / {n}</span>
          <button className="nav next" aria-label={`Institución siguiente: ${items[(i + 1) % n].nombre} (${(i + 1) % n + 1} de ${n})`} onClick={() => go(i + 1)}><Chev d="m9 6 6 6-6 6" /></button>
        </div>
      </div>
    </div>
  )
}

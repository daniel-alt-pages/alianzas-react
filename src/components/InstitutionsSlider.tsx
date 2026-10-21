import { useEffect, useRef, useState } from 'react'
import { Badge } from './Badge'
import type { Historia, Institucion } from '../data/historias'
/** Prueba: tarjetas solo con logo. Poner en true para volver a mostrar nombre y municipio. */
export const SHOW_INST_NAMES = false
/** Segundos por tarjeta en la cinta continua */
const SEG_POR_TARJETA = 3
const DEPARTAMENTO: Record<Historia['id'], string> = { bogota: 'Bogotá D.C.', soacha: 'Cundinamarca', casanare: 'Casanare' }
function ubicacion(s: Institucion, region: Historia['id']) {
  const dep = DEPARTAMENTO[region]
  if (region === 'bogota' || !s.municipio) return dep
  return `${s.municipio}, ${dep}`
}
interface Props { titulo: string; items: Institucion[]; isPlaceholder: boolean; active: boolean; region: Historia['id'] }
interface CardProps { s: Institucion; j: number; dup?: boolean; loc: string; flipped: boolean; onFlip: (v: boolean | 'toggle') => void }
function Card({ s, j, dup, loc, flipped, onFlip }: CardProps) {
  const ptr = useRef<string>('')
  const ej = (s.isExample || s.logoIsExample) && <Badge>{s.isExample ? 'Ejemplo' : 'Logo de ejemplo'}</Badge>
  return (
    <li className="inst-cell" aria-hidden={dup || undefined} style={{ ['--k' as string]: j % 6 }}>
      <button type="button" className="inst-flip" data-flipped={flipped || undefined} tabIndex={dup ? -1 : undefined}
        aria-label={`Ver datos de ${s.nombre}`} aria-expanded={flipped}
        onPointerDown={e => { ptr.current = e.pointerType }}
        onPointerEnter={e => { if (e.pointerType === 'mouse') onFlip(true) }}
        onPointerLeave={e => { if (e.pointerType === 'mouse') onFlip(false) }}
        onClick={e => { if (e.detail !== 0 && ptr.current === 'mouse') onFlip(true); else { if (e.detail !== 0 && flipped) e.currentTarget.blur(); onFlip('toggle') } }}
        onKeyDown={e => { if (e.key === 'Escape' && flipped) { e.stopPropagation(); onFlip(false) } }}>
        <span className="inst-flip-in">
          <span className={`inst-card inst-face inst-front${SHOW_INST_NAMES ? '' : ' logo-only'}`}>
            <span className="inst-logo">{s.logo && <img src={s.logo} alt="" width={160} height={120} loading="lazy" decoding="async" />}</span>
            {SHOW_INST_NAMES && <strong>{s.nombre}</strong>}
            {ej}
            {SHOW_INST_NAMES && s.municipio && <span className="inst-mun">{s.municipio}</span>}
          </span>
          <span className="inst-card inst-face inst-back" aria-hidden="true">
            <strong className="inst-back-name">{s.nombre}</strong>
            <span className="inst-back-loc">{loc}</span>
            {ej}
          </span>
        </span>
      </button>
      {!dup && <span className="sr" aria-live="polite">{flipped ? `${s.nombre}. ${loc}` : ''}</span>}
    </li>
  )
}
export function InstitutionsSlider({ titulo, items, isPlaceholder, active, region }: Props) {
  const [paused, setPaused] = useState(false)
  const [flip, setFlip] = useState<string | null>(null)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (flip === null) return
    const out = (e: PointerEvent) => { if (!(e.target as Element).closest?.('.inst-flip')) setFlip(null) }
    document.addEventListener('pointerdown', out)
    return () => document.removeEventListener('pointerdown', out)
  }, [flip])
  useEffect(() => { if (!active) setFlip(null) }, [active])
  const card = (s: Institucion, j: number, dup?: boolean) => {
    const key = `${dup ? 'd' : ''}${j}`
    return <Card key={key} s={s} j={j} dup={dup} loc={ubicacion(s, region)} flipped={flip === key}
      onFlip={v => setFlip(f => (v === 'toggle' ? (f === key ? null : key) : v ? key : f === key ? null : f))} />
  }
  return (
    <div ref={root} className="inst" data-placeholder={isPlaceholder || undefined} data-active={active || undefined} data-paused={paused || undefined} data-hold={flip !== null || undefined}>
      <h4 id={`inst-${titulo.replace(/\W+/g, '-')}`}>{titulo}</h4>
      <div className="inst-view marquee">
        <ul className="inst-row" aria-label={titulo} style={{ ['--dur' as string]: `${items.length * SEG_POR_TARJETA}s` }}>
          {items.map((s, j) => card(s, j))}
          {items.map((s, j) => card(s, j, true))}
        </ul>
      </div>
      <button type="button" className="inst-pause" aria-label={paused ? 'Reanudar cinta' : 'Pausar cinta'} onClick={() => setPaused(p => !p)}>
        {paused ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z" /></svg>
          : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}
      </button>
    </div>
  )
}

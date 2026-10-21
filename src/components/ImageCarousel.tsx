import { useRef, useState, type KeyboardEvent } from 'react'
import type { Imagen } from '../data/historias'
import { useReducedMotion } from './useReducedMotion'
const Chev = ({ d }: { d: string }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d={d} /></svg>
export function ImageCarousel({ imagenes, label, eager }: { imagenes: Imagen[]; label: string; eager: boolean }) {
  const n = imagenes.length, [i, setI] = useState(0), [dir, setDir] = useState(0), [live, setLive] = useState(''), [bump, setBump] = useState(0)
  const reduce = useReducedMotion(), x0 = useRef<number | null>(null)
  const go = (k: number, d: number) => { const j = (k + n) % n; if (j === i) return; setDir(reduce ? 0 : d); setI(j); setLive(`Imagen ${j + 1} de ${n}`); setBump(b => b + 1) }
  const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') { go(i - 1, -1); e.preventDefault() } if (e.key === 'ArrowRight') { go(i + 1, 1); e.preventDefault() } }
  return (
    <div className="carousel" role="region" aria-roledescription="carrusel" aria-label={`Imágenes: ${label}`} onKeyDown={onKey}>
      <div className="track" tabIndex={0} style={{ aspectRatio: `${imagenes[0].width} / ${imagenes[0].height}` }}
        onPointerDown={e => { x0.current = e.clientX }}
        onPointerUp={e => { if (x0.current === null) return; const dx = e.clientX - x0.current; x0.current = null; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1) }}>
        {imagenes.map((im, j) => (
          <figure key={im.src} className={`slide${j === i ? ' is-active' : ''}`} role="group" aria-roledescription="diapositiva" aria-label={`${j + 1} de ${n}`}
            aria-hidden={j !== i || undefined} data-src={im.src} data-example={im.isExample || undefined} style={{ ['--dx' as string]: `${dir * 12}px` }}>
            <img src={im.src} alt={im.alt} width={im.width} height={im.height} decoding="async"
              loading={eager && j === 0 ? 'eager' : 'lazy'} fetchPriority={eager && j === 0 ? 'high' : undefined} draggable={false} />
            {im.isExample && <span className="tag ex" aria-hidden="true">Imagen de ejemplo</span>}
          </figure>
        ))}
      </div>
      <p className="sr" aria-live="polite" aria-atomic="true">{live}</p>
      <div className="bar">
        <div className="dots">
          {imagenes.map((_, j) => <button key={j} className="dot" aria-label={`Ir a la imagen ${j + 1}`} aria-current={j === i || undefined} onClick={() => go(j, j > i ? 1 : -1)} />)}
        </div>
        <div className="right">
          <button className="nav prev" aria-label="Imagen anterior" onClick={() => go(i - 1, -1)}><Chev d="m15 6-6 6 6 6" /></button>
          <span key={bump} className={`count${bump ? ' bump' : ''}`} aria-hidden="true">{i + 1} / {n}</span>
          <button className="nav next" aria-label="Imagen siguiente" onClick={() => go(i + 1, 1)}><Chev d="m9 6 6 6-6 6" /></button>
        </div>
      </div>
    </div>
  )
}

import { useRef, type KeyboardEvent } from 'react'
import type { Imagen } from '../data/historias'
import { useReducedMotion } from './useReducedMotion'
const Chev = ({ d }: { d: string }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={d} /></svg>
/** Foto con swipe nativo (scroll-snap). Flechas solo en escritorio (CSS); teclado ←/→. */
export function Gallery({ imagenes, label, eager }: { imagenes: Imagen[]; label: string; eager: boolean }) {
  const track = useRef<HTMLDivElement>(null), reduce = useReducedMotion()
  const go = (d: number) => {
    const t = track.current; if (!t) return
    const w = t.clientWidth, i = Math.round(t.scrollLeft / w), n = imagenes.length
    t.scrollTo({ left: ((i + d + n) % n) * w, behavior: reduce ? 'auto' : 'smooth' })
  }
  const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) } if (e.key === 'ArrowRight') { e.preventDefault(); go(1) } }
  return (
    <div className="gallery" role="region" aria-roledescription="carrusel" aria-label={`Fotos: ${label}`} onKeyDown={onKey}>
      <div className="g-track" ref={track} tabIndex={0}>
        {imagenes.map((im, j) => (
          <figure key={im.src} className="g-slide" role="group" aria-roledescription="foto" aria-label={`${j + 1} de ${imagenes.length}`}>
            <img src={im.src} alt={im.alt} width={im.width} height={im.height} decoding="async" draggable={false}
              loading={eager && j === 0 ? 'eager' : 'lazy'} />
          </figure>
        ))}
      </div>
      {imagenes.length > 1 && <>
        <button type="button" className="g-arrow g-prev" aria-label="Foto anterior" onClick={() => go(-1)}><Chev d="m15 6-6 6 6 6" /></button>
        <button type="button" className="g-arrow g-next" aria-label="Foto siguiente" onClick={() => go(1)}><Chev d="m9 6 6 6-6 6" /></button>
      </>}
    </div>
  )
}

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Imagen } from '../data/historias'
import { useReducedMotion } from './useReducedMotion'
const DUR = 4000
const Chev = ({ d }: { d: string }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d={d} /></svg>
const PREV = 'm15 6-6 6 6 6', NEXT = 'm9 6 6 6-6 6'
interface Props { imagenes: Imagen[]; label: string; eager: boolean; active: boolean }
export function ImageCarousel({ imagenes, label, eager, active }: Props) {
  const n = imagenes.length, [i, setI] = useState(0), [dir, setDir] = useState(0), [live, setLive] = useState('')
  const reduce = useReducedMotion(), x0 = useRef<number | null>(null)
  const [userPaused, setUserPaused] = useState(false), [hover, setHover] = useState(false), [focus, setFocus] = useState(false)
  const [docHidden, setDocHidden] = useState(() => typeof document !== 'undefined' && document.hidden)
  useEffect(() => { const f = () => setDocHidden(document.hidden); document.addEventListener('visibilitychange', f); return () => document.removeEventListener('visibilitychange', f) }, [])
  const auto = !reduce && n > 1, running = auto && active && !userPaused && !hover && !focus && !docHidden
  const show = (k: number, d: number, manual: boolean) => {
    const j = (k + n) % n; if (j === i) return
    setDir(reduce ? 0 : d); setI(j); setLive(manual ? `Foto ${j + 1} de ${n}` : '')
  }
  const go = (k: number, d: number) => show(k, d, true)
  useEffect(() => { if (!running) return; const t = setTimeout(() => show(i + 1, 1, false), DUR); return () => clearTimeout(t) })
  const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') { go(i - 1, -1); e.preventDefault() } if (e.key === 'ArrowRight') { go(i + 1, 1); e.preventDefault() } }
  const prevLbl = 'Foto anterior', nextLbl = 'Foto siguiente'
  return (
    <div className="carousel" role="region" aria-roledescription="carrusel" aria-label={`Imágenes: ${label}`} onKeyDown={onKey}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false) }}>
      <div className="stage">
        <button className="nav side side-prev" aria-label={prevLbl} onClick={() => go(i - 1, -1)}><Chev d={PREV} /></button>
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
        <button className="nav side side-next" aria-label={nextLbl} onClick={() => go(i + 1, 1)}><Chev d={NEXT} /></button>
      </div>
      <p className="sr" aria-live="polite" aria-atomic="true">{live}</p>
      {auto && <div className="photo-ctl"><button className="nav play" aria-label={userPaused ? 'Reproducir el carrusel de imágenes' : 'Pausar el carrusel de imágenes'} onClick={() => setUserPaused(p => !p)}>
        {userPaused ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z" /></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>}
      </button>
      <button className="nav prev mob" aria-label={prevLbl} onClick={() => go(i - 1, -1)}><Chev d={PREV} /></button>
      <button className="nav next mob" aria-label={nextLbl} onClick={() => go(i + 1, 1)}><Chev d={NEXT} /></button></div>}
    </div>
  )
}

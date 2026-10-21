import { useEffect, useRef } from 'react'
import type { Historia } from '../data/historias'
import { AlliesBlock } from './AlliesBlock'
import { InstitutionsSlider } from './InstitutionsSlider'
import { ImageCarousel } from './ImageCarousel'
export function StoryPanel({ h, active, eager }: { h: Historia; active: boolean; eager: boolean }) {
  const ref = useRef<HTMLDivElement>(null), first = useRef(true)
  useEffect(() => { const p = ref.current; if (!p || !active) return; if (first.current) { first.current = false; return } p.classList.remove('enter'); void p.offsetWidth; p.classList.add('enter') }, [active])
  return (
    <div ref={ref} className="panel" role="tabpanel" id={`panel-${h.id}`} aria-labelledby={`tab-${h.id}`} tabIndex={0} hidden={!active}>
      <div className="copy">
        {h.isExample && <span className="tag">Texto de ejemplo</span>}
        {h.label && <span className="label">{h.label}</span>}
        <h3>{h.titulo}</h3>
        {h.bajada && <p className="bajada">{h.bajada.texto}{h.bajada.isExample && <span className="tag-ej">Ejemplo</span>}</p>}
        <p>{h.resumen}</p>
        {h.colaboradores && <AlliesBlock bloque={h.colaboradores} />}
        {h.nota && <p className="note">{h.nota}</p>}
        {h.instituciones && <InstitutionsSlider {...h.instituciones} active={active} />}
        <a className="link" href={h.enlace.href} target="_blank" rel="noopener" data-example={h.enlace.isExample || undefined}
          aria-label={`${h.enlace.texto} en Instagram (se abre en una pestaña nueva)`}>{h.enlace.texto} <span aria-hidden="true">↗</span></a>
        {h.enlace.isExample && <span className="tag-ej tag-ej-link">Ejemplo</span>}
      </div>
      <ImageCarousel imagenes={h.imagenes} label={h.titulo} eager={eager} />
    </div>
  )
}

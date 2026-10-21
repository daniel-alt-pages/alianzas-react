import { Badge } from './Badge'
import { useEffect, useRef, useState } from 'react'
import type { Historia } from '../data/historias'
import { AlliesBlock } from './AlliesBlock'
import { InstitutionsSlider } from './InstitutionsSlider'
import { ImageCarousel } from './ImageCarousel'
export function StoryPanel({ h, active, eager }: { h: Historia; active: boolean; eager: boolean }) {
  const ref = useRef<HTMLDivElement>(null), first = useRef(true)
  // En móvil la foto va arriba: se renderiza primero para que el orden de tabulación siga el visual
  const q = '(max-width: 879px)'
  const [narrow, setNarrow] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(q).matches)
  useEffect(() => { const m = matchMedia(q); const f = (e: MediaQueryListEvent) => setNarrow(e.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  useEffect(() => { const p = ref.current; if (!p || !active) return; if (first.current) { first.current = false; return } p.classList.remove('enter'); void p.offsetWidth; p.classList.add('enter') }, [active])
  const carousel = <ImageCarousel imagenes={h.imagenes} label={h.titulo} eager={eager} active={active} />
  return (
    <div ref={ref} className="panel" role="tabpanel" id={`panel-${h.id}`} aria-labelledby={`tab-${h.id}`} tabIndex={0} hidden={!active}>
      {narrow && carousel}
      <div className="copy">
        {h.isExample && <span className="tag">Texto de ejemplo</span>}
        {h.label && <span className="label">{h.label}</span>}
        <h3>{h.titulo}</h3>
        {h.bajada && <p className="bajada">{h.bajada.texto}{h.bajada.isExample && <Badge />}</p>}
        <p>{h.resumen}</p>
        {h.colaboradores && <AlliesBlock bloque={h.colaboradores} />}
        {h.nota && <p className="note">{h.nota}</p>}
        <div className="ig-row">
          <a className="ig-link" href={h.enlace.href} target="_blank" rel="noopener" data-example={h.enlace.isExample || undefined}
            aria-label={`Ver en Instagram: ${h.enlace.texto === 'Ver en Instagram' ? `publicación «${h.titulo}»` : h.enlace.texto} (se abre en una pestaña nueva)`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            Ver en Instagram <span aria-hidden="true">↗</span>
          </a>
          {h.enlace.isExample && <Badge />}
        </div>
      </div>
      {!narrow && carousel}
      {h.instituciones && <div className="inst-wide"><InstitutionsSlider {...h.instituciones} active={active} region={h.id} /></div>}
    </div>
  )
}

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useReducedMotion } from './useReducedMotion'
interface Props { items: { id: string; label: string }[]; active: string; onChange: (id: string) => void }
export function Tabs({ items, active, onChange }: Props) {
  const bar = useRef<HTMLDivElement>(null), refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [ink, setInk] = useState(''), [atEnd, setAtEnd] = useState(false), reduce = useReducedMotion()
  const edge = () => { const b = bar.current; if (b) setAtEnd(b.scrollLeft + b.clientWidth >= b.scrollWidth - 2) }
  useLayoutEffect(() => {
    const place = () => { const t = refs.current[active]; if (t) setInk(`translateX(${t.offsetLeft}px) scaleX(${t.offsetWidth})`); edge() }
    place(); addEventListener('resize', place); document.fonts?.ready.then(place)
    return () => removeEventListener('resize', place)
  }, [active])
  const key = (e: KeyboardEvent, k: number) => {
    const n = items.length, map: Record<string, number> = { ArrowRight: (k + 1) % n, ArrowLeft: (k - 1 + n) % n, Home: 0, End: n - 1 }
    if (!(e.key in map)) return
    e.preventDefault(); const id = items[map[e.key]].id; onChange(id)
    const t = refs.current[id]; t?.focus({ preventScroll: true }); t?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <div ref={bar} className={`tabs${atEnd ? ' at-end' : ''}`} role="tablist" aria-label="Historias en el territorio" onScroll={edge}>
      {items.map((t, k) => (
        <button key={t.id} ref={el => { refs.current[t.id] = el }} className="tab" role="tab" id={`tab-${t.id}`} aria-controls={`panel-${t.id}`}
          aria-selected={t.id === active} tabIndex={t.id === active ? 0 : -1} onClick={() => onChange(t.id)} onKeyDown={e => key(e, k)}>{t.label}</button>
      ))}
      <span className="ink" aria-hidden="true" style={{ transform: ink }} />
    </div>
  )
}

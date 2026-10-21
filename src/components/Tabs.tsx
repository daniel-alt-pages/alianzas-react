import { useRef, type KeyboardEvent } from 'react'
interface Props { items: { id: string; label: string }[]; active: string; onChange: (id: string) => void }
export function Tabs({ items, active, onChange }: Props) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const key = (e: KeyboardEvent, k: number) => {
    const n = items.length, map: Record<string, number> = { ArrowRight: (k + 1) % n, ArrowLeft: (k - 1 + n) % n, Home: 0, End: n - 1 }
    if (!(e.key in map)) return
    e.preventDefault(); const id = items[map[e.key]].id; onChange(id); refs.current[id]?.focus()
  }
  return (
    <div className="tabs" role="tablist" aria-label="Historias en el territorio">
      {items.map((t, k) => (
        <button key={t.id} ref={el => { refs.current[t.id] = el }} type="button" className="tab" role="tab" id={`tab-${t.id}`} aria-controls={`panel-${t.id}`}
          aria-selected={t.id === active} tabIndex={t.id === active ? 0 : -1} onClick={() => onChange(t.id)} onKeyDown={e => key(e, k)}>{t.label}</button>
      ))}
    </div>
  )
}

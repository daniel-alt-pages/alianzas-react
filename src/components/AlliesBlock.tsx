import { useId, useRef } from 'react'
import { Badge } from './Badge'
import type { BloqueColaboradores, Colaborador } from '../data/historias'
function Mark({ c }: { c: Colaborador }) {
  if (!c.logo) return null
  return <span className="ally-logo" data-wide={c.logo.width / c.logo.height > 2.5 || undefined} data-example={c.logo.isExample || undefined}><img src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} loading="lazy" decoding="async" /></span>
}
function LogoModal({ c }: { c: Colaborador }) {
  const ref = useRef<HTMLDialogElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const tid = useId()
  const m = c.modal!
  const open = () => {
    const d = ref.current; if (!d) return
    d.showModal()
    d.querySelector<HTMLElement>('button, a')?.focus()
  }
  const close = () => ref.current?.close()
  return (
    <>
      <button ref={btn} type="button" className="ally ally-only-logo" aria-label={`${c.nombre}: ver enlaces`} aria-haspopup="dialog" onClick={open}>
        {c.logo && <span className="ally-logo ally-logo-lg"><img src={c.logo.src} alt={c.nombre} width={c.logo.width} height={c.logo.height} loading="lazy" decoding="async" /></span>}
      </button>
      <dialog ref={ref} className="ally-dialog" aria-labelledby={tid}
        onClose={() => btn.current?.focus()}
        onClick={e => { if (e.target === e.currentTarget) close() }}>
        <div className="ally-dialog-in">
          <button type="button" className="ally-dialog-x" aria-label="Cerrar" onClick={close}>✕</button>
          <h3 id={tid}>{m.titulo}</h3>
          <div className="ally-dialog-links">
            {m.enlaces.map(l => <a key={l.href} className="link" href={l.href} target="_blank" rel="noopener noreferrer">{l.texto}<span className="sr-only"> (abre en una pestaña nueva)</span></a>)}
          </div>
        </div>
      </dialog>
    </>
  )
}
export function AlliesBlock({ bloque }: { bloque: BloqueColaboradores }) {
  return (
    <div className="allies">
      <h4>{bloque.titulo}</h4>
      <ul>
        {bloque.items.map((c, k) => {
          if (c.modal) return <li key={k}><LogoModal c={c} /></li>
          if (c.soloLogo && c.url && c.logo) return <li key={k}><a className="ally ally-only-logo" href={c.url} target="_blank" rel="noopener" aria-label={c.ariaLabel ?? c.nombre}><span className="ally-logo ally-logo-lg"><img src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} loading="lazy" decoding="async" /></span></a></li>
          const body = <><Mark c={c} /><span className="ally-txt"><strong>{c.nombre}</strong>{c.rol && <span className="ally-rol">{c.rol}</span>}{c.logo?.isExample && <Badge />}{c.handle && <span className="ally-handle">@{c.handle} <span aria-hidden="true">↗</span></span>}</span></>
          return (
            <li key={k} className={c.isPlaceholder ? 'ph' : undefined}>
              {c.url
                ? <a className="ally" href={c.url} target="_blank" rel="noopener" aria-label={`${c.nombre}${c.logo?.isExample ? ' (logo de ejemplo)' : ''}, @${c.handle} en Instagram (se abre en una pestaña nueva)`}>{body}</a>
                : <div className="ally">{body}</div>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

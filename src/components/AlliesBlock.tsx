import type { BloqueColaboradores, Colaborador } from '../data/historias'
function Mark({ c }: { c: Colaborador }) {
  if (c.logo) return <span className="ally-logo"><img src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} loading="lazy" decoding="async" /></span>
  if (c.logoPendiente) return <span className="ally-logo ally-logo-ph" data-logo-pendiente="true" aria-hidden="true">Logo<br />pendiente</span>
  return null
}
export function AlliesBlock({ bloque }: { bloque: BloqueColaboradores }) {
  return (
    <div className="allies">
      <h4>{bloque.titulo}</h4>
      <ul>
        {bloque.items.map((c, k) => {
          const body = <><Mark c={c} /><span className="ally-txt"><strong>{c.nombre}</strong>{c.rol && <span className="ally-rol">{c.rol}</span>}{c.handle && <span className="ally-handle">@{c.handle} <span aria-hidden="true">↗</span></span>}</span></>
          return (
            <li key={k} className={c.isPlaceholder ? 'ph' : undefined}>
              {c.url
                ? <a className="ally" href={c.url} target="_blank" rel="noopener" aria-label={`${c.nombre}, @${c.handle} en Instagram (se abre en una pestaña nueva)`}>{body}</a>
                : <div className="ally">{body}</div>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

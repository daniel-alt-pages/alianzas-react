import { Badge } from './Badge'
import type { BloqueColaboradores, Colaborador } from '../data/historias'
function Ally({ c }: { c: Colaborador }) {
  const body = <>{c.logo && <img className="a-logo" src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} loading="lazy" decoding="async" />}
    <span className="a-txt"><strong>{c.nombre}</strong>{c.rol && <span>{c.rol}</span>}{c.logo?.isExample && <Badge />}</span></>
  return c.url
    ? <a className="ally" href={c.url} target="_blank" rel="noopener" aria-label={`${c.nombre}${c.logo?.isExample ? ' (logo de ejemplo)' : ''}${c.handle ? `, @${c.handle} en Instagram` : ''} (abre en una pestaña nueva)`}>{body}</a>
    : <div className="ally">{body}</div>
}
export function AlliesBlock({ bloque }: { bloque: BloqueColaboradores }) {
  return (
    <div className="allies wrap">
      <h3 className="sec-title">{bloque.titulo}</h3>
      <ul className="a-list">{bloque.items.map((c, k) => <li key={k} data-haslogo={!!c.logo || undefined}><Ally c={c} /></li>)}</ul>
    </div>
  )
}

import { Badge } from './Badge'
import type { BloqueColaboradores, Colaborador } from '../data/historias'
const nt = ' (abre en una pestaña nueva)'
function Ally({ c }: { c: Colaborador }) {
  if (c.logoIncluyeNombre && c.logo) {
    const img = <img className="a-logo" src={c.logo.src} alt={c.nombre + (c.url ? nt : '')} width={c.logo.width} height={c.logo.height} loading="lazy" decoding="async" />
    return c.url ? <a className="ally ally-logo" href={c.url} target="_blank" rel="noopener" aria-label={c.nombre + nt}>{img}</a> : <div className="ally ally-logo">{img}</div>
  }
  const body = <>{c.logo && <img className="a-logo" src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} loading="lazy" decoding="async" />}
    <span className="a-txt"><strong>{c.nombre}</strong>{c.rol && <span>{c.rol}</span>}{c.logo?.isExample && <Badge />}</span></>
  return c.url
    ? <a className="ally" href={c.url} target="_blank" rel="noopener" aria-label={`${c.nombre}${c.logo?.isExample ? ' (logo de ejemplo)' : ''}${c.handle ? `, @${c.handle} en Instagram` : ''}${nt}`}>{body}</a>
    : <div className="ally">{body}</div>
}
export function AlliesBlock({ bloque }: { bloque: BloqueColaboradores }) {
  // Agrupa aliados con el mismo `grupo` en una sola tarjeta (en la posición del primero)
  const grupos: Colaborador[][] = []
  for (const c of bloque.items) { const g = c.grupo && grupos.find(x => x[0].grupo === c.grupo); if (g) g.push(c); else grupos.push([c]) }
  return (
    <div className="allies wrap">
      <h3 className="sec-title">{bloque.titulo}</h3>
      <ul className="a-list">{grupos.map((g, k) => g.length > 1
        ? <li key={k} className="a-group" data-haslogo><ul className="a-group-list">{g.map((c, j) => <li key={j}><Ally c={c} /></li>)}</ul></li>
        : <li key={k} data-haslogo={!!g[0].logo || undefined}><Ally c={g[0]} /></li>)}</ul>
    </div>
  )
}

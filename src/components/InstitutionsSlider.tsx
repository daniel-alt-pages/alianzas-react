import type { Institucion } from '../data/historias'
/** Prueba: tarjetas solo con logo. Poner en true para volver a mostrar nombre y municipio. */
export const SHOW_INST_NAMES = false
/** Segundos por tarjeta en la cinta continua */
const SEG_POR_TARJETA = 3
interface Props { titulo: string; items: Institucion[]; isPlaceholder: boolean; active: boolean }
function Card({ s, j, dup }: { s: Institucion; j: number; dup?: boolean }) {
  return (
    <li className={`inst-card${SHOW_INST_NAMES ? '' : ' logo-only'}`} aria-hidden={dup || undefined} style={{ ['--k' as string]: j % 6 }}>
      <span className="inst-logo">{s.logo && <img src={s.logo} alt={dup || SHOW_INST_NAMES ? '' : s.nombre} width={160} height={120} loading="lazy" decoding="async" />}</span>
      {SHOW_INST_NAMES && <strong>{s.nombre}</strong>}
      {(s.isExample || s.logoIsExample) && <span className="tag-ej">{s.isExample ? 'Ejemplo' : 'Logo de ejemplo'}</span>}
      {SHOW_INST_NAMES && s.municipio && <span className="inst-mun">{s.municipio}</span>}
      {!SHOW_INST_NAMES && !s.logo && <span className="sr">{s.nombre}</span>}
    </li>
  )
}
export function InstitutionsSlider({ titulo, items, isPlaceholder, active }: Props) {
  return (
    <div className="inst" data-placeholder={isPlaceholder || undefined} data-active={active || undefined}>
      <h4 id={`inst-${titulo.replace(/\W+/g, '-')}`}>{titulo}</h4>
      <ul className="sr" aria-label={titulo}>{items.map(s => <li key={s.nombre}>{s.nombre}{s.municipio ? `, ${s.municipio}` : ''}</li>)}</ul>
      <div className="inst-view marquee">
        <ul className="inst-row" aria-hidden="true" style={{ ['--dur' as string]: `${items.length * SEG_POR_TARJETA}s` }}>
          {items.map((s, j) => <Card key={j} s={s} j={j} />)}
          {items.map((s, j) => <Card key={`d${j}`} s={s} j={j} dup />)}
        </ul>
      </div>
    </div>
  )
}

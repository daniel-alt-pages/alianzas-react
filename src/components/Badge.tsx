// Etiqueta "Ejemplo" leída como elemento aparte (separador oculto antes del texto)
export function Badge({ children = 'Ejemplo', className = '' }: { children?: string; className?: string }) {
  return <span className={`tag-ej ${className}`.trim()}><span className="sr"> — </span>{children}</span>
}

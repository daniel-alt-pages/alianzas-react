import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { historias, tabInicial } from './data/historias'
import { Tabs } from './components/Tabs'
import { Gallery } from './components/Gallery'
import { AlliesBlock } from './components/AlliesBlock'
import { Marquee } from './components/Marquee'
import { Badge } from './components/Badge'
export default function App() {
  const [active, setActive] = useState<string>(tabInicial), reduce = useReducedMotion()
  const h = historias.find(x => x.id === active)!
  return (
    <main>
      <section id="alianzas" className="alianzas" aria-labelledby="alianzas-title">
        <div className="wrap">
          <header className="head">
            <h2 id="alianzas-title">Alianzas que <span className="accent">van más allá del simulacro</span></h2>
            <p className="lead">Resultados del Saber 11, acompañamiento en el aula y el trabajo con secretarías, universidades e instituciones.</p>
          </header>
          <Tabs items={historias.map(x => ({ id: x.id, label: x.tab }))} active={active} onChange={setActive} />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={h.id} role="tabpanel" id={`panel-${h.id}`} aria-labelledby={`tab-${h.id}`}
            initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: 'easeOut' }}>
            <div className="panel wrap">
              <Gallery imagenes={h.imagenes} label={h.titulo} eager={h.id === tabInicial} />
              <div className="copy">
                <h3>{h.titulo}</h3>
                {h.bajada && <p className="bajada">{h.bajada.texto}{h.bajada.isExample && <Badge />}</p>}
                <p>{h.resumen}</p>
                {h.nota && <p>{h.nota}</p>}
                <p className="ig">
                  <a href={h.enlace.href} target="_blank" rel="noopener" aria-label={`Ver en Instagram: ${h.enlace.texto} (abre en una pestaña nueva)`}>Ver en Instagram <span aria-hidden="true">↗</span></a>
                  {h.enlace.isExample && <Badge />}
                </p>
              </div>
            </div>
            {h.colaboradores && <AlliesBlock bloque={h.colaboradores} />}
            {h.instituciones && <Marquee titulo={h.instituciones.titulo} items={h.instituciones.items} />}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  )
}

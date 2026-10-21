import { useState } from 'react'
import { historias, tabInicial } from './data/historias'
import { Tabs } from './components/Tabs'
import { StoryPanel } from './components/StoryPanel'
export default function App() {
  const [active, setActive] = useState<string>(tabInicial)
  return (
    <main>
      <section id="alianzas" className="alianzas" aria-labelledby="alianzas-title" data-tema={active === 'bogota' ? 'azul' : 'rojo'}>
        <div className="wrap">
          <header className="head">
            <span className="eyebrow">En el territorio</span>
            <h2 id="alianzas-title">Alianzas que <span className="accent">van más allá del simulacro</span></h2>
            <p className="lead">Resultados del Saber 11, acompañamiento en el aula y el trabajo con secretarías, universidades e instituciones.</p>
          </header>
          <Tabs items={historias.map(h => ({ id: h.id, label: h.tab }))} active={active} onChange={setActive} />
          <div className="panels">
            {historias.map(h => <StoryPanel key={h.id} h={h} active={h.id === active} eager={h.id === tabInicial} />)}
          </div>
        </div>
      </section>
    </main>
  )
}

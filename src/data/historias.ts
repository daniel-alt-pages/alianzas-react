// Fuente única de contenido. Para usar imágenes reales: cambiar src/alt y poner isExample: false.
export interface Imagen { src: string; alt: string; isExample: boolean; width: number; height: number }
const W = 1080, H = 1350
const real = (src: string, alt: string): Imagen => ({ src, alt, isExample: false, width: W, height: H })
export interface Logo { src: string; alt: string; width: number; height: number; fuente: string; isExample?: boolean }
export interface Colaborador {
  nombre: string; rol?: string; handle?: string; url?: string; isPlaceholder?: boolean
  ariaLabel?: string    // aria-label del enlace (solo logo)
  soloLogo?: boolean     // muestra solo el logo (sin texto visible)
  modal?: { titulo: string; enlaces: { texto: string; href: string }[] }  // el logo abre un diálogo con enlaces
  logo?: Logo            // logo oficial, o de ejemplo con isExample: true
}
export interface BloqueColaboradores { titulo: string; items: Colaborador[] }
export interface Institucion {
  nombre: string; municipio?: string; logo?: string
  logoIsExample?: boolean   // logo de ejemplo (iniciales), reemplazar por el real
  isExample?: boolean       // nombre de ejemplo
  sinNombreReal?: boolean   // PENDIENTE: no tenemos el nombre real
}
export interface Enlace { texto: string; href: string; isExample?: boolean }
export interface Historia {
  id: 'bogota' | 'soacha' | 'casanare'
  tab: string
  label?: string
  bajada?: { texto: string; isExample?: boolean }  // línea descriptiva bajo el título
  isExample?: boolean      // muestra la etiqueta "Texto de ejemplo"
  titulo: string
  resumen: string
  colaboradores?: BloqueColaboradores
  nota?: string
  instituciones?: { titulo: string; items: Institucion[]; isPlaceholder: boolean }
  enlace: Enlace
  imagenes: Imagen[]
}

export const historias: Historia[] = [
  {
    id: 'bogota', tab: 'Jóvenes Bogotá',
    titulo: 'PreICFES Gratuito Jóvenes Bogotá',
    // EJEMPLO: sin cifra verificada; línea descriptiva no numérica
    bajada: { texto: 'Una cohorte, todo un calendario, una misma meta', isExample: true },
    resumen: 'Recordamos con orgullo el camino recorrido junto a la cohorte del PreICFES Gratuito Jóvenes Bogotá, tras la publicación oficial de los resultados del Saber 11.',
    colaboradores: { titulo: 'Lo hicieron posible', items: [{ nombre: 'Equipo y colaboradores del PreICFES Gratuito Jóvenes Bogotá' }] },
    nota: 'SEAMOSGENIOS aportó sus herramientas técnicas y pedagógicas durante todo el calendario.',
    // PENDIENTE: instituciones de Bogotá no entregadas
    // EJEMPLO: no tenemos los nombres reales de los colegios de Bogotá
    instituciones: { titulo: 'Instituciones participantes', isPlaceholder: true, items: [1, 2, 3, 4].map(n => ({
      nombre: `Colegio aliado Bogotá ${n} (ejemplo)`, municipio: 'Bogotá', logo: `ejemplos/colegio-aliado-bogota-${n}.svg`,
      logoIsExample: true, isExample: true, sinNombreReal: true,
    })) },
    // EJEMPLO: URL del perfil, no de la publicación; reemplazar por la publicación real
    enlace: { texto: 'Ver en Instagram', href: 'https://www.instagram.com/p/Ddtyy4PkRYs/' },
    imagenes: [
      real('historias/jovenes-bogota-1.webp', 'Collage: SEAMOSGENIOS y el PreICFES Gratuito Jóvenes Bogotá, una alianza estratégica por el acceso a la educación superior en Colombia'),
      real('historias/jovenes-bogota-2.webp', 'Collage: estudiantes de la cohorte Jóvenes Bogotá con camisetas del programa en el colegio'),
      real('historias/jovenes-bogota-3.webp', 'Collage: evento del PreICFES Gratuito Jóvenes Bogotá con intervención en tarima y público en el auditorio'),
      real('historias/jovenes-bogota-4.webp', 'Collage: equipo de SEAMOSGENIOS con estudiantes y aula de simulacro, Saber 11 2026-2'),
    ],
  },
  {
    id: 'soacha', tab: 'Soacha',
    titulo: '716 estudiantes, 9 colegios, una misma meta',
    resumen: 'Llevamos el simulacro Saber 11 a 716 estudiantes de grado once en 9 instituciones oficiales de Soacha.',
    colaboradores: {
      titulo: 'Aliados que lo hicieron posible',
      items: [
        { nombre: 'Universidad Distrital Francisco José de Caldas', logo: { src: 'aliados/universidad-distrital.webp', alt: 'Logo de la Universidad Distrital Francisco José de Caldas', width: 589, height: 187, fuente: 'https://ritaprod.udistrital.edu.co/themes/RITA/images/logoud-negro.png' }, soloLogo: true, ariaLabel: 'Universidad Distrital: ver publicación en Instagram', url: 'https://www.instagram.com/p/DdsJ41FiSYO/' },
        { nombre: 'Secretaría de Educación de Soacha', logo: { src: 'aliados/secretaria-educacion-soacha.webp', alt: 'Logo de la Alcaldía de Soacha, Secretaría de Educación', width: 480, height: 86, fuente: 'https://www.soachaeducativa.edu.co/wp-content/uploads/2023/02/logo-sem-horizontall_full-color.png (copia en web.archive.org, 2025-10-23)' }, soloLogo: true, modal: { titulo: 'Secretaría de Educación y Alcaldía de Soacha', enlaces: [{ texto: 'Ir a Secretaría de Educación Soacha', href: 'https://www.soachaeducativa.edu.co/' }, { texto: 'Ir a Alcaldía', href: 'https://www.alcaldiasoacha.gov.co/' }] } },
        { nombre: 'PreICFES Gratuito Jóvenes Bogotá', logo: { src: 'aliados/preicfes-jovenes-bogota.webp', alt: 'Logo de PreICFES Gratuito Jóvenes Bogotá', width: 400, height: 400, fuente: 'Archivo enviado por Daniel (2026-10-21)' }, handle: 'preicfesjovenesbogota', url: 'https://www.instagram.com/preicfesjovenesbogota/' },
      ],
    },
    nota: 'Junto a ellos creímos en democratizar el acceso a la educación superior.',
    instituciones: { titulo: 'Las 9 instituciones', isPlaceholder: false, items: [
      { nombre: 'I.E. Gabriel García Márquez', logo: 'colegios/ie-gabriel-garcia-marquez.webp', municipio: 'Soacha' },
      { nombre: 'I.E. Buenos Aires', logo: 'colegios/ie-buenos-aires.webp', municipio: 'Soacha' },
      { nombre: 'I.E. Ciudad Latina', logo: 'colegios/ie-ciudad-latina.webp', municipio: 'Soacha' },
      { nombre: 'I.E. Las Villas', logo: 'colegios/ie-las-villas.webp', municipio: 'Soacha' },
      { nombre: 'I.E. Cazucá', logo: 'colegios/ie-cazuca.webp', municipio: 'Soacha' },
      { nombre: 'I.E. La Despensa', logo: 'colegios/ie-la-despensa.webp', municipio: 'Soacha' },
      { nombre: 'I.E. Luis Carlos Galán', logo: 'colegios/ie-luis-carlos-galan.webp', municipio: 'Soacha' },
      { nombre: 'I.E. Eugenio Díaz Castro', municipio: 'Soacha', logo: 'ejemplos/ie-eugenio-diaz-castro.svg', logoIsExample: true }, // EJEMPLO: logo
      { nombre: 'I.E. Ciudadela Sucre', logo: 'colegios/ie-ciudadela-sucre.webp', municipio: 'Soacha' },
    ] },
    // EJEMPLO: perfil de SEAMOSGENIOS; reemplazar por la publicación real
    enlace: { texto: 'Publicación simulacro Soacha (ejemplo)', href: 'https://www.instagram.com/seamosgenios/', isExample: true },
    imagenes: [
      real('historias/soacha-1.webp', 'Collage: más de 700 estudiantes participaron en una alianza institucional de preparación para las pruebas Saber 11 en Soacha'),
      real('historias/soacha-2.webp', 'Collage: equipo de tutores y estudiantes durante el simulacro en aulas de Soacha'),
      real('historias/soacha-3.webp', 'Collage: estudiantes de Soacha presentando el simulacro en la sala de cómputo'),
      real('historias/soacha-4.webp', 'Collage: 9 instituciones oficiales de Soacha participaron en el simulacro'),
    ],
  },
  {
    id: 'casanare', tab: 'Casanare',
    titulo: 'Veinte instituciones de Casanare',
    resumen: 'Un simulacro gratuito llegó a 420 estudiantes de grado undécimo en 20 instituciones de Casanare. La retroalimentación en vivo queda a cargo del equipo de tutores.',
    colaboradores: {
      titulo: 'Lo hicieron posible',
      items: [
        { nombre: 'Prof. Edwar Yesid Peña Valero', rol: 'Gestión y coordinación' },
        { nombre: 'Directivos, coordinadores y docentes de las 20 instituciones' },
      ],
    },
    nota: 'Gracias al profesor Edwar Yesid Peña Valero, quien gestionó y coordinó la aplicación del simulacro, y a los directivos, coordinadores y docentes de las 20 instituciones que abrieron sus puertas.',
    instituciones: { titulo: 'Las 20 instituciones', isPlaceholder: false, items: [
      { nombre: 'IE San Agustín', logo: 'colegios/institucion-educativa-san-agustin.webp', municipio: 'Aguazul' },
      { nombre: 'IE Sagrado Corazón', logo: 'colegios/ie-sagrado-corazon.webp', municipio: 'Paz de Ariporo' },
      { nombre: 'IED Luis Hernández Vargas', logo: 'colegios/ie-luis-hernandez-vargas.webp', municipio: 'Hato Corozal' },
      { nombre: 'IE Víctor Gómez Corredor', logo: 'colegios/institucion-educativa-victor-gomez-corredor.webp', municipio: 'El Tablón' },
      { nombre: 'IETA Antonio Nariño', logo: 'colegios/instituto-educativo-antonio-narino.webp', municipio: 'Pore' },
      { nombre: 'IE Bonifacio Gutiérrez', logo: 'colegios/institucion-educativa-bonifacio-gutierrez.webp', municipio: 'Hato Corozal' },
      { nombre: 'IE El Cusiana', logo: 'colegios/institucion-educativa-el-cusiana.webp', municipio: 'Tauramena' },
      { nombre: 'IE La Inmaculada', logo: 'colegios/institucion-educativa-la-inmaculada.webp', municipio: 'Orocué' },
      { nombre: 'IE Gaviota', logo: 'colegios/ie-gaviotas.webp', municipio: 'Maní' },
      { nombre: 'IEI Alegaxu', logo: 'colegios/ie-alegaxu.webp', municipio: 'Hato Corozal' },
      { nombre: 'IE Antonio Martínez Delgado', logo: 'colegios/ie-antonio-martinez-delgado.webp', municipio: 'Hato Corozal' },
      { nombre: 'IE Cupiagua', logo: 'colegios/institucion-educativa-cupiagua.webp', municipio: 'Aguazul' },
      { nombre: 'CC Presentación Buenahora', logo: 'colegios/cc-presentacion-buenahora.webp', municipio: 'Pore' },
      { nombre: 'IET Integrado', logo: 'colegios/iet-integrado.webp', municipio: 'Trinidad' },
      { nombre: 'IE Rafael Uribe Uribe', logo: 'colegios/ie-rafael-uribe-uribe.webp', municipio: 'Pore' },
      { nombre: 'IE Jorge Eliécer Gaitán', logo: 'colegios/ie-jorge-gaitan.webp', municipio: 'Aguazul' },
      { nombre: 'IE Salvador Camacho Roldán', logo: 'colegios/ie-salvador-camacho.webp', municipio: 'Nunchía' },
      { nombre: 'IE Luis María Jiménez', logo: 'colegios/ie-luis-maria-jimenez.webp', municipio: 'Aguazul' },
      { nombre: 'Escuela Normal Superior Monterrey', logo: 'colegios/escuela-superior-monterrey.webp' },
      { nombre: 'IE Siglo XXI', logo: 'colegios/ie-siglo-xxi.webp', municipio: 'Tauramena' },
    ] },
    enlace: { texto: 'Ver en Instagram', href: 'https://www.instagram.com/p/DaQ0I8GCQWI/' },
    // Originales SVG convertidos a WebP 1080×1350 (<200 KB)
    imagenes: [
      real('historias/casanare-1.webp', 'Simulacro con instituciones de Casanare, imagen 1 de 2'),
      real('historias/casanare-2.webp', 'Simulacro con instituciones de Casanare, imagen 2 de 2'),
    ],
  },
]
export const tabInicial: Historia['id'] = 'bogota'

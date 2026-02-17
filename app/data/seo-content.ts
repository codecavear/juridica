// SEO Content - Placeholder until Growth provides final content
// This can be replaced by loading from /root/clawd/juridica-seo-content.json

export interface SolutionPage {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  benefits: {
    icon: string
    title: string
    description: string
  }[]
  pricing: {
    plan: string
    price: string
    features: string[]
    highlighted?: boolean
  }
  cta: {
    primary: string
    secondary: string
  }
  faqs: {
    question: string
    answer: string
  }[]
}

export interface ComparisonPage {
  slug: string
  competitor: string
  title: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  comparison: {
    feature: string
    juridica: boolean | string
    competitor: boolean | string
  }[]
  whyJuridica: {
    title: string
    description: string
  }[]
  verdict: string
}

export interface GuidePage {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  content: {
    type: 'h2' | 'p' | 'list' | 'callout'
    text?: string
    items?: string[]
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

// Solution Pages
export const solutionPages: Record<string, SolutionPage> = {
  'abogados-independientes': {
    slug: 'abogados-independientes',
    title: 'Jurídica para Abogados Independientes',
    metaTitle: 'Mejor Buscador de Jurisprudencia para Abogados Independientes | Jurídica',
    metaDescription: 'El mejor buscador de jurisprudencia argentina para abogados independientes. Citas verificables, búsqueda en SAIJ, CSJN, JUBA y JUSCABA. Sin alucinaciones de IA.',
    heroTitle: 'El mejor buscador de jurisprudencia para abogados independientes',
    heroSubtitle: 'Dejá de perder horas buscando fallos en interfaces de los \'90. Con Jurídica encontrás jurisprudencia verificable en segundos.',
    benefits: [
      {
        icon: 'i-lucide-clock',
        title: 'Ahorrá 10+ horas por semana',
        description: 'Buscá en SAIJ, CSJN, JUBA y JUSCABA desde un solo lugar. Sin navegar entre 4 páginas diferentes.'
      },
      {
        icon: 'i-lucide-shield-check',
        title: 'Citas 100% verificables',
        description: 'Cada resultado incluye link directo a la fuente oficial. Nunca más sanciones del colegio por citas falsas.'
      },
      {
        icon: 'i-lucide-sparkles',
        title: 'Reportes con IA',
        description: 'Generá informes de jurisprudencia con análisis automático. Siempre con fuentes que podés verificar.'
      },
      {
        icon: 'i-lucide-wallet',
        title: 'Precio accesible',
        description: 'Planes desde $3,990/mes. Menos de lo que cobrás por 15 minutos de consulta.'
      }
    ],
    pricing: {
      plan: 'Básico',
      price: '$3,990',
      features: [
        '50 búsquedas por día',
        'SAIJ + CSJN',
        '5 reportes IA/mes',
        'Exportar a Word',
        'Links verificables'
      ],
      highlighted: true
    },
    cta: {
      primary: 'Empezar prueba gratis',
      secondary: 'Ver todos los planes'
    },
    faqs: [
      {
        question: '¿Cuánto tiempo puedo probar Jurídica gratis?',
        answer: 'Podés probar Jurídica completamente gratis con 5 búsquedas por día, sin necesidad de tarjeta de crédito.'
      },
      {
        question: '¿Jurídica reemplaza la lectura de fallos?',
        answer: 'No. Jurídica te ayuda a encontrar los fallos relevantes más rápido, pero siempre deberías leer el fallo completo. Por eso cada resultado incluye link directo a la fuente oficial.'
      },
      {
        question: '¿Puedo exportar los resultados a Word?',
        answer: 'Sí, con el plan Básico y superiores podés exportar búsquedas y reportes a formato Word listo para presentar.'
      },
      {
        question: '¿Qué pasa si ChatGPT inventa citas?',
        answer: 'Ese es exactamente el problema que resuelve Jurídica. A diferencia de ChatGPT que puede "alucinar" citas falsas, Jurídica solo muestra resultados de fuentes oficiales verificables.'
      }
    ]
  },
  'estudios-juridicos': {
    slug: 'estudios-juridicos',
    title: 'Jurídica para Estudios Jurídicos',
    metaTitle: 'Mejor Buscador de Jurisprudencia para Estudios Jurídicos | Jurídica',
    metaDescription: 'Solución de búsqueda de jurisprudencia argentina para estudios jurídicos. Múltiples usuarios, reportes ilimitados, API access. SAIJ, CSJN, JUBA, JUSCABA.',
    heroTitle: 'El mejor buscador de jurisprudencia para estudios jurídicos',
    heroSubtitle: 'Tu equipo necesita acceso rápido a jurisprudencia verificable. Jurídica centraliza la búsqueda y elimina las horas perdidas.',
    benefits: [
      {
        icon: 'i-lucide-users',
        title: 'Hasta 5 usuarios incluidos',
        description: 'Todo tu equipo con acceso a búsquedas ilimitadas y reportes compartidos.'
      },
      {
        icon: 'i-lucide-infinity',
        title: 'Reportes ilimitados',
        description: 'Generá todos los informes de jurisprudencia que necesites con análisis de IA.'
      },
      {
        icon: 'i-lucide-code',
        title: 'API Access',
        description: 'Integrá Jurídica con tu sistema de gestión de casos existente.'
      },
      {
        icon: 'i-lucide-headphones',
        title: 'Soporte prioritario',
        description: 'Respuesta en menos de 4 horas hábiles para cualquier consulta.'
      }
    ],
    pricing: {
      plan: 'Estudio',
      price: '$24,990',
      features: [
        'Hasta 5 usuarios',
        'Búsquedas ilimitadas',
        'Todas las fuentes',
        'Reportes IA ilimitados',
        'API access',
        'Soporte prioritario'
      ],
      highlighted: true
    },
    cta: {
      primary: 'Contactar ventas',
      secondary: 'Agendar demo'
    },
    faqs: [
      {
        question: '¿Puedo agregar más de 5 usuarios?',
        answer: 'Sí, contactanos para un plan personalizado con la cantidad de usuarios que necesites.'
      },
      {
        question: '¿Qué incluye el API access?',
        answer: 'Acceso a nuestra API REST para integrar búsquedas de jurisprudencia en tu sistema de gestión de casos, CRM o cualquier herramienta interna.'
      },
      {
        question: '¿Tienen descuentos por pago anual?',
        answer: 'Sí, ofrecemos 2 meses gratis con el pago anual. Contactanos para más detalles.'
      },
      {
        question: '¿Cómo funciona el soporte prioritario?',
        answer: 'Tenés un canal directo de comunicación con nuestro equipo. Garantizamos respuesta en menos de 4 horas hábiles.'
      }
    ]
  },
  'estudiantes-derecho': {
    slug: 'estudiantes-derecho',
    title: 'Jurídica para Estudiantes de Derecho',
    metaTitle: 'Mejor Buscador de Jurisprudencia para Estudiantes de Derecho | Jurídica',
    metaDescription: 'Buscador de jurisprudencia argentina gratuito para estudiantes de derecho. Encontrá fallos para tus trabajos prácticos con citas verificables.',
    heroTitle: 'El mejor buscador de jurisprudencia para estudiantes de derecho',
    heroSubtitle: 'Encontrá los fallos que necesitás para tus trabajos prácticos y exámenes. Gratis, con citas que tus profesores pueden verificar.',
    benefits: [
      {
        icon: 'i-lucide-graduation-cap',
        title: 'Plan gratuito disponible',
        description: '5 búsquedas diarias gratis. Suficiente para tus trabajos prácticos semanales.'
      },
      {
        icon: 'i-lucide-link',
        title: 'Citas listas para copiar',
        description: 'Cada fallo con formato de cita académica. Solo copiá y pegá en tu TP.'
      },
      {
        icon: 'i-lucide-book-open',
        title: 'Aprendé investigación jurídica',
        description: 'Interfaz simple que te enseña a buscar como un profesional.'
      },
      {
        icon: 'i-lucide-check-circle',
        title: 'Fuentes verificables',
        description: 'Tus profesores pueden verificar cada cita. Sin riesgo de plagio involuntario.'
      }
    ],
    pricing: {
      plan: 'Free',
      price: '$0',
      features: [
        '5 búsquedas por día',
        'Acceso a SAIJ',
        'Links verificables',
        'Formato de cita académica',
        'Sin tarjeta de crédito'
      ],
      highlighted: true
    },
    cta: {
      primary: 'Crear cuenta gratis',
      secondary: 'Ver ejemplo de búsqueda'
    },
    faqs: [
      {
        question: '¿Es realmente gratis para estudiantes?',
        answer: 'Sí, el plan Free es completamente gratuito y no requiere tarjeta de crédito. Incluye 5 búsquedas por día.'
      },
      {
        question: '¿Puedo usar Jurídica para mi tesis?',
        answer: 'Absolutamente. Jurídica es ideal para investigación jurídica. Para tesis extensas, te recomendamos el plan Básico por sus reportes de IA.'
      },
      {
        question: '¿Las citas son válidas académicamente?',
        answer: 'Sí. Jurídica proporciona links directos a fuentes oficiales (SAIJ, CSJN, etc.) que cumplen con los estándares de citación académica argentina.'
      },
      {
        question: '¿Qué diferencia hay con buscar en Google?',
        answer: 'Google puede mostrar fuentes desactualizadas o no oficiales. Jurídica busca directamente en las bases de datos oficiales y garantiza que cada resultado sea verificable.'
      }
    ]
  }
}

// Comparison Pages
export const comparisonPages: Record<string, ComparisonPage> = {
  'juridica-vs-chatgpt': {
    slug: 'juridica-vs-chatgpt',
    competitor: 'ChatGPT',
    title: 'Jurídica vs ChatGPT',
    metaTitle: 'Jurídica vs ChatGPT: Comparación para Búsqueda Jurídica Argentina | 2024',
    metaDescription: 'Comparación detallada entre Jurídica y ChatGPT para búsqueda de jurisprudencia argentina. Descubrí por qué las citas verificables importan.',
    heroTitle: 'Jurídica vs ChatGPT',
    heroSubtitle: '¿ChatGPT para buscar jurisprudencia? Te contamos por qué abogados están siendo sancionados por citas falsas.',
    comparison: [
      { feature: 'Citas verificables con link', juridica: true, competitor: false },
      { feature: 'Búsqueda en SAIJ oficial', juridica: true, competitor: false },
      { feature: 'Búsqueda en CSJN', juridica: true, competitor: false },
      { feature: 'Sin alucinaciones', juridica: true, competitor: false },
      { feature: 'Fallos actualizados 2024', juridica: true, competitor: 'Datos hasta 2023' },
      { feature: 'Gratis para empezar', juridica: true, competitor: true },
      { feature: 'Exportar a Word', juridica: true, competitor: false },
      { feature: 'Reportes estructurados', juridica: true, competitor: 'Texto libre' },
      { feature: 'Diseñado para abogados', juridica: true, competitor: false }
    ],
    whyJuridica: [
      {
        title: 'ChatGPT inventa citas que no existen',
        description: 'El problema de las "alucinaciones" de IA es real. ChatGPT puede generar citas de fallos que nunca existieron, exponiendo al abogado a sanciones del colegio profesional.'
      },
      {
        title: 'Jurídica busca en fuentes oficiales',
        description: 'Cada resultado de Jurídica viene de SAIJ, CSJN, JUBA o JUSCABA. No generamos texto: buscamos en bases de datos reales.'
      },
      {
        title: 'Link directo a la fuente',
        description: 'Cada cita incluye un link que podés verificar en segundos. El juez, tu cliente o el colegio pueden confirmar que el fallo existe.'
      }
    ],
    verdict: 'ChatGPT es útil para muchas cosas, pero no para buscar jurisprudencia argentina. El riesgo de citas falsas es demasiado alto para un profesional del derecho.'
  },
  'juridica-vs-fallobot': {
    slug: 'juridica-vs-fallobot',
    competitor: 'FalloBot',
    title: 'Jurídica vs FalloBot',
    metaTitle: 'Jurídica vs FalloBot: Comparación de Buscadores Jurídicos | 2024',
    metaDescription: 'Comparación entre Jurídica y FalloBot para búsqueda de jurisprudencia argentina. Cobertura, precios y características.',
    heroTitle: 'Jurídica vs FalloBot',
    heroSubtitle: 'Dos opciones para buscar jurisprudencia argentina. ¿Cuál es mejor para vos?',
    comparison: [
      { feature: 'Búsqueda en SAIJ', juridica: true, competitor: true },
      { feature: 'Búsqueda en CSJN', juridica: true, competitor: true },
      { feature: 'Búsqueda en JUBA', juridica: true, competitor: false },
      { feature: 'Búsqueda en JUSCABA', juridica: true, competitor: false },
      { feature: 'Reportes con IA', juridica: true, competitor: false },
      { feature: 'Plan gratuito', juridica: '5 búsquedas/día', competitor: '3 búsquedas/día' },
      { feature: 'Exportar a Word', juridica: true, competitor: 'Solo PDF' },
      { feature: 'API para integración', juridica: true, competitor: false },
      { feature: 'Multi-usuario', juridica: 'Hasta 5', competitor: 'Solo 1' }
    ],
    whyJuridica: [
      {
        title: 'Más fuentes de datos',
        description: 'Jurídica incluye JUBA (Buenos Aires) y JUSCABA (CABA), dos fuentes críticas que FalloBot no tiene.'
      },
      {
        title: 'Reportes inteligentes',
        description: 'Generá informes de jurisprudencia con análisis de argumentos y tendencias. FalloBot solo muestra resultados.'
      },
      {
        title: 'Mejor para equipos',
        description: 'Con el plan Estudio, hasta 5 usuarios pueden usar Jurídica. Ideal para estudios jurídicos.'
      }
    ],
    verdict: 'FalloBot es una opción válida, pero Jurídica ofrece más fuentes, reportes con IA y mejor soporte para equipos.'
  },
  'juridica-vs-saij-directo': {
    slug: 'juridica-vs-saij-directo',
    competitor: 'SAIJ Directo',
    title: 'Jurídica vs Buscar en SAIJ Directo',
    metaTitle: 'Jurídica vs SAIJ: Por qué usar un buscador unificado | 2024',
    metaDescription: '¿Vale la pena usar Jurídica si SAIJ es gratis? Comparamos tiempos de búsqueda, usabilidad y funcionalidades.',
    heroTitle: 'Jurídica vs Buscar en SAIJ Directo',
    heroSubtitle: 'SAIJ es gratis. Entonces, ¿por qué pagar por Jurídica?',
    comparison: [
      { feature: 'Costo', juridica: 'Desde $0', competitor: 'Gratis' },
      { feature: 'Incluye CSJN', juridica: true, competitor: false },
      { feature: 'Incluye JUBA', juridica: true, competitor: false },
      { feature: 'Incluye JUSCABA', juridica: true, competitor: false },
      { feature: 'Interfaz moderna', juridica: true, competitor: false },
      { feature: 'Búsqueda unificada', juridica: true, competitor: false },
      { feature: 'Reportes con IA', juridica: true, competitor: false },
      { feature: 'Alertas de nuevos fallos', juridica: true, competitor: false },
      { feature: 'Tiempo promedio búsqueda', juridica: '30 segundos', competitor: '5-10 minutos' }
    ],
    whyJuridica: [
      {
        title: 'Tu tiempo vale dinero',
        description: 'Si cobrás $10,000/hora, perder 10 minutos buscando en 4 páginas diferentes te cuesta $1,666. Jurídica lo hace en 30 segundos.'
      },
      {
        title: 'SAIJ no es la única fuente',
        description: 'Para una investigación completa necesitás SAIJ, CSJN, JUBA y JUSCABA. Con SAIJ solo tenés 25% de la información.'
      },
      {
        title: 'La interfaz de SAIJ es de los 90',
        description: 'Sin ofender a InfoLeg, pero buscar en SAIJ es frustrante. Jurídica tiene una interfaz moderna diseñada para productividad.'
      }
    ],
    verdict: 'SAIJ es gratuito y útil, pero si tu tiempo vale algo, Jurídica se paga solo con las horas que ahorrás.'
  }
}

// Guide Pages
export const guidePages: Record<string, GuidePage> = {
  'mejor-buscador-jurisprudencia-argentina': {
    slug: 'mejor-buscador-jurisprudencia-argentina',
    title: 'Mejor Buscador de Jurisprudencia Argentina',
    metaTitle: 'Mejor Buscador de Jurisprudencia Argentina 2024 | Guía Completa',
    metaDescription: 'Guía completa de los mejores buscadores de jurisprudencia argentina. Comparamos SAIJ, CSJN, JUBA, JUSCABA y alternativas con IA.',
    heroTitle: 'El Mejor Buscador de Jurisprudencia Argentina en 2024',
    heroSubtitle: 'Guía completa para encontrar fallos, leyes y doctrina en Argentina de forma rápida y confiable.',
    content: [
      {
        type: 'h2',
        text: '¿Por qué es difícil buscar jurisprudencia en Argentina?'
      },
      {
        type: 'p',
        text: 'Argentina tiene múltiples bases de datos jurídicas que no están conectadas entre sí. SAIJ, CSJN, JUBA, JUSCABA... cada una con su propia interfaz y criterios de búsqueda. Un abogado puede perder horas buscando un fallo que existe pero está en otra base de datos.'
      },
      {
        type: 'h2',
        text: 'Las principales fuentes de jurisprudencia argentina'
      },
      {
        type: 'list',
        items: [
          'SAIJ (Sistema Argentino de Información Jurídica): La base más completa de legislación nacional',
          'CSJN (Corte Suprema de Justicia de la Nación): Fallos de la máxima instancia judicial',
          'JUBA (Jurisprudencia de Buenos Aires): Base de datos de la provincia de Buenos Aires',
          'JUSCABA: Jurisprudencia de la Ciudad Autónoma de Buenos Aires'
        ]
      },
      {
        type: 'h2',
        text: '¿Qué hace a un buscador jurídico "bueno"?'
      },
      {
        type: 'list',
        items: [
          'Cobertura: ¿Busca en todas las fuentes relevantes?',
          'Velocidad: ¿Cuánto tarda en encontrar resultados?',
          'Verificabilidad: ¿Cada resultado tiene link a la fuente oficial?',
          'Usabilidad: ¿La interfaz es fácil de usar?',
          'Extras: ¿Ofrece reportes, alertas, exportación?'
        ]
      },
      {
        type: 'callout',
        text: 'Jurídica es el único buscador que unifica SAIJ, CSJN, JUBA y JUSCABA en una sola búsqueda, con citas verificables y reportes de IA.'
      },
      {
        type: 'h2',
        text: '¿ChatGPT sirve para buscar jurisprudencia?'
      },
      {
        type: 'p',
        text: 'No. ChatGPT y otros LLMs pueden "alucinar" citas de fallos que no existen. Varios abogados en Argentina y otros países han sido sancionados por presentar citas generadas por IA que resultaron ser falsas. Para investigación jurídica profesional, necesitás fuentes verificables.'
      }
    ],
    faqs: [
      {
        question: '¿Cuál es el mejor buscador de jurisprudencia argentina gratuito?',
        answer: 'SAIJ es completamente gratuito pero solo cubre legislación federal. Para una búsqueda más completa, Jurídica ofrece un plan gratuito con 5 búsquedas diarias que incluye múltiples fuentes.'
      },
      {
        question: '¿Puedo confiar en las citas de ChatGPT?',
        answer: 'No para uso profesional. ChatGPT puede generar citas de fallos inexistentes (alucinaciones). Siempre verificá cualquier cita en fuentes oficiales.'
      },
      {
        question: '¿SAIJ tiene todos los fallos de Argentina?',
        answer: 'No. SAIJ se enfoca en legislación federal y algunos fallos. Para jurisprudencia provincial necesitás JUBA (Buenos Aires), JUSCABA (CABA) y otras bases locales.'
      },
      {
        question: '¿Cómo cito correctamente un fallo argentino?',
        answer: 'El formato estándar incluye: Tribunal, Sala, Carátula, Fecha, y número de expediente si está disponible. Jurídica genera automáticamente la cita en formato académico.'
      }
    ]
  },
  'mejor-herramienta-citas-legales-verificables': {
    slug: 'mejor-herramienta-citas-legales-verificables',
    title: 'Mejor Herramienta para Citas Legales Verificables',
    metaTitle: 'Citas Legales Verificables en Argentina | Herramientas y Guía 2024',
    metaDescription: 'Cómo generar citas legales verificables en Argentina. Evitá sanciones por citas falsas de IA. Herramientas y mejores prácticas.',
    heroTitle: 'La Mejor Herramienta para Citas Legales Verificables',
    heroSubtitle: 'Cómo garantizar que cada cita en tus escritos sea real y verificable.',
    content: [
      {
        type: 'h2',
        text: 'El problema de las citas falsas de IA'
      },
      {
        type: 'p',
        text: 'En 2023, varios abogados en Estados Unidos fueron sancionados por presentar citas de casos generadas por ChatGPT que no existían. El problema llegó a Argentina: colegios de abogados están alertando sobre el uso irresponsable de IA para investigación jurídica.'
      },
      {
        type: 'h2',
        text: '¿Qué es una cita verificable?'
      },
      {
        type: 'p',
        text: 'Una cita verificable es aquella que cualquier persona puede confirmar accediendo a la fuente original. En derecho argentino, esto significa un link a SAIJ, CSJN, JUBA u otra base oficial donde el fallo está publicado.'
      },
      {
        type: 'h2',
        text: 'Cómo Jurídica garantiza citas verificables'
      },
      {
        type: 'list',
        items: [
          'Buscamos directamente en bases de datos oficiales, no generamos texto',
          'Cada resultado incluye link directo a la fuente',
          'No usamos IA generativa para crear contenido jurídico',
          'Los reportes de IA citan exclusivamente fuentes verificadas'
        ]
      },
      {
        type: 'callout',
        text: 'Con Jurídica, cada cita que uses en un escrito tiene un link que el juez, tu cliente o el colegio pueden verificar en segundos.'
      },
      {
        type: 'h2',
        text: 'Mejores prácticas para citas jurídicas'
      },
      {
        type: 'list',
        items: [
          'Nunca uses ChatGPT o similares para generar citas directamente',
          'Verificá cada cita en la fuente oficial antes de incluirla',
          'Usá herramientas especializadas en derecho argentino',
          'Guardá el link a la fuente junto con cada cita',
          'Actualizá citas antiguas: los fallos pueden ser modificados o revocados'
        ]
      }
    ],
    faqs: [
      {
        question: '¿Por qué ChatGPT genera citas falsas?',
        answer: 'ChatGPT predice texto basándose en patrones, no busca en bases de datos. Puede generar texto que "parece" una cita jurídica válida pero que no existe en la realidad.'
      },
      {
        question: '¿Puedo ser sancionado por usar citas de IA?',
        answer: 'Sí. Los colegios de abogados consideran falta ética presentar citas falsas, independientemente de cómo fueron generadas. La responsabilidad es del abogado firmante.'
      },
      {
        question: '¿Jurídica usa IA?',
        answer: 'Sí, pero de forma responsable. Usamos IA para mejorar la búsqueda y generar resúmenes, pero todo resultado proviene de fuentes oficiales verificables. Nunca generamos contenido jurídico ficticio.'
      },
      {
        question: '¿Cómo exporto citas con formato correcto?',
        answer: 'Jurídica genera automáticamente el formato de cita académica estándar para cada resultado. Podés copiarlo directamente o exportar a Word con el formato incluido.'
      }
    ]
  },
  'como-buscar-fallos-csjn': {
    slug: 'como-buscar-fallos-csjn',
    title: 'Cómo Buscar Fallos de la CSJN',
    metaTitle: 'Cómo Buscar Fallos de la Corte Suprema Argentina (CSJN) | Guía 2024',
    metaDescription: 'Guía paso a paso para buscar fallos de la Corte Suprema de Justicia de la Nación. Tips, filtros y herramientas para encontrar jurisprudencia de la CSJN.',
    heroTitle: 'Cómo Buscar Fallos de la Corte Suprema (CSJN)',
    heroSubtitle: 'Guía completa para encontrar jurisprudencia de la máxima instancia judicial argentina.',
    content: [
      {
        type: 'h2',
        text: '¿Qué es la CSJN?'
      },
      {
        type: 'p',
        text: 'La Corte Suprema de Justicia de la Nación es el máximo tribunal de Argentina. Sus fallos sientan precedentes importantes para todo el sistema judicial. Buscar en su base de datos es esencial para cualquier investigación jurídica seria.'
      },
      {
        type: 'h2',
        text: 'Formas de buscar fallos de la CSJN'
      },
      {
        type: 'list',
        items: [
          'Sitio oficial de la CSJN (csjn.gov.ar): Acceso gratuito pero interfaz limitada',
          'SAIJ: Incluye algunos fallos de la Corte',
          'Jurídica: Búsqueda unificada con filtros avanzados y reportes'
        ]
      },
      {
        type: 'h2',
        text: 'Tips para búsquedas efectivas'
      },
      {
        type: 'list',
        items: [
          'Usá el número de expediente si lo tenés (ej: "CSJ 123/2023")',
          'Buscá por carátula: "Fernández c/ Estado Nacional"',
          'Filtrá por fecha para fallos recientes',
          'Usá términos específicos del derecho, no lenguaje coloquial',
          'Probá con nombres de doctrina: "Badaro", "Halabi", "Arriola"'
        ]
      },
      {
        type: 'callout',
        text: 'En Jurídica podés buscar "acordadas CSJN 2024" o el nombre de un fallo histórico y obtener resultados con link directo a la fuente oficial.'
      },
      {
        type: 'h2',
        text: 'Fallos importantes de la CSJN'
      },
      {
        type: 'p',
        text: 'Algunos fallos de la Corte Suprema son citados constantemente: Badaro (movilidad jubilatoria), Halabi (acciones de clase), Arriola (tenencia de estupefacientes). Conocer estos precedentes es fundamental para cualquier abogado argentino.'
      }
    ],
    faqs: [
      {
        question: '¿Los fallos de la CSJN son de acceso público?',
        answer: 'Sí, todos los fallos de la Corte Suprema son públicos y gratuitos. Podés acceder desde el sitio oficial o mediante buscadores como Jurídica.'
      },
      {
        question: '¿Cuánto tardan en publicar un fallo nuevo?',
        answer: 'Generalmente los fallos se publican pocos días después de ser dictados. Jurídica actualiza su base de datos regularmente para incluir los últimos fallos.'
      },
      {
        question: '¿Puedo citar un fallo de la CSJN sin leerlo completo?',
        answer: 'No es recomendable. Los sumarios pueden no reflejar todos los matices del fallo. Siempre leé el fallo completo antes de citarlo en un escrito.'
      },
      {
        question: '¿Qué diferencia hay entre un fallo y una acordada?',
        answer: 'Los fallos resuelven casos concretos. Las acordadas son normas de funcionamiento interno de la Corte, aunque algunas tienen impacto importante (como las que regulan presentaciones electrónicas).'
      }
    ]
  }
}

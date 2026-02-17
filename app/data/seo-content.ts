// SEO Content - Synced from /root/clawd/juridica-seo-content.json
// Last updated: 2026-02-17 by Growth team

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
  forWho?: string[]
  notForWho?: string[]
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
    importance?: string
  }[]
  whyJuridica: {
    title: string
    description: string
  }[]
  verdict: string
  verdictDetail?: {
    winner: string
    summary: string
    useCase: {
      juridica: string
      competitor: string
    }
  }
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

// Solution Pages - Content from Growth team
export const solutionPages: Record<string, SolutionPage> = {
  'abogados-independientes': {
    slug: 'abogados-independientes',
    title: 'Jurídica para Abogados Independientes',
    metaTitle: 'Jurídica para Abogados Independientes | Jurisprudencia Argentina con IA',
    metaDescription: 'Encontrá fallos relevantes en segundos, no en horas. Jurídica es el buscador de jurisprudencia argentina con IA diseñado para abogados que trabajan solos y necesitan respuestas rápidas con citas verificables.',
    heroTitle: 'El mejor buscador de jurisprudencia para abogados independientes',
    heroSubtitle: 'Como abogado independiente, tu tiempo es tu recurso más valioso. Jurídica te permite encontrar jurisprudencia argentina relevante en segundos, con citas directas a SAIJ, CSJN, JUBA y JUSCABA que podés verificar al instante.',
    benefits: [
      {
        icon: 'i-lucide-clock',
        title: 'Ahorrá 5+ horas semanales en investigación jurídica',
        description: 'Nuestra IA analiza miles de fallos en segundos y te muestra los más relevantes para tu caso.'
      },
      {
        icon: 'i-lucide-shield-check',
        title: 'Citas 100% verificables con link a la fuente',
        description: 'Cada fallo incluye link directo a SAIJ, CSJN, JUBA o JUSCABA. Sin alucinaciones, sin inventos.'
      },
      {
        icon: 'i-lucide-wallet',
        title: 'Sin suscripciones costosas de grandes editoriales',
        description: 'Planes desde $3,990 ARS/mes. Acceso a jurisprudencia de calidad sin arruinar tu presupuesto.'
      },
      {
        icon: 'i-lucide-message-circle',
        title: 'Búsqueda en lenguaje natural',
        description: 'Preguntá como le preguntarías a un colega: "¿hay fallos sobre despido durante período de prueba con embarazo?"'
      }
    ],
    forWho: [
      'Abogados que trabajan de forma independiente',
      'Profesionales que necesitan respuestas rápidas',
      'Abogados que valoran la precisión sobre la cantidad'
    ],
    notForWho: [
      'Estudios grandes que ya tienen suscripción a editoriales tradicionales',
      'Quienes solo buscan jurisprudencia de forma esporádica (usá el plan gratuito)'
    ],
    pricing: {
      plan: 'Individual',
      price: '$3,990',
      features: [
        'Búsquedas ilimitadas',
        'SAIJ + CSJN + JUBA + JUSCABA',
        'Citas verificables',
        'Exportar a Word',
        'Búsqueda en lenguaje natural'
      ],
      highlighted: true
    },
    cta: {
      primary: 'Probalo gratis',
      secondary: 'Ver planes'
    },
    faqs: [
      {
        question: '¿Es mejor que buscar directo en SAIJ?',
        answer: 'Sí. Jurídica busca en SAIJ + CSJN + JUBA + JUSCABA simultáneamente, y usa IA para mostrarte los fallos más relevantes primero. SAIJ solo te da resultados por keywords.'
      },
      {
        question: '¿Puedo confiar en las citas para un escrito judicial?',
        answer: '100%. Cada cita incluye link directo a la fuente oficial. A diferencia de ChatGPT, Jurídica nunca inventa fallos.'
      },
      {
        question: '¿Cuánto cuesta?',
        answer: 'Plan gratuito con 10 búsquedas/mes. Plan Individual desde $3,990 ARS/mes con búsquedas ilimitadas.'
      }
    ]
  },
  'estudios-juridicos': {
    slug: 'estudios-juridicos',
    title: 'Jurídica para Estudios Jurídicos',
    metaTitle: 'Jurídica para Estudios Jurídicos | Búsqueda de Jurisprudencia en Equipo',
    metaDescription: 'Potenciá la investigación jurídica de tu equipo. Jurídica permite que varios abogados busquen jurisprudencia argentina con IA, compartan resultados y mantengan un repositorio de fallos relevantes.',
    heroTitle: 'Jurisprudencia argentina para todo tu estudio jurídico',
    heroSubtitle: 'Los estudios jurídicos que usan Jurídica reducen un 60% el tiempo de investigación. Tu equipo puede buscar, guardar y compartir fallos relevantes, con la seguridad de que todas las citas son verificables.',
    benefits: [
      {
        icon: 'i-lucide-users',
        title: 'Múltiples usuarios por cuenta',
        description: 'Plan Estudio con acceso para todo tu equipo. Cada abogado con su perfil y búsquedas guardadas.'
      },
      {
        icon: 'i-lucide-library',
        title: 'Biblioteca de fallos compartida',
        description: 'Guardá fallos importantes y compartilos con colegas. Nunca pierdas ese fallo clave que encontraste hace meses.'
      },
      {
        icon: 'i-lucide-file-text',
        title: 'Citas estandarizadas para escritos',
        description: 'Exportá citas en formato listo para copiar y pegar en tus escritos. Consistencia en todo el estudio.'
      },
      {
        icon: 'i-lucide-layers',
        title: '4 fuentes en una búsqueda',
        description: 'SAIJ, CSJN, JUBA y JUSCABA. No más abrir 4 pestañas y buscar en cada base por separado.'
      }
    ],
    forWho: [
      'Estudios jurídicos de 2 a 50 abogados',
      'Equipos que necesitan compartir investigación',
      'Estudios que buscan estandarizar sus citas jurídicas'
    ],
    notForWho: [
      'Abogados que trabajan solos (mejor plan Individual)',
      'Empresas que necesitan integración con sistemas de gestión de casos (próximamente)'
    ],
    pricing: {
      plan: 'Estudio',
      price: '$9,990',
      features: [
        'Hasta 5 usuarios',
        'Búsquedas ilimitadas',
        'Todas las fuentes',
        'Biblioteca compartida',
        'Citas estandarizadas',
        'Soporte prioritario'
      ],
      highlighted: true
    },
    cta: {
      primary: 'Solicitar demo para tu estudio',
      secondary: 'Ver plan Estudio'
    },
    faqs: [
      {
        question: '¿Cuántos usuarios incluye el plan Estudio?',
        answer: 'El plan Estudio ($9,990 ARS/mes) incluye hasta 5 usuarios. Para equipos más grandes, el plan Firma ($24,990 ARS/mes) incluye usuarios ilimitados.'
      },
      {
        question: '¿Se pueden ver las búsquedas de otros miembros del equipo?',
        answer: 'Cada usuario tiene sus búsquedas privadas, pero pueden compartir fallos específicos a una biblioteca común del estudio.'
      },
      {
        question: '¿Tienen facturación para empresas?',
        answer: 'Sí, factura A o B según necesites. CUIT del estudio.'
      }
    ]
  },
  'estudiantes-derecho': {
    slug: 'estudiantes-derecho',
    title: 'Jurídica para Estudiantes de Derecho',
    metaTitle: 'Jurídica para Estudiantes de Derecho | Aprendé Jurisprudencia con IA',
    metaDescription: 'Aprobá tus exámenes con jurisprudencia real. Jurídica te ayuda a encontrar fallos para tus trabajos prácticos, entender casos líderes y prepararte para la práctica profesional.',
    heroTitle: 'La mejor herramienta para estudiantes de derecho en Argentina',
    heroSubtitle: '¿Cansado de googlear jurisprudencia argentina y encontrar información desactualizada? Jurídica te da acceso a la misma base de datos que usan los abogados profesionales, con un plan gratuito perfecto para estudiantes.',
    benefits: [
      {
        icon: 'i-lucide-gift',
        title: 'Plan gratuito con 10 búsquedas mensuales',
        description: 'Perfecto para trabajos prácticos y preparación de exámenes. Sin tarjeta de crédito.'
      },
      {
        icon: 'i-lucide-sparkles',
        title: 'Explicaciones de fallos con IA',
        description: 'No solo encontrás el fallo — la IA te explica los hechos, el holding y por qué es relevante.'
      },
      {
        icon: 'i-lucide-check-circle',
        title: 'Citas correctas desde el día 1',
        description: 'Aprendé a citar jurisprudencia correctamente. Cada fallo viene con la cita en formato estándar.'
      },
      {
        icon: 'i-lucide-briefcase',
        title: 'Preparación para la práctica real',
        description: 'Usá las mismas herramientas que vas a usar cuando ejerzas. Jurídica es usado por estudios en todo el país.'
      }
    ],
    forWho: [
      'Estudiantes de abogacía en universidades argentinas',
      'Estudiantes de posgrados y maestrías en derecho',
      'Graduados recientes preparando su primera causa'
    ],
    notForWho: [
      'Estudiantes de derecho de otros países (solo jurisprudencia argentina)',
      'Quienes buscan resúmenes de doctrina (somos un buscador de jurisprudencia)'
    ],
    pricing: {
      plan: 'Free',
      price: '$0',
      features: [
        '10 búsquedas por mes',
        'Acceso a todas las fuentes',
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
        question: '¿Es realmente gratis?',
        answer: 'Sí, 10 búsquedas por mes totalmente gratis. Si necesitás más, el plan Individual cuesta $3,990 ARS/mes.'
      },
      {
        question: '¿Puedo usarlo para mi tesis?',
        answer: 'Absolutamente. Jurídica es perfecto para investigación académica. Todas las citas son verificables y correctamente formateadas.'
      },
      {
        question: '¿Tienen descuento para estudiantes?',
        answer: 'El plan gratuito suele ser suficiente para estudiantes. Si necesitás más, contactanos con tu certificado de alumno regular.'
      }
    ]
  }
}

// Comparison Pages - Content from Growth team
export const comparisonPages: Record<string, ComparisonPage> = {
  'juridica-vs-chatgpt': {
    slug: 'juridica-vs-chatgpt',
    competitor: 'ChatGPT',
    title: 'Jurídica vs ChatGPT',
    metaTitle: 'Jurídica vs ChatGPT para Jurisprudencia Argentina | Comparación 2026',
    metaDescription: 'ChatGPT inventa fallos. Jurídica te da citas verificables. Comparación detallada para abogados argentinos que necesitan jurisprudencia confiable.',
    heroTitle: 'Jurídica vs ChatGPT: ¿Cuál es mejor para buscar jurisprudencia argentina?',
    heroSubtitle: 'Si usaste ChatGPT para buscar jurisprudencia argentina, probablemente te inventó un fallo. Jurídica conecta directo con SAIJ, CSJN, JUBA y JUSCABA para darte citas que realmente existen.',
    comparison: [
      { feature: 'Citas verificables', juridica: '✅ Siempre - link directo a fuente oficial', competitor: '❌ Inventa fallos que no existen', importance: 'critical' },
      { feature: 'Acceso a SAIJ/CSJN/JUBA/JUSCABA', juridica: '✅ Búsqueda en las 4 bases', competitor: '❌ No tiene acceso a bases de datos', importance: 'critical' },
      { feature: 'Actualización de jurisprudencia', juridica: '✅ Sincronizado con fuentes oficiales', competitor: '❌ Datos de entrenamiento desactualizados', importance: 'high' },
      { feature: 'Explicación de conceptos', juridica: '⚠️ Básica, enfocada en búsqueda', competitor: '✅ Excelente para conceptos generales', importance: 'medium' },
      { feature: 'Redacción de escritos', juridica: '❌ No es su función', competitor: '✅ Útil para borradores', importance: 'medium' },
      { feature: 'Precio', juridica: 'Gratis a $24,990 ARS/mes', competitor: 'Gratis o $20 USD/mes (Plus)', importance: 'medium' },
      { feature: 'Específico para Argentina', juridica: '✅ 100% enfocado', competitor: '❌ Genérico, mezcla jurisdicciones', importance: 'high' }
    ],
    whyJuridica: [
      {
        title: 'ChatGPT alucina jurisprudencia',
        description: 'Cuando le pedís un fallo específico, muchas veces inventa la carátula, el número de expediente, e incluso el contenido. Esto es peligroso para abogados que citan esos fallos inexistentes en escritos judiciales.'
      },
      {
        title: 'Ejemplo real del problema',
        description: 'Si le preguntás a ChatGPT "¿hay fallos de la CSJN sobre prescripción de acciones laborales?", te puede dar "García c/ Empresa XYZ (2019)" — un fallo que no existe. Si lo citás en un escrito, quedás expuesto a sanciones.'
      },
      {
        title: 'Jurídica busca en fuentes reales',
        description: 'Jurídica busca directamente en las bases de datos oficiales. Cada resultado incluye el link a SAIJ, CSJN, JUBA o JUSCABA donde podés verificar que el fallo existe y leer el texto completo.'
      }
    ],
    verdict: 'Para jurisprudencia argentina verificable, Jurídica es la única opción confiable. ChatGPT es útil para conceptos generales, pero inventa fallos específicos.',
    verdictDetail: {
      winner: 'Jurídica',
      summary: 'Para jurisprudencia argentina verificable, Jurídica es la única opción confiable. ChatGPT es útil para conceptos generales, pero inventa fallos específicos.',
      useCase: {
        juridica: 'Cuando necesitás citas para un escrito judicial o investigación seria',
        competitor: 'Cuando querés entender un concepto legal general o redactar un borrador'
      }
    }
  },
  'juridica-vs-fallobot': {
    slug: 'juridica-vs-fallobot',
    competitor: 'FalloBot',
    title: 'Jurídica vs FalloBot',
    metaTitle: 'Jurídica vs FalloBot | ¿Cuál Buscador de Jurisprudencia es Mejor?',
    metaDescription: 'Comparativa detallada entre Jurídica y FalloBot. Fuentes, precios, funcionalidades y cuál conviene según tu caso.',
    heroTitle: 'Jurídica vs FalloBot: Comparación de buscadores de jurisprudencia argentina',
    heroSubtitle: 'Tanto Jurídica como FalloBot son herramientas de legaltech argentina para buscar jurisprudencia. Acá te explicamos las diferencias para que elijas la que mejor se adapta a tus necesidades.',
    comparison: [
      { feature: 'Búsqueda con IA', juridica: '✅ Lenguaje natural + ranking inteligente', competitor: '⚠️ Búsqueda tradicional por keywords', importance: 'high' },
      { feature: 'Fuentes unificadas', juridica: '✅ SAIJ + CSJN + JUBA + JUSCABA', competitor: '⚠️ Depende del plan', importance: 'high' },
      { feature: 'Explicación de fallos', juridica: '✅ IA resume hechos y holding', competitor: '❌ Solo texto del fallo', importance: 'medium' },
      { feature: 'Plan gratuito', juridica: '✅ 10 búsquedas/mes', competitor: '⚠️ Limitado', importance: 'medium' },
      { feature: 'Soporte', juridica: '✅ Chat en vivo', competitor: '⚠️ Email', importance: 'low' }
    ],
    whyJuridica: [
      {
        title: 'Búsqueda con IA real',
        description: 'Jurídica tiene ventaja en IA y explicaciones. Podés buscar en lenguaje natural y la IA rankea por relevancia.'
      },
      {
        title: 'Más fuentes unificadas',
        description: 'Acceso a SAIJ + CSJN + JUBA + JUSCABA en una sola búsqueda.'
      },
      {
        title: 'Resúmenes automáticos',
        description: 'La IA resume los hechos y el holding de cada fallo para que encuentres lo que necesitás más rápido.'
      }
    ],
    verdict: 'Depende del uso. Jurídica tiene ventaja en IA y explicaciones. FalloBot tiene foco en ciertos fueros específicos. Ambos son opciones válidas de legaltech argentina.',
    verdictDetail: {
      winner: 'Depende del uso',
      summary: 'Jurídica tiene ventaja en IA y explicaciones. FalloBot tiene foco en ciertos fueros específicos. Ambos son opciones válidas de legaltech argentina.',
      useCase: {
        juridica: 'Búsqueda con IA, explicaciones de fallos, múltiples fuentes unificadas',
        competitor: 'Fueros específicos, usuarios que prefieren interfaz tradicional'
      }
    }
  },
  'juridica-vs-saij-directo': {
    slug: 'juridica-vs-saij-directo',
    competitor: 'SAIJ Directo',
    title: 'Jurídica vs Buscar en SAIJ Directo',
    metaTitle: 'Jurídica vs Buscar Directo en SAIJ | ¿Vale la Pena?',
    metaDescription: 'SAIJ es gratis pero limitado. Jurídica agrega IA, múltiples fuentes y ahorra horas de búsqueda. Comparación honesta para abogados argentinos.',
    heroTitle: '¿Por qué usar Jurídica si SAIJ es gratis?',
    heroSubtitle: 'SAIJ es gratuito y oficial, ¿por qué pagarías por Jurídica? Porque ahorrás tiempo, buscás en más fuentes simultáneamente, y la IA te ayuda a encontrar lo relevante.',
    comparison: [
      { feature: 'Precio', juridica: 'Desde $3,990 ARS/mes (hay plan gratis)', competitor: '✅ Gratis', importance: 'high' },
      { feature: 'Fuentes incluidas', juridica: '✅ SAIJ + CSJN + JUBA + JUSCABA', competitor: 'Solo SAIJ', importance: 'high' },
      { feature: 'Búsqueda con IA', juridica: '✅ Lenguaje natural', competitor: '❌ Solo keywords', importance: 'high' },
      { feature: 'Tiempo promedio de búsqueda', juridica: '2-5 minutos', competitor: '15-60 minutos', importance: 'critical' },
      { feature: 'Ranking de relevancia', juridica: '✅ IA ordena por relevancia', competitor: '❌ Orden cronológico o alfabético', importance: 'high' },
      { feature: 'Resumen del fallo', juridica: '✅ Automático', competitor: '❌ Tenés que leer todo', importance: 'medium' },
      { feature: 'Guardar búsquedas', juridica: '✅ Biblioteca personal', competitor: '❌ Manual', importance: 'medium' }
    ],
    whyJuridica: [
      {
        title: 'Tu tiempo vale dinero',
        description: 'Si buscás jurisprudencia 5 veces por semana y cada búsqueda te ahorra 30 minutos, son 10 horas mensuales. ¿Cuánto vale tu hora? El plan Individual de Jurídica cuesta $3,990 ARS — menos que 1 hora de muchos abogados.'
      },
      {
        title: 'SAIJ no es la única fuente',
        description: 'Buscar en SAIJ directo funciona, pero es lento. Tenés que usar los keywords exactos, revisar decenas de resultados irrelevantes, y después repetir en CSJN, JUBA y JUSCABA por separado.'
      },
      {
        title: 'Jurídica potencia SAIJ',
        description: 'Jurídica no reemplaza SAIJ — lo potencia. Buscás en lenguaje natural, la IA te muestra lo más relevante primero, y encima buscás en CSJN, JUBA y JUSCABA al mismo tiempo.'
      }
    ],
    verdict: 'SAIJ es excelente para búsquedas ocasionales. Jurídica es para abogados que buscan jurisprudencia regularmente y valoran su tiempo.',
    verdictDetail: {
      winner: 'Jurídica para uso profesional',
      summary: 'SAIJ es excelente para búsquedas ocasionales. Jurídica es para abogados que buscan jurisprudencia regularmente y valoran su tiempo.',
      useCase: {
        juridica: 'Búsquedas frecuentes, ahorro de tiempo, múltiples fuentes',
        competitor: 'Búsquedas esporádicas, presupuesto cero, solo necesitás SAIJ'
      }
    }
  }
}

// Guide Pages (Best X for Y) - Content from Growth team
export const guidePages: Record<string, GuidePage> = {
  'mejor-buscador-jurisprudencia-argentina': {
    slug: 'mejor-buscador-jurisprudencia-argentina',
    title: 'Mejor Buscador de Jurisprudencia Argentina',
    metaTitle: 'Mejor Buscador de Jurisprudencia Argentina 2026 | Comparativa',
    metaDescription: 'Análisis de los mejores buscadores de jurisprudencia argentina: Jurídica, SAIJ, CSJN, FalloBot y más. Comparativa actualizada con precios, fuentes y funcionalidades.',
    heroTitle: '¿Cuál es el mejor buscador de jurisprudencia argentina en 2026?',
    heroSubtitle: 'Elegir el buscador de jurisprudencia correcto te puede ahorrar horas de trabajo. Analizamos las opciones disponibles para abogados argentinos en 2026.',
    content: [
      {
        type: 'h2',
        text: 'Las opciones disponibles en 2026'
      },
      {
        type: 'p',
        text: 'Argentina tiene varias opciones para buscar jurisprudencia, desde bases de datos oficiales gratuitas hasta herramientas con IA y editoriales tradicionales.'
      },
      {
        type: 'h2',
        text: 'Jurídica - Buscador con IA'
      },
      {
        type: 'list',
        items: [
          '✅ Búsqueda con inteligencia artificial en lenguaje natural',
          '✅ 4 fuentes unificadas (SAIJ, CSJN, JUBA, JUSCABA)',
          '✅ Citas verificables con link a fuente oficial',
          '✅ Resúmenes automáticos de fallos',
          '✅ Plan gratuito disponible',
          '⚠️ Planes pagos para uso intensivo',
          'Precio: Gratis - $24,990 ARS/mes',
          'Mejor para: Abogados que buscan frecuentemente y valoran su tiempo'
        ]
      },
      {
        type: 'h2',
        text: 'SAIJ - Base de datos oficial'
      },
      {
        type: 'list',
        items: [
          '✅ Gratuito y oficial',
          '✅ Base de datos completa',
          '✅ Actualización constante',
          '⚠️ Búsqueda solo por keywords',
          '⚠️ Sin ranking de relevancia',
          '⚠️ Interfaz anticuada',
          'Precio: Gratis',
          'Mejor para: Búsquedas ocasionales con presupuesto cero'
        ]
      },
      {
        type: 'h2',
        text: 'CSJN - Corte Suprema'
      },
      {
        type: 'list',
        items: [
          '✅ Gratuito',
          '✅ Fallos de Corte Suprema actualizados',
          '⚠️ Solo fallos de CSJN',
          '⚠️ Sin jurisprudencia provincial',
          'Precio: Gratis',
          'Mejor para: Cuando específicamente necesitás fallos de Corte'
        ]
      },
      {
        type: 'h2',
        text: 'La Ley / Thomson Reuters - Editorial tradicional'
      },
      {
        type: 'list',
        items: [
          '✅ Doctrina + jurisprudencia',
          '✅ Sumarios elaborados',
          '✅ Trayectoria',
          '⚠️ Muy costoso ($$$)',
          '⚠️ Interfaz tradicional',
          '⚠️ Contratos anuales',
          'Precio: Desde $50,000+ ARS/mes',
          'Mejor para: Estudios grandes con presupuesto'
        ]
      },
      {
        type: 'callout',
        text: 'Nuestra recomendación: Para la mayoría de los abogados argentinos en 2026, Jurídica ofrece el mejor balance entre funcionalidad, precio y ahorro de tiempo. La IA realmente marca la diferencia cuando buscás jurisprudencia regularmente.'
      },
      {
        type: 'h2',
        text: '¿Puedo usar ChatGPT para buscar jurisprudencia?'
      },
      {
        type: 'p',
        text: 'No es recomendable. ChatGPT inventa fallos que no existen. Podés usarlo para conceptos generales pero no para citas.'
      }
    ],
    faqs: [
      {
        question: '¿Cuál es el buscador de jurisprudencia más completo?',
        answer: 'En términos de fuentes unificadas, Jurídica (SAIJ + CSJN + JUBA + JUSCABA en una búsqueda). Las editoriales tradicionales agregan doctrina pero a precios mucho más altos.'
      },
      {
        question: '¿Puedo usar ChatGPT para buscar jurisprudencia argentina?',
        answer: 'No es recomendable. ChatGPT inventa fallos que no existen. Podés usarlo para conceptos generales pero no para citas.'
      },
      {
        question: '¿Hay algún buscador gratuito bueno?',
        answer: 'SAIJ y CSJN son gratuitos y oficiales. Jurídica tiene un plan gratuito con 10 búsquedas mensuales.'
      }
    ]
  },
  'mejor-herramienta-citas-legales-verificables': {
    slug: 'mejor-herramienta-citas-legales-verificables',
    title: 'Mejor Herramienta para Citas Legales Verificables',
    metaTitle: 'Mejor Herramienta para Citas Legales Verificables en Argentina',
    metaDescription: 'Las citas jurídicas deben ser verificables. Conocé las herramientas que garantizan que tus citas de jurisprudencia argentina son reales y linkean a fuentes oficiales.',
    heroTitle: '¿Cómo obtener citas jurídicas verificables en Argentina?',
    heroSubtitle: 'En la era de ChatGPT, verificar que un fallo realmente existe es más importante que nunca. Estas herramientas te garantizan citas jurídicas verificables para tus escritos.',
    content: [
      {
        type: 'h2',
        text: 'El problema de las citas inventadas'
      },
      {
        type: 'p',
        text: 'ChatGPT y otros LLMs frecuentemente inventan fallos judiciales. Citan carátulas, números de expediente y holdings que no existen. Abogados que confían en estas citas quedan expuestos ante el tribunal.'
      },
      {
        type: 'h2',
        text: 'La solución: fuentes con verificación'
      },
      {
        type: 'list',
        items: [
          'Jurídica: Cada resultado incluye link directo a SAIJ, CSJN, JUBA o JUSCABA. Podés verificar con un click. 100% verificable - nunca genera citas, solo busca en fuentes reales.',
          'SAIJ directo: Fuente oficial del Ministerio de Justicia. Si está en SAIJ, existe.',
          'CSJN sitio oficial: Para fallos de Corte Suprema, directo a la fuente.'
        ]
      },
      {
        type: 'h2',
        text: 'Cómo verificar una cita de jurisprudencia'
      },
      {
        type: 'list',
        items: [
          'Si la cita viene de ChatGPT/IA generativa: asumir que es falsa hasta verificar',
          'Buscar la carátula exacta en SAIJ o la fuente que corresponda',
          'Verificar número de expediente, fecha y tribunal',
          'Leer el fallo para confirmar que el holding citado es correcto',
          'Usar Jurídica para ahorrar tiempo: la verificación está integrada'
        ]
      },
      {
        type: 'callout',
        text: 'No arriesgues tu reputación con citas inventadas. Cada cita que uses en un escrito debe tener un link que el juez, tu cliente o el colegio pueden verificar en segundos.'
      }
    ],
    faqs: [
      {
        question: '¿Por qué ChatGPT inventa fallos?',
        answer: 'Los LLMs generan texto probabilísticamente. Cuando les pedís algo específico que no está en su entrenamiento, "alucinan" una respuesta plausible pero falsa.'
      },
      {
        question: '¿Puedo ser sancionado por citas inventadas?',
        answer: 'Sí. Los colegios de abogados consideran falta ética presentar citas falsas, independientemente de cómo fueron generadas. La responsabilidad es del abogado firmante.'
      },
      {
        question: '¿Jurídica nunca se equivoca?',
        answer: 'Jurídica no inventa fallos porque busca en bases de datos reales. La IA ayuda a interpretar tu búsqueda y rankear resultados, pero los fallos siempre vienen de fuentes oficiales verificables.'
      }
    ]
  },
  'como-buscar-fallos-csjn': {
    slug: 'como-buscar-fallos-csjn',
    title: 'Cómo Buscar Fallos de la CSJN',
    metaTitle: 'Cómo Buscar Fallos de la Corte Suprema Argentina (CSJN) | Guía 2026',
    metaDescription: 'Guía paso a paso para buscar fallos de la CSJN. Métodos gratuitos y herramientas con IA para encontrar jurisprudencia de la Corte Suprema argentina.',
    heroTitle: 'Cómo buscar fallos de la Corte Suprema de Justicia de la Nación',
    heroSubtitle: 'Los fallos de la Corte Suprema de Justicia de la Nación son fundamentales para cualquier abogado argentino. Te explicamos todas las formas de buscarlos.',
    content: [
      {
        type: 'h2',
        text: 'Método 1: Sitio oficial de la CSJN'
      },
      {
        type: 'list',
        items: [
          'URL: https://www.csjn.gov.ar',
          '✅ Gratuito y oficial',
          '✅ Fallos actualizados',
          '✅ Incluye acordadas y resoluciones',
          '⚠️ Búsqueda limitada a keywords',
          '⚠️ Solo fallos de Corte'
        ]
      },
      {
        type: 'p',
        text: 'Cómo usar: Ir a csjn.gov.ar → Sección "Jurisprudencia" → Usar el buscador con palabras clave → Filtrar por fecha si es necesario'
      },
      {
        type: 'h2',
        text: 'Método 2: SAIJ'
      },
      {
        type: 'list',
        items: [
          'URL: https://www.saij.gob.ar',
          '✅ Gratuito',
          '✅ Incluye fallos de CSJN y otros tribunales',
          '✅ Búsqueda unificada',
          '⚠️ Puede no tener los fallos más recientes',
          '⚠️ Interfaz menos intuitiva'
        ]
      },
      {
        type: 'p',
        text: 'Cómo usar: Ir a saij.gob.ar → Sección "Jurisprudencia" → Filtrar por "Corte Suprema de Justicia de la Nación" → Buscar por tema o palabras clave'
      },
      {
        type: 'h2',
        text: 'Método 3: Jurídica (con IA)'
      },
      {
        type: 'list',
        items: [
          'URL: https://juridica.ar',
          '✅ Búsqueda en lenguaje natural',
          '✅ Incluye CSJN + otras fuentes',
          '✅ IA rankea por relevancia',
          '✅ Resúmenes automáticos',
          '⚠️ Plan gratuito limitado a 10 búsquedas/mes'
        ]
      },
      {
        type: 'p',
        text: 'Cómo usar: Ir a juridica.ar → Escribir tu consulta en lenguaje natural → Filtrar por CSJN si querés solo Corte → Ver resultados rankeados por relevancia'
      },
      {
        type: 'h2',
        text: 'Tips para búsquedas efectivas'
      },
      {
        type: 'list',
        items: [
          'Buscá por concepto, no por carátula: Si no sabés la carátula exacta, buscá por el tema legal. "Prescripción laboral" te va a dar más resultados útiles que adivinar nombres.',
          'Usá los fallos líderes como punto de partida: Fallos famosos como "Vizzoti", "Aquino", "Álvarez c/ Cencosud" suelen citar precedentes útiles.',
          'Verificá la vigencia: Un fallo de 2005 puede haber sido modificado por jurisprudencia posterior. Siempre buscá fallos recientes sobre el mismo tema.'
        ]
      },
      {
        type: 'callout',
        text: 'En Jurídica podés buscar "acordadas CSJN 2024" o el nombre de un fallo histórico y obtener resultados con link directo a la fuente oficial.'
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
      }
    ]
  }
}

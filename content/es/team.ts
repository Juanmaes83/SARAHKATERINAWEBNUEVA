/**
 * Versión española estructurada para una ruta futura.
 *
 * No se importa desde ninguna página, no crea hreflang y no debe interpretarse
 * como aprobación editorial. Replica la estructura inglesa para que la futura
 * ruta pueda usar el mismo componente tras la revisión humana competente.
 */
export const teamEs = {
  hero: {
    eyebrow: 'Acompañamiento del lado del comprador en España',
    title: 'Tu lugar en España empieza con personas que trabajan de tu lado.',
    lead: 'Un equipo coordinado te acompaña desde la primera búsqueda hasta la etapa como propietario, con decisiones más claras, responsabilidades identificadas y un criterio construido alrededor de tus intereses como comprador.',
    cta: 'Cuéntanos tus planes',
    secondaryCta: 'Conoce al equipo',
  },
  introduction: {
    eyebrow: 'Qué cambia',
    title:
      'La búsqueda se convierte en una sola decisión conectada, no en una cadena de traspasos.',
    body: [
      'Un comprador internacional rara vez necesita una respuesta aislada. La propiedad, los costes de compra, la situación fiscal, la documentación y la vida práctica después de la firma se afectan entre sí.',
      'El equipo mantiene esas preguntas conectadas. Cada persona aporta una función definida y se incorpora verificación jurídica, técnica, urbanística, fiscal o financiera cuando la decisión la requiere.',
    ],
  },
  paths: [
    {
      title: 'Comprar una vivienda para vivir',
      analysis: [
        'Encaje de ubicación y vivienda',
        'Costes de compra y cuestiones fiscales o jurídicas',
        'Documentos y pasos posteriores a la firma',
      ],
      limit: 'Una selección no sustituye una tasación, inspección o aprobación jurídica.',
    },
    {
      title: 'Buscar terreno y estudiar un proyecto de construcción',
      analysis: [
        'Objetivo, ubicación y uso previsto',
        'Información urbanística disponible, accesos y suministros',
        'Profesionales que deben verificar la viabilidad',
      ],
      limit: 'No se promete edificabilidad, licencia, plazo ni presupuesto.',
    },
    {
      title: 'Comprar o usar una segunda vivienda con intención de obtener ingresos',
      analysis: [
        'Uso personal, costes y escenarios',
        'Licencias, comunidad y normativa local',
        'Elementos fiscales y financieros de cada situación',
      ],
      limit: 'No se promete viabilidad del alquiler, ocupación ni rentabilidad.',
    },
  ],
  profiles: [
    {
      name: 'Sarah Katerina',
      area: 'Fiscalidad, costes de compra y asesoramiento al comprador',
      body: 'Sarah reúne los objetivos del comprador, la lectura de costes y las preguntas fiscales dentro de una misma decisión, e identifica dónde hace falta verificación profesional adicional.',
    },
    {
      name: 'Elsa Quiros Perez',
      area: 'Administración y tareas administrativas',
      body: 'Elsa apoya la documentación, la coordinación y las tareas administrativas del expediente, incluidas las cuestiones pertinentes de la etapa como propietario dentro del alcance acordado.',
    },
    {
      name: 'Oscar',
      area: 'Acompañamiento comercial y selección de propiedades',
      body: 'Oscar acompaña la parte comercial de la búsqueda y ayuda a seleccionar propiedades frente al encargo del comprador, sin convertir la selección en una recomendación guiada por el vendedor.',
    },
    {
      name: 'Igor',
      area: 'Desarrollo de negocio y nuevas oportunidades',
      body: 'Igor trabaja en desarrollo de negocio y nuevas oportunidades, ayudando a mantener a la práctica atenta a formas relevantes de apoyar a compradores internacionales.',
    },
  ],
  network: {
    eyebrow: 'Un contexto profesional más amplio',
    title: 'Las buenas decisiones rara vez se toman de forma aislada.',
    body: [
      'Un equipo del lado del comprador también debe reconocer dónde termina su función y hace falta otra perspectiva profesional.',
      'El encargo del comprador permanece en el centro de la conversación. La función, relación y alcance de cualquier especialista deben confirmarse para cada expediente antes de confiar en ellos.',
    ],
    reviewLabel: 'MEDIO PROVISIONAL — SOLO PARA REVISIÓN VISUAL HUMANA',
  },
  process: [
    ['01', 'Tu idea y primera conversación', 'Sarah · Oscar'],
    ['02', 'Criterios de búsqueda y selección', 'Oscar · Sarah'],
    [
      '03',
      'Evidencia antes de comprometerte',
      'Sarah · Oscar · profesionales externos cuando proceda',
    ],
    ['04', 'Coordinación de la compra', 'Sarah · Oscar · Elsa'],
    ['05', 'Tu etapa como propietario', 'Sarah · Elsa'],
  ],
  independence: {
    title: 'El comprador es el cliente.',
    body: 'El análisis y la selección de propiedades responden a los intereses del comprador. El servicio cobra exclusivamente del comprador o cliente y no recibe remuneración de vendedores, promotores ni agencias.',
  },
  aftercare: {
    title: 'Ser propietario abre una nueva serie de preguntas prácticas.',
    body: 'Según tu situación y el alcance acordado, el equipo puede apoyar cuestiones fiscales y administrativas pertinentes, cuentas, recibos y tasas. No se promete una gestión integral del inmueble.',
  },
  finalCta: {
    title: 'Cuéntanos cómo quieres que sea tu vida en España.',
    body: 'Una vivienda para vivir, un terreno para un posible proyecto o una segunda residencia con intención de obtener ingresos: empieza por el objetivo real y por las preguntas que ya tienes.',
  },
} as const;

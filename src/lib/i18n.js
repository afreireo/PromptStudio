export const messages = {
    'es-ES': {
      app_title: 'PromptStudio',
      subtitle: 'Generador de prompts interactivo',
      mode_simple: 'Simple',
      mode_advanced: 'Avanzado',
      mode_hacking: 'Hacking',
      techniques: 'Técnicas de Prompt Engineering',
      toggles: {
        all: 'Activar todas las técnicas',
        cot: 'Chain of Thought — Hace que el modelo piense paso a paso',
        few: 'Few-Shot Learning — Incluye ejemplos para mejorar la respuesta',
        role: 'Role Playing — Mantiene el rol consistentemente',
        fmt: 'Output Formatting — Estructura clara de la respuesta',
        ctx: 'Context Awareness — Considera el contexto proporcionado',
        readability: 'Legibilidad — Usa encabezados, listas o viñetas para mejorar la claridad'
      },
      simple_fields: { role: 'Rol', audience: 'Audiencia', purpose: 'Propósito' },
      advanced_fields: { context: 'Contexto', role: 'Rol', instruction: 'Instrucción', specifics: 'Especificaciones', post: 'Post-Procesamiento' },
      hacking_fields: {
        base: 'Prompt base',
        jailbreak: 'Técnica de Jailbreak',
        injection: 'Método de Inyección',
        manipulation: 'Técnica de Manipulación',
        custom: 'Técnica personalizada (texto)',
        safety: 'Nivel de seguridad',
        ethics: 'Justificación ética (obligatoria para exportar)'
      },
      selects: {
        none: '(ninguna)', dan: 'DAN', developer: 'Modo desarrollador', custom: 'Custom',
        prompt: 'Prompt (ignorar previas)', context: 'Contexto (prueba de seguridad)', role: 'Rol (investigador)',
        urgency: 'Urgency', flattery: 'Flattery', guilt: 'Guilt', curiosity: 'Curiosity',
        low: 'low', medium: 'medium', high: 'high', stealth: 'stealth'
      },
      ethical_banner_title: '⚠️ Uso Ético y Controlado',
      ethical_banner_body: 'Este modo incluye técnicas de testing avanzadas que solo deben usarse con fines de investigación, testing ético y análisis de seguridad. Nunca lo utilices para evadir políticas o para causar daño. Cumple la legislación y normas aplicables.',
      preview: 'Vista previa',
      copy: 'Copiar',
      copied: '¡Copiado!',
      export: 'Exportar',
      export_text: 'Texto',
      export_xml: 'XML',
      export_json: 'Estructurado (GPT-5 Guide)',
      disabled_export_tip: 'Para exportar en Hacking, completa la Justificación ética.',
      placeholder_generic: 'Escribe aquí...',
      language_label: 'Idioma',
      es_label: 'EL ESPAÑOL',
      en_label: 'EL INGLÉS'
    },
    'en-US': {}
  }

export const i18n = { activeLocale: 'es-ES', prepared: true, languageSelectorVisible: false }

export const t = (key) => (messages[i18n.activeLocale] || messages['es-ES'])?.[key.split('.')[0]] ?? key

export function tt(path){
  const dict = messages[i18n.activeLocale] || messages['es-ES']
  return path.split('.').reduce((o,k)=>o?.[k], dict) ?? path
}
import React from 'react'
import TextInput from '../../components/TextInput.jsx'
import { tt } from '../../lib/i18n.js'
import { buildRAP, buildCRISP, buildHacking } from '../../lib/builders.js'

export default function ModeForm({ mode, state, techniques, setPreview }){
  const {
    rapRole, setRapRole,
    rapAudience, setRapAudience,
    rapPurpose, setRapPurpose,
    crContext, setCrContext,
    crRole, setCrRole,
    crInstruction, setCrInstruction,
    crSpecs, setCrSpecs,
    crPost, setCrPost,
    hkBase, setHkBase,
    hkJailbreak, setHkJailbreak,
    hkInjection, setHkInjection,
    hkManipulation, setHkManipulation,
    hkCustom, setHkCustom,
    hkSafety, setHkSafety,
    hkEthics, setHkEthics
  } = state

  // --- Construcción del preview por modo ---
  React.useEffect(() => {
    if (!setPreview) return

    if (mode === 'simple') {
      // Mapea toggles -> técnicas (Nombre + Instrucción técnica)
      const techs = []
      if (techniques?.fmt) {
        techs.push({
          name: 'Formato de salida',
          instruction: 'Organiza tu respuesta en secciones claras con encabezados si es necesario.'
        })
      }
      if (techniques?.roleKeep) {
        techs.push({
          name: 'Consistencia de rol',
          instruction: 'Mantén tu rol y expertise consistentemente; no cambies de perspectiva ni te contradigas.'
        })
      }
      if (techniques?.few) {
        techs.push({
          name: 'Ejemplos',
          instruction: 'Antes de responder, considera casos similares; incluye ejemplos concretos si aportan claridad.'
        })
      }
      if (techniques?.cot) {
        techs.push({
          name: 'Instrucción de razonamiento',
          instruction: 'Piensa paso a paso y explica el proceso antes de la respuesta final.'
        })
      }
      if (techniques?.ctx) {
        techs.push({
          name: 'Consideración de contexto',
          instruction: 'Adapta la respuesta al contexto proporcionado para maximizar relevancia y utilidad.'
        })
      }
      if (techniques?.readability) {
        techs.push({
          name: 'Estructura de respuesta',
          instruction: 'Usa encabezados, listas numeradas o viñetas para mejorar la legibilidad.'
        })
      }

      const { text, xml } = buildRAP({
        role: rapRole,
        audience: rapAudience,
        purpose: rapPurpose,
        techniques: techs
      })
      setPreview({ text, xml })
      return
    }

    if (mode === 'avanzado') {
      const { text, xml } = buildCRISP({
        context: crContext,
        role: crRole,
        instruction: crInstruction,
        specifics: crSpecs,
        post: crPost
      })
      setPreview({ text, xml })
      return
    }

    // mode === 'hacking'
    const { text, xml } = buildHacking({
      base: hkBase,
      jailbreak: hkJailbreak,
      injection: hkInjection,
      manipulation: hkManipulation,
      custom: hkCustom,
      safety: hkSafety,
      ethics: hkEthics
    })
    setPreview({ text, xml })
  }, [
    mode,
    // simple (RAP)
    rapRole, rapAudience, rapPurpose,
    techniques?.fmt, techniques?.roleKeep, techniques?.few,
    techniques?.cot, techniques?.ctx, techniques?.readability,
    // avanzado (CRISP)
    crContext, crRole, crInstruction, crSpecs, crPost,
    // hacking
    hkBase, hkJailbreak, hkInjection, hkManipulation, hkCustom, hkSafety, hkEthics,
    setPreview
  ])

  // ---- UI ORIGINAL ----
  if (mode === 'simple') {
    return (
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <TextInput label={tt('simple_fields.role')} value={rapRole} onChange={setRapRole} placeholder={tt('placeholder_generic')} />
        <TextInput label={tt('simple_fields.audience')} value={rapAudience} onChange={setRapAudience} placeholder={tt('placeholder_generic')} />
        <div className="md:col-span-2">
          <TextInput label={tt('simple_fields.purpose')} value={rapPurpose} onChange={setRapPurpose} placeholder={tt('placeholder_generic')} />
        </div>
      </div>
    )
  }

  if (mode === 'avanzado') {
    return (
      <div className="mt-4 grid grid-cols-1 gap-3">
        <TextInput label={tt('advanced_fields.context')} value={crContext} onChange={setCrContext} placeholder={tt('placeholder_generic')} textarea />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextInput label={tt('advanced_fields.role')} value={crRole} onChange={setCrRole} placeholder={tt('placeholder_generic')} />
          <TextInput label={tt('advanced_fields.instruction')} value={crInstruction} onChange={setCrInstruction} placeholder={tt('placeholder_generic')} />
        </div>
        <TextInput label={tt('advanced_fields.specifics')} value={crSpecs} onChange={setCrSpecs} placeholder={tt('placeholder_generic')} textarea />
        <TextInput label={tt('advanced_fields.post')} value={crPost} onChange={setCrPost} placeholder={tt('placeholder_generic')} textarea />
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      {/* …tu UI de hacking tal cual… */}
    </div>
  )
}

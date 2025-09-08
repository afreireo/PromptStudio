// src/views/PromptStudio/ModeForm.jsx
import React from 'react'
import TextInput from '../../components/TextInput.jsx'
import { tt } from '../../lib/i18n.js'
import { buildRAP, buildCRISP, buildHacking } from '../../lib/builders.js'

export default function ModeForm({ mode, state, techniques, setPreview }){
  const {
    // SIMPLE (RAP)
    rapRole, setRapRole,
    rapAudience, setRapAudience,
    rapPurpose, setRapPurpose,

    // AVANZADO (CRISP)
    crContext, setCrContext,
    crRole, setCrRole,
    crInstruction, setCrInstruction,
    crSpecs, setCrSpecs,
    crPost, setCrPost,
    crVerbosity, setCrVerbosity,
    crLimitEnabled, setCrLimitEnabled,
    crLimitChars, setCrLimitChars,

    // HACKING (nuevo marco)
    hkContextPreset, setHkContextPreset,             // 'lab' | 'education' | 'ctf' | 'none'
    hkBase, setHkBase,                                // prompt_base
    hkJailbreak, setHkJailbreak,                      // 'dan'|'roleplay'|'hypothetical'|'character'|'developer'|'custom'|'none'
    hkJailbreakCustom, setHkJailbreakCustom,          // texto custom
    hkInjection, setHkInjection,                      // 'ignore'|'system'|'hidden'|'markdown'|'custom'|'none'
    hkInjectionCustom, setHkInjectionCustom,          // texto custom
    hkManipulation, setHkManipulation,                // 'authority'|'urgency'|'flattery'|'guilt'|'curiosity'|'custom'|'none'
    hkManipulationCustom, setHkManipulationCustom,    // texto custom
    hkObfuscation, setHkObfuscation,                  // 'leet'|'symbols'|'base64'|'none'
    hkCustom, setHkCustom                             // bloque final opcional
  } = state

  // --- Construcción del preview por modo ---
  React.useEffect(() => {
    if (!setPreview) return

    if (mode === 'simple') {
      const techs = []
      if (techniques?.fmt)        techs.push({ name: 'Formato de salida',         instruction: 'Organiza tu respuesta en secciones claras con encabezados si es necesario.' })
      if (techniques?.roleKeep)   techs.push({ name: 'Consistencia de rol',       instruction: 'Mantén tu rol y expertise consistentemente; no cambies de perspectiva ni te contradigas.' })
      if (techniques?.few)        techs.push({ name: 'Ejemplos',                  instruction: 'Antes de responder, considera casos similares; incluye ejemplos concretos si aportan claridad.' })
      if (techniques?.cot)        techs.push({ name: 'Instrucción de razonamiento', instruction: 'Piensa paso a paso y explica el proceso antes de la respuesta final.' })
      if (techniques?.ctx)        techs.push({ name: 'Consideración de contexto', instruction: 'Adapta la respuesta al contexto proporcionado para maximizar relevancia y utilidad.' })
      if (techniques?.readability)techs.push({ name: 'Estructura de respuesta',   instruction: 'Usa encabezados, listas numeradas o viñetas para mejorar la legibilidad.' })

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
        post: crPost,
        verbosity: crVerbosity,
        limitEnabled: crLimitEnabled,
        limitChars: crLimitChars
      })
      setPreview({ text, xml })
      return
    }

    // HACKING (nuevo flujo)
    const { text, xml } = buildHacking({
      contextPreset: hkContextPreset || 'none',
      promptBase: hkBase || '',
      jailbreak: hkJailbreak || 'none',
      jailbreakCustom: hkJailbreak === 'custom' ? (hkJailbreakCustom || '') : '',
      injectionMethod: hkInjection || 'none',
      injectionCustom: hkInjection === 'custom' ? (hkInjectionCustom || '') : '',
      manipulation: hkManipulation || 'none',
      manipulationCustom: hkManipulation === 'custom' ? (hkManipulationCustom || '') : '',
      obfuscation: hkObfuscation || 'none',
      customTail: hkCustom || ''
    })
    setPreview({ text, xml })
  }, [
    mode,
    // SIMPLE (RAP)
    rapRole, rapAudience, rapPurpose,
    techniques?.fmt, techniques?.roleKeep, techniques?.few,
    techniques?.cot, techniques?.ctx, techniques?.readability,

    // AVANZADO (CRISP)
    crContext, crRole, crInstruction, crSpecs, crPost,
    crVerbosity, crLimitEnabled, crLimitChars,

    // HACKING (nuevo marco)
    hkContextPreset, hkBase,
    hkJailbreak, hkJailbreakCustom,
    hkInjection, hkInjectionCustom,
    hkManipulation, hkManipulationCustom,
    hkObfuscation, hkCustom,

    setPreview
  ])

  // ---- UI ----
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

        {/* Verbosidad + Límite */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Verbosidad */}
          <label className="block text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-600">Verbosidad</span>
            <select
              className="w-full rounded-2xl border border-slate-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#001223]"
              value={crVerbosity}
              onChange={(e) => setCrVerbosity(e.target.value)}
            >
              <option value="">(sin especificar)</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </label>

          {/* Límite de respuesta */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Límite de respuesta</span>
              <button
                type="button"
                onClick={() => setCrLimitEnabled(v => !v)}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${crLimitEnabled ? 'bg-[#001223]' : 'bg-slate-300'}`}
                aria-pressed={crLimitEnabled}
              >
                <span className={`block w-4 h-4 bg-white rounded-full shadow transition-transform ${crLimitEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
            <input
              type="number"
              min={1}
              placeholder="Ej: 400"
              className="w-full rounded-2xl border border-slate-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#001223] disabled:opacity-50"
              value={crLimitChars}
              onChange={(e) => {
                const v = e.target.value.replace(/[^\d]/g, '')
                setCrLimitChars(v)
              }}
              disabled={!crLimitEnabled}
              inputMode="numeric"
            />
          </div>
        </div>
      </div>
    )
  }

  // === HACKING (nuevo flujo) ===
  return (
    <div className="mt-4 space-y-4">
      {/* Contexto (opcional) */}
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-medium text-slate-600">Contexto (opcional)</span>
        <select
          className="w-full rounded-2xl border border-slate-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#001223]"
          value={hkContextPreset || 'none'}
          onChange={(e)=>setHkContextPreset(e.target.value)}
        >
          <option value="none">Sin contexto</option>
          <option value="lab">Laboratorio (lab)</option>
          <option value="education">Educativo (education)</option>
          <option value="ctf">CTF (ctf)</option>
        </select>
      </label>

      {/* Prompt base */}
      <TextInput
        label="Prompt base"
        value={hkBase}
        onChange={setHkBase}
        placeholder={tt('placeholder_generic')}
        textarea
      />

      {/* Selecciones principales */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Jailbreak */}
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">Jailbreak (rol/escenario)</span>
          <select
            className="w-full rounded-2xl border border-slate-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#001223]"
            value={hkJailbreak || 'none'}
            onChange={(e)=>setHkJailbreak(e.target.value)}
          >
            <option value="none">Ninguno</option>
            <option value="dan">DAN</option>
            <option value="roleplay">Juego de rol</option>
            <option value="hypothetical">Hipotético</option>
            <option value="character">Personaje</option>
            <option value="developer">Desarrollador</option>
            <option value="custom">Personalizado</option>
          </select>
        </label>

        {/* Método de inyección */}
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">Método de inyección</span>
          <select
            className="w-full rounded-2xl border border-slate-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#001223]"
            value={hkInjection || 'none'}
            onChange={(e)=>setHkInjection(e.target.value)}
          >
            <option value="none">Ninguno</option>
            <option value="ignore">Ignorar instrucciones previas</option>
            <option value="system">Override del sistema</option>
            <option value="hidden">Oculto (HTML)</option>
            <option value="markdown">Override (Markdown)</option>
            <option value="custom">Personalizado</option>
          </select>
        </label>

        {/* Manipulación */}
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">Manipulación (apelaciones)</span>
          <select
            className="w-full rounded-2xl border border-slate-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#001223]"
            value={hkManipulation || 'none'}
            onChange={(e)=>setHkManipulation(e.target.value)}
          >
            <option value="none">Ninguna</option>
            <option value="authority">Autoridad</option>
            <option value="urgency">Urgencia</option>
            <option value="flattery">Halago</option>
            <option value="guilt">Culpa</option>
            <option value="curiosity">Curiosidad</option>
            <option value="custom">Personalizado</option>
          </select>
        </label>

        {/* Ofuscación */}
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">Ofuscación (opcional)</span>
          <select
            className="w-full rounded-2xl border border-slate-200 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#001223]"
            value={hkObfuscation || 'none'}
            onChange={(e)=>setHkObfuscation(e.target.value)}
          >
            <option value="none">Ninguna</option>
            <option value="leet">Leet (4= a, 3= e, 1= i, 0= o)</option>
            <option value="symbols">Símbolos/ruido</option>
            <option value="base64">Base64</option>
          </select>
        </label>
      </div>

      {/* Campos personalizados condicionales */}
      {hkJailbreak === 'custom' && (
        <TextInput
          label="Jailbreak personalizado"
          value={hkJailbreakCustom}
          onChange={setHkJailbreakCustom}
          placeholder="[texto de rol/escenario]"
          textarea
        />
      )}
      {hkInjection === 'custom' && (
        <TextInput
          label="Inyección personalizada"
          value={hkInjectionCustom}
          onChange={setHkInjectionCustom}
          placeholder="[override/instrucción del sistema]"
          textarea
        />
      )}
      {hkManipulation === 'custom' && (
        <TextInput
          label="Manipulación personalizada"
          value={hkManipulationCustom}
          onChange={setHkManipulationCustom}
          placeholder="[párrafo psicológico]"
          textarea
        />
      )}

      {/* Bloque final opcional */}
      <TextInput
        label="Custom (extra)"
        value={hkCustom}
        onChange={setHkCustom}
        placeholder="[bloque adicional opcional]"
        textarea
      />
    </div>
  )
}

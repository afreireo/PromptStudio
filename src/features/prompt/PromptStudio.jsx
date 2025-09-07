import React, { useMemo, useState, useEffect } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import ModeForm from './ModeForm.jsx'
import PreviewPane from './PreviewPane.jsx'
import ExportPane from './ExportPane.jsx'
import { tt, i18n } from '../../lib/i18n.js'
import { jailbreaks, injections, manipulations, safetyLabels } from '../../lib/hacking.js'

export default function PromptStudio(){
  const [mode, setMode] = useState('simple')
  const [showLangSelector] = useState(false) // placeholder por si reactivas selector

  // Técnicas
  const [cot, setCot] = useState(false)
  const [few, setFew] = useState(false)
  const [roleKeep, setRoleKeep] = useState(false)
  const [fmt, setFmt] = useState(false)
  const [ctx, setCtx] = useState(false)
  const [readability, setReadability] = useState(false)
  const [allTechniques, setAllTechniques] = useState(false)

  useEffect(() => {
    setCot(allTechniques)
    setFew(allTechniques)
    setRoleKeep(allTechniques)
    setFmt(allTechniques)
    setCtx(allTechniques)
    setReadability(allTechniques)
  }, [allTechniques])

  useEffect(() => {
    const all = cot && few && roleKeep && fmt && ctx && readability
    if (all !== allTechniques) setAllTechniques(all)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cot, few, roleKeep, fmt, ctx, readability])

  // Simple (RAP)
  const [rapRole, setRapRole] = useState('')
  const [rapAudience, setRapAudience] = useState('')
  const [rapPurpose, setRapPurpose] = useState('')

  // Avanzado (CRISP)
  const [crContext, setCrContext] = useState('')
  const [crRole, setCrRole] = useState('')
  const [crInstruction, setCrInstruction] = useState('')
  const [crSpecs, setCrSpecs] = useState('')
  const [crPost, setCrPost] = useState('')

  // Hacking
  const [hkBase, setHkBase] = useState('')
  const [hkJailbreak, setHkJailbreak] = useState('none')
  const [hkInjection, setHkInjection] = useState('none')
  const [hkManipulation, setHkManipulation] = useState('none')
  const [hkCustom, setHkCustom] = useState('')
  const [hkSafety, setHkSafety] = useState('low')
  const [hkEthics, setHkEthics] = useState('')

  const anyTechnique = cot || few || roleKeep || fmt || ctx || readability
  const hackingHasActiveTech = [hkJailbreak, hkInjection, hkManipulation].some((v)=>v && v!== 'none')
  const safetyMarker = safetyLabels[hkSafety]

  const title = useMemo(() => {
    if (mode === 'simple') return rapPurpose || rapRole || '[TÍTULO/PROPÓSITO]'
    if (mode === 'avanzado') return crInstruction || crRole || '[TÍTULO/PROPÓSITO]'
    return 'Prompt de testing ético'
  }, [mode, rapPurpose, rapRole, crInstruction, crRole])

  const preview = useMemo(() => {
    const lines = []
    lines.push(`# ${title}`)

    if (mode === 'simple') {
      if (rapRole) lines.push(`\n**Rol:** ${rapRole}`)
      if (rapAudience) lines.push(`**Audiencia:** ${rapAudience}`)
      if (rapPurpose) lines.push(`**Propósito:** ${rapPurpose}`)
    }

    if (mode === 'avanzado') {
      if (crContext) lines.push(`\n**Contexto:** ${crContext}`)
      if (crRole) lines.push(`**Rol:** ${crRole}`)
      if (crInstruction) lines.push(`**Instrucción:** ${crInstruction}`)
      if (crSpecs) lines.push(`**Especificaciones:** ${crSpecs}`)
      if (crPost) lines.push(`**Post-Procesamiento:** ${crPost}`)
    }

    if (mode === 'hacking') {
      lines.push(`\n${tt('ethical_banner_title')}\n${tt('ethical_banner_body')}`)
      if (hkBase) lines.push(`\n**Prompt base:**\n${hkBase}`)
      if (hkInjection !== 'none') lines.push(`\n**Inyección seleccionada:** ${injections[hkInjection]}`)
      if (hkJailbreak !== 'none') lines.push(`**Jailbreak seleccionado:** ${jailbreaks[hkJailbreak]}`)
      if (hkManipulation !== 'none') lines.push(`**Manipulación seleccionada:** ${manipulations[hkManipulation]}`)
      if (hkCustom) lines.push(`**Técnica personalizada:** ${hkCustom}`)
      if (hackingHasActiveTech) {
        lines.push("\n### Ejemplo funcional (marcado) — Solo demostración segura\n" + [
          hkInjection !== 'none' ? `• Inyección (${hkInjection}): ${injections[hkInjection]}` : null,
          hkJailbreak !== 'none' ? `• Jailbreak (${hkJailbreak}): ${jailbreaks[hkJailbreak]}` : null,
          hkManipulation !== 'none' ? `• Manipulación (${hkManipulation}): ${manipulations[hkManipulation]}` : null
        ].filter(Boolean).join('\n'))
      }
    }

    if (anyTechnique) {
      lines.push('\n## INSTRUCCIONES ADICIONALES\n- Mantén un tono profesional pero accesible\n- Proporciona ejemplos cuando sea apropiado\n- Estructura tu respuesta de manera clara y lógica\n- Considera el nivel de experiencia de la audiencia\n- Asegúrate de que tu respuesta sea específica y orientada al propósito')
    }
    if (fmt) {
      lines.push('\n## FORMATO DE RESPUESTA\nOrganiza tu respuesta en secciones claras con encabezados si es necesario.')
    }
    if (roleKeep) {
      lines.push('\n## CONSISTENCIA DE ROL\nMantén tu rol y expertise consistentemente; no cambies de perspectiva ni te contradigas.')
    }
    if (few) {
      lines.push('\n## EJEMPLOS\nAntes de responder, considera casos similares; incluye ejemplos concretos si aportan claridad.')
    }
    if (cot) {
      lines.push('\n## INSTRUCCIÓN DE RAZONAMIENTO\nPiensa paso a paso y explica el proceso antes de la respuesta final.')
    }
    if (ctx) {
      lines.push('\n## CONSIDERACIÓN DE CONTEXTO\nAdapta la respuesta al contexto proporcionado para maximizar relevancia y utilidad.')
    }
    if (readability) {
      lines.push('\n## ESTRUCTURA DE RESPUESTA\nUsa encabezados, listas numeradas o viñetas para mejorar la legibilidad.')
    }

    if (mode === 'hacking') lines.push(`\n${safetyMarker}`)

    return lines.join('\n')
  }, [title, mode, rapRole, rapAudience, rapPurpose, crContext, crRole, crInstruction, crSpecs, crPost, hkBase, hkInjection, hkJailbreak, hkManipulation, hkCustom, hackingHasActiveTech, fmt, roleKeep, few, cot, ctx, readability, anyTechnique, safetyMarker])

  const structured = useMemo(() => ({
    mode,
    locale: i18n.activeLocale,
    ui: { i18n: { prepared: i18n.prepared, activeLocale: i18n.activeLocale, languageSelectorVisible: i18n.languageSelectorVisible }, theme: { primary: '#001223', palette: 'light' } },
    rap: { role: rapRole || '{{ROL}}', audience: rapAudience || '{{AUDIENCIA}}', purpose: rapPurpose || '{{PROPOSITO}}' },
    crisp: { context: crContext || '{{CONTEXTO}}', role: crRole || '{{ROL}}', instruction: crInstruction || '{{INSTRUCCION}}', specifics: crSpecs || '{{ESPECIFICACIONES}}', postProcess: crPost || '{{POST_PROCESAMIENTO}}' },
    hacking: {
      ethicalNotice: mode === 'hacking',
      base: hkBase || '{{PROMPT_BASE}}',
      jailbreak: hkJailbreak !== 'none' ? hkJailbreak : '',
      injection: hkInjection !== 'none' ? hkInjection : '',
      manipulation: hkManipulation !== 'none' ? hkManipulation : '',
      custom: hkCustom || '',
      safety: hkSafety,
      ethicalJustification: hkEthics || '{{JUSTIFICACION_ETICA}}',
      functionalExamples: mode === 'hacking' && hackingHasActiveTech
    },
    techniques: { cot, few, role: roleKeep, fmt, ctx, readability },
    sections: {
      additionalInstructions: anyTechnique,
      responseFormat: fmt,
      roleConsistency: roleKeep,
      examples: few,
      reasoning: cot,
      contextConsideration: ctx,
      responseStructure: readability,
      ethicalBanner: mode === 'hacking',
      functionalExamples: mode === 'hacking' && hackingHasActiveTech
    },
    markers: { safetyLabel: mode === 'hacking' ? safetyMarker : '' }
  }), [mode, rapRole, rapAudience, rapPurpose, crContext, crRole, crInstruction, crSpecs, crPost, hkBase, hkJailbreak, hkInjection, hkManipulation, hkCustom, hkSafety, hkEthics, hackingHasActiveTech, cot, few, roleKeep, fmt, ctx, readability, anyTechnique, safetyMarker])

  const xmlExport = useMemo(() => {
    const esc = (s) => String(s||'').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<?xml version="1.0" encoding="UTF-8"?>\n<promptStudio mode="${mode}" locale="${i18n.activeLocale}">\n  <ui primary="#001223" palette="light"/>\n  <promptText>\n${esc(preview)}\n  </promptText>\n  <techniques cot="${cot}" few="${few}" role="${roleKeep}" fmt="${fmt}" ctx="${ctx}" readability="${readability}"/>\n  ${mode === 'hacking' ? `<!-- safety -->\n  <hacking safety="${hkSafety}">\n    <ethicalNotice>true</ethicalNotice>\n    <functionalExamples>${hackingHasActiveTech}</functionalExamples>\n    <safetyLabel>${esc(safetyMarker)}</safetyLabel>\n  </hacking>` : ''}\n</promptStudio>`
  }, [mode, preview, cot, few, roleKeep, fmt, ctx, readability, hkSafety, safetyMarker, hackingHasActiveTech])

  const [copied, setCopied] = useState(false)
  const onCopy = async () => { await navigator.clipboard.writeText(preview); setCopied(true); setTimeout(()=>setCopied(false), 1500); }
  const canExport = useMemo(()=> mode !== 'hacking' || hkEthics.trim().length > 0, [mode, hkEthics])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-[#001223] text-white grid place-items-center shadow-md"><Sparkles size={18} /></div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">{tt('app_title')}</h1>
              <p className="text-xs text-slate-500">{tt('subtitle')}</p>
            </div>
          </div>
          {false && (
            <div className="flex items-center gap-2 text-sm">
              <span className="sr-only">Idioma</span>
              <select className="rounded-xl border border-slate-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#001223]" value={i18n.activeLocale} onChange={(e)=> (i18n.activeLocale=e.target.value)}>
                <option value="es-ES">ES</option>
                <option value="en-US">EN</option>
              </select>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar fijo */}
        <aside className="hidden lg:block lg:col-span-3">
          <Sidebar mode={mode} setMode={setMode} techniques={{ allTechniques, setAllTechniques, cot, setCot, few, setFew, roleKeep, setRoleKeep, fmt, setFmt, ctx, setCtx, readability, setReadability }} />
        </aside>

        {/* Formulario dinámico */}
        <section className="col-span-12 lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">{mode === 'simple' ? tt('mode_simple') : mode === 'avanzado' ? tt('mode_advanced') : tt('mode_hacking')}</h2>
              <div className="text-xs text-slate-500 flex items-center gap-1"><ChevronDown size={14}/> {tt('techniques')}</div>
            </div>
            <ModeForm mode={mode} state={{ rapRole, setRapRole, rapAudience, setRapAudience, rapPurpose, setRapPurpose, crContext, setCrContext, crRole, setCrRole, crInstruction, setCrInstruction, crSpecs, setCrSpecs, crPost, setCrPost, hkBase, setHkBase, hkJailbreak, setHkJailbreak, hkInjection, setHkInjection, hkManipulation, setHkManipulation, hkCustom, setHkCustom, hkSafety, setHkSafety, hkEthics, setHkEthics }} />
          </div>
        </section>

        {/* Panel derecho */}
        <section className="col-span-12 lg:col-span-3 space-y-4">
          <PreviewPane preview={preview} onCopy={onCopy} copied={copied} />
          <ExportPane mode={mode} canExport={canExport} preview={preview} xmlExport={xmlExport} structured={structured} />
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-slate-500">
        <p>
          i18n preparado — activo: <strong>{i18n.activeLocale}</strong> — selector oculto. Primario <span className="inline-block h-3 w-3 align-middle rounded-sm ml-1" style={{ background: '#001223' }} /> #001223
        </p>
      </footer>
    </div>
  )
}
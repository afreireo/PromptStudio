// src/views/PromptStudio/PromptStudio.jsx
import React, { useMemo, useState, useEffect } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import ModeForm from './ModeForm.jsx'
import PreviewPane from './PreviewPane.jsx'
import ExportPane from './ExportPane.jsx'
import QuickTemplatesSimple from './QuickTemplatesSimple.jsx'
import QuickTemplatesAdvanced from './QuickTemplatesAdvanced.jsx'
import QuickTemplatesHacking from './QuickTemplatesHacking.jsx'
import { tt, i18n } from '../../lib/i18n.js'
// ❌ eliminado: import { safetyLabels } from '../../lib/hacking.js'

export default function PromptStudio(){
  const [mode, setMode] = useState('simple')
  const [showLangSelector] = useState(false)

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
  const [crVerbosity, setCrVerbosity] = useState('')      // '', 'alta', 'media', 'baja'
  const [crLimitEnabled, setCrLimitEnabled] = useState(false)
  const [crLimitChars, setCrLimitChars] = useState('')

  // Hacking (marco nuevo)
  const [hkContextPreset, setHkContextPreset] = useState('none')
  const [hkBase, setHkBase] = useState('')
  const [hkJailbreak, setHkJailbreak] = useState('none')
  const [hkJailbreakCustom, setHkJailbreakCustom] = useState('')
  const [hkInjection, setHkInjection] = useState('none')
  const [hkInjectionCustom, setHkInjectionCustom] = useState('')
  const [hkManipulation, setHkManipulation] = useState('none')
  const [hkManipulationCustom, setHkManipulationCustom] = useState('')
  const [hkObfuscation, setHkObfuscation] = useState('none')
  const [hkCustom, setHkCustom] = useState('')

  // ❌ eliminados
  // const [hkSafety, setHkSafety] = useState('low')
  // const [hkEthics, setHkEthics] = useState('')

  const anyTechnique = cot || few || roleKeep || fmt || ctx || readability
  const hackingHasActiveTech = [hkJailbreak, hkInjection, hkManipulation].some(v => v && v !== 'none')
  // ❌ eliminado: const safetyMarker = safetyLabels[hkSafety]

  // Preview { text, xml } construido por ModeForm
  const [preview, setPreview] = useState({ text: '', xml: '' })

  // ❌ eliminado: structured (ya no exportamos “GPT-5 structured”)
  // const structured = useMemo(() => ( ... ), [ ... ])

  const xmlExport = useMemo(() => {
    const esc = (s) => String(s||'').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<?xml version="1.0" encoding="UTF-8"?>\n<promptStudio mode="${mode}" locale="${i18n.activeLocale}">\n  <ui primary="#001223" palette="light"/>\n  <promptText>\n${esc(preview.text)}\n  </promptText>\n  <techniques cot="${cot}" few="${few}" role="${roleKeep}" fmt="${fmt}" ctx="${ctx}" readability="${readability}"/>\n</promptStudio>`
    // 🔻 Se quitó el bloque <hacking ...> con safety/ethicalNotice/safetyLabel
  }, [mode, preview.text, cot, few, roleKeep, fmt, ctx, readability, i18n.activeLocale])

  const [copied, setCopied] = useState(false)
  const onCopy = async (textToCopy) => {
    await navigator.clipboard.writeText(textToCopy || '')
    setCopied(true)
    setTimeout(()=>setCopied(false), 1500)
  }

  // ✅ Exportar permitido si hay contenido en el preview
  const canExport = useMemo(() => preview.text.trim().length > 0, [preview.text])

  const techniques = { allTechniques, setAllTechniques, cot, setCot, few, setFew, roleKeep, setRoleKeep, fmt, setFmt, ctx, setCtx, readability, setReadability }

  // === Plantillas rápidas (Simple) ===
  const applySimpleTemplate = (id) => {
    setRapPurpose('')
    setCot(false); setFew(false); setRoleKeep(false); setFmt(false); setCtx(false); setReadability(false)

    if (id === 'none') { setRapRole(''); setRapAudience(''); return }

    switch (id) {
      case 'dev':
        setRapRole('Experto en desarrollo de software.')
        setRapAudience('Programadores que están desarrollando aplicaciones.')
        setCot(true); setFmt(true)
        break
      case 'research':
        setRapRole('Investigador académico especializado en análisis de información.')
        setRapAudience('Profesionales y estudiantes que realizan proyectos de investigación.')
        setCot(true); setFew(true); setFmt(true); setReadability(true)
        break
      case 'comms':
        setRapRole('Especialista en comunicación clara y efectiva.')
        setRapAudience('Profesionales que necesitan transmitir información de manera estructurada y comprensible.')
        setFmt(true); setReadability(true); setCtx(true)
        break
      default: break
    }
  }

  // === Plantillas rápidas (Avanzado/CRISP) ===
  const applyAdvancedTemplate = (id) => {
    setCrInstruction('')
    setCot(false); setFew(false); setRoleKeep(false); setFmt(false); setCtx(false); setReadability(false)
    setCrVerbosity('')
    setCrLimitEnabled(false)
    setCrLimitChars('')

    if (id === 'none') {
      setCrContext(''); setCrRole(''); setCrSpecs(''); setCrPost('')
      return
    }

    switch (id) {
      case 'dev': {
        setCrContext('Proyecto de software en construcción, enfocado en buenas prácticas de programación y eficiencia.')
        setCrRole('Desarrollador de software con experiencia en diseño y arquitectura.')
        setCrSpecs('La respuesta debe incluir pasos claros, ejemplos de código bien comentado y explicar brevemente la lógica detrás de las decisiones.')
        setCrPost('Resumir al final en un checklist los puntos clave.')
        setCrVerbosity('media')
        setCot(true); setFmt(true)
        break
      }
      case 'research': {
        setCrContext('Proyecto de investigación académica, orientado a análisis crítico de información y validación de fuentes.')
        setCrRole('Investigador especializado en metodología científica.')
        setCrSpecs('Incluir referencias simuladas, estructurar la respuesta en secciones (Introducción, Desarrollo, Conclusión) y destacar limitaciones del análisis.')
        setCrPost('Añadir un resumen ejecutivo de máximo 3 líneas al final.')
        setCrVerbosity('alta')
        setCot(true); setCtx(true); setFew(true); setReadability(true); setFmt(true)
        break
      }
      case 'support': {
        setCrContext('Incidencia técnica reportada por un usuario en una aplicación')
        setCrRole('Especialista en soporte técnico con experiencia en resolución de incidencias')
        setCrSpecs('La respuesta debe guiar al usuario con pasos ordenados, soluciones alternativas y validaciones finales')
        setCrPost('Resumir en una lista corta las soluciones probadas')
        setCrVerbosity('baja')
        setCot(true); setFmt(true); setCtx(true); setReadability(true)
        break
      }
      case 'biz': {
        setCrContext('Análisis de estrategia empresarial para optimizar procesos y tomar decisiones')
        setCrRole('Consultor de negocios con experiencia en estrategia y gestión')
        setCrSpecs('Incluir un análisis paso a paso, ejemplos de aplicación práctica y propuestas de acción')
        setCrPost('Presentar al final un resumen ejecutivo con los puntos clave')
        setCrVerbosity('alta')
        setCot(true); setFmt(true); setReadability(true)
        break
      }
      case 'ds': {
        setCrContext('Proyecto de ciencia de datos con análisis exploratorio y modelado predictivo')
        setCrRole('Científico de datos especializado en análisis y modelado')
        setCrSpecs('La respuesta debe incluir pasos claros, ejemplos de código y explicar la lógica detrás de las decisiones')
        setCrPost('Añadir conclusiones y recomendaciones prácticas al final')
        setCrVerbosity('media')
        setCot(true); setFmt(true); setReadability(true)
        break
      }
      default: break
    }
  }

  // === Plantillas rápidas (Hacking) ===
  const applyHackingTemplate = (tplOrId) => {
    const id = typeof tplOrId === 'string' ? tplOrId : (tplOrId?.id || 'none')
    const tpl = typeof tplOrId === 'object' ? tplOrId : null

    if (id === 'none') {
      setHkContextPreset('none')
      setHkJailbreak('none')
      setHkInjection('none')
      setHkManipulation('none')
      setHkObfuscation('none')
      setHkCustom('')
      return
    }

    if (tpl) {
      if (tpl.contextPreset) setHkContextPreset(tpl.contextPreset)
      if (tpl.jailbreak) setHkJailbreak(tpl.jailbreak)
      if (tpl.injection) setHkInjection(tpl.injection)
      if (tpl.manipulation) setHkManipulation(tpl.manipulation)
      if (tpl.obfuscation) setHkObfuscation(tpl.obfuscation)
      setHkCustom(tpl.custom ?? '')
      return
    }

    switch (id) {
      case 'edu': {
        setHkContextPreset('education')
        setHkJailbreak('hypothetical')
        setHkInjection('none')
        setHkManipulation('curiosity')
        setHkObfuscation('none')
        setHkCustom('')
        break
      }
      case 'lab': {
        setHkContextPreset('lab')
        setHkJailbreak('developer')
        setHkInjection('system')
        setHkManipulation('authority')
        setHkObfuscation('none')
        setHkCustom('')
        break
      }
      default: break
    }
  }

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
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <Sidebar mode={mode} setMode={setMode} techniques={techniques} />
        </aside>

        {/* Formulario + Plantillas */}
        <section className="col-span-12 lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                {mode === 'simple' ? tt('mode_simple') : mode === 'avanzado' ? tt('mode_advanced') : tt('mode_hacking')}
              </h2>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <ChevronDown size={14}/> {tt('techniques')}
              </div>
            </div>

            {/* Barra de plantillas según modo */}
            {mode === 'simple' && <QuickTemplatesSimple onApply={applySimpleTemplate} />}
            {mode === 'avanzado' && <QuickTemplatesAdvanced onApply={applyAdvancedTemplate} />}
            {mode === 'hacking' && (
              <QuickTemplatesHacking
                onApply={applyHackingTemplate}
                applyTemplate={applyHackingTemplate}
              />
            )}

            <ModeForm
              mode={mode}
              state={{
                // RAP
                rapRole, setRapRole,
                rapAudience, setRapAudience,
                rapPurpose, setRapPurpose,
                // CRISP
                crContext, setCrContext,
                crRole, setCrRole,
                crInstruction, setCrInstruction,
                crSpecs, setCrSpecs,
                crPost, setCrPost,
                crVerbosity, setCrVerbosity,
                crLimitEnabled, setCrLimitEnabled,
                crLimitChars, setCrLimitChars,
                // HACKING
                hkContextPreset, setHkContextPreset,
                hkBase, setHkBase,
                hkJailbreak, setHkJailbreak,
                hkJailbreakCustom, setHkJailbreakCustom,
                hkInjection, setHkInjection,
                hkInjectionCustom, setHkInjectionCustom,
                hkManipulation, setHkManipulation,
                hkManipulationCustom, setHkManipulationCustom,
                hkObfuscation, setHkObfuscation,
                hkCustom, setHkCustom
                // ❌ ya no pasamos hkSafety ni hkEthics
              }}
              techniques={techniques}
              setPreview={setPreview}
            />
          </div>
        </section>

        {/* Panel derecho */}
        <section className="col-span-12 lg:col-span-3 space-y-4">
          <PreviewPane preview={preview} onCopy={onCopy} copied={copied} />
          {/* ❌ quitado structured */}
          <ExportPane mode={mode} canExport={canExport} preview={preview.text} xmlExport={xmlExport} />
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

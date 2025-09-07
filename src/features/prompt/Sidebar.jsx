import React from 'react'
import { PanelsTopLeft, UserCog, Shield, FlaskConical } from 'lucide-react'
import CheckboxRow from '../../components/CheckboxRow.jsx'
import { classNames } from '../../lib/utils.js'
import { tt } from '../../lib/i18n.js'

export default function Sidebar({ mode, setMode, techniques }){
  const { allTechniques, setAllTechniques, cot, setCot, few, setFew, roleKeep, setRoleKeep, fmt, setFmt, ctx, setCtx, readability, setReadability } = techniques

  return (
    <div className="sticky top-16 space-y-3">
      <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="px-3 py-2 text-xs font-semibold text-slate-500">Modos</div>
        {[
          { key: 'simple', label: tt('mode_simple'), icon: <PanelsTopLeft size={16} /> },
          { key: 'avanzado', label: tt('mode_advanced'), icon: <UserCog size={16} /> },
          { key: 'hacking', label: tt('mode_hacking'), icon: <Shield size={16} /> }
        ].map((m) => (
          <button key={m.key} onClick={()=>setMode(m.key)} className={classNames('w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition', mode===m.key?'bg-[#001223] text-white':'hover:bg-slate-100')}>{m.icon}<span>{m.label}</span></button>
        ))}
      </nav>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2 px-1 pb-2">
          <FlaskConical size={16} className="text-[#001223]" />
          <h3 className="text-sm font-semibold">{tt('techniques')}</h3>
        </div>
        <div className="space-y-2">
          <CheckboxRow title={tt('toggles.all')} description="Activa/desactiva todas las técnicas a la vez." checked={allTechniques} onChange={setAllTechniques} />
          <CheckboxRow title="Chain of Thought" description="Hace que el modelo piense paso a paso" checked={cot} onChange={setCot} />
          <CheckboxRow title="Few-Shot Learning" description="Incluye ejemplos para mejorar la respuesta" checked={few} onChange={setFew} />
          <CheckboxRow title="Role Playing" description="Mantiene el rol consistentemente" checked={roleKeep} onChange={setRoleKeep} />
          <CheckboxRow title="Output Formatting" description="Estructura clara de la respuesta" checked={fmt} onChange={setFmt} />
          <CheckboxRow title="Context Awareness" description="Considera el contexto proporcionado" checked={ctx} onChange={setCtx} />
          <CheckboxRow title="Legibilidad" description="Usa encabezados, listas o viñetas para mejorar la claridad" checked={readability} onChange={setReadability} />
        </div>
      </div>
    </div>
  )
}
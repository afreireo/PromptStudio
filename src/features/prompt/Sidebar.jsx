import React from 'react'
import { PanelsTopLeft, UserCog, Shield, FlaskConical } from 'lucide-react'
import CheckboxRow from '../../components/CheckboxRow.jsx'
import { classNames } from '../../lib/utils.js'
import { tt } from '../../lib/i18n.js'

export default function Sidebar({ mode, setMode, techniques }) {
  const {
    allTechniques, setAllTechniques,
    cot, setCot, few, setFew,
    roleKeep, setRoleKeep, fmt, setFmt,
    ctx, setCtx, readability, setReadability
  } = techniques

  return (
    <div className="sticky top-16 space-y-3">
      {/* --- Navegación de modos --- */}
      <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="px-3 py-2 text-xs font-semibold text-slate-500">Modos</div>
        {[
          { key: 'simple', label: tt('mode_simple'), icon: <PanelsTopLeft size={16} /> },
          { key: 'avanzado', label: tt('mode_advanced'), icon: <UserCog size={16} /> },
          { key: 'hacking', label: tt('mode_hacking'), icon: <Shield size={16} /> }
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={classNames(
              'w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
              mode === m.key
                ? 'bg-[#001223] text-white'
                : 'hover:bg-slate-100'
            )}
          >
            {m.icon}
            <span>{m.label}</span>
          </button>
        ))}
      </nav>

      {/* --- Técnicas --- */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2 px-1 pb-2">
          <FlaskConical size={16} className="text-[#001223]" />
          <h3 className="text-sm font-semibold">{tt('techniques')}</h3>
        </div>

        <div className="space-y-2">
          {/* Switch centrado para activar todas */}
          <div className="flex justify-center py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium text-slate-700">Todas</span>
              <input
                type="checkbox"
                checked={allTechniques}
                onChange={(e) => setAllTechniques(e.target.checked)}
                className="sr-only"
              />
              <div
                className={classNames(
                  "w-10 h-6 flex items-center rounded-full p-1 transition-colors",
                  allTechniques ? "bg-[#001223]" : "bg-slate-300"
                )}
              >
                <div
                  className={classNames(
                    "bg-white w-4 h-4 rounded-full shadow-md transform transition-transform",
                    allTechniques ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </div>
            </label>
          </div>

          {/* El resto siguen siendo checkboxes */}
          <CheckboxRow title="Razonamiento en cadena" description="Pensamiento paso a paso" checked={cot} onChange={setCot} />
          <CheckboxRow title="Aprendizaje con ejemplos" description="Ejemplos en la respuesta" checked={few} onChange={setFew} />
          <CheckboxRow title="Juego de roles" description="Mantiene el rol consistente" checked={roleKeep} onChange={setRoleKeep} />
          <CheckboxRow title="Formato de salida" description="Estructura clara de la respuesta" checked={fmt} onChange={setFmt} />
          <CheckboxRow title="Conciencia pasada" description="Considera todo contexto" checked={ctx} onChange={setCtx} />
          <CheckboxRow title="Legibilidad" description="Mejorar la claridad" checked={readability} onChange={setReadability} />
        </div>
      </div>
    </div>
  )
}

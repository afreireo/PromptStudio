// src/features/prompt/QuickTemplatesAdvanced.jsx
import React from 'react'

export default function QuickTemplatesAdvanced({ onApply }) {
  const templates = [
    { id: 'none', label: 'Ninguna' },
    { id: 'dev', label: 'Desarrollo' },
    { id: 'research', label: 'Investigación' },
    { id: 'support', label: 'Soporte Técnico' },
    //{ id: 'biz', label: 'Negocios' },
    { id: 'ds', label: 'Ciencia de Datos' },
  ]

  return (
    <div className="mb-3">
      <div className="text-[11px] font-medium text-slate-500 mb-1">
        Plantillas rápidas:
      </div>
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1 px-2">
        {templates.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => onApply(t.id)}
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#001223]"
            title={`Aplicar plantilla: ${t.label}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

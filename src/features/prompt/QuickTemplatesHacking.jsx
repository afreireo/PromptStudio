// src/features/prompt/QuickTemplatesHacking.jsx
import React from 'react'

export default function QuickTemplatesHacking({ applyTemplate }) {
  const templates = [
    { id: 'none', label: 'Ninguna' },
    {
      id: 'edu',
      label: 'Educación',
      contextPreset: 'education',
      jailbreak: 'hypothetical',
      injection: 'none',
      manipulation: 'curiosity',
      obfuscation: 'none',
      custom: ''
    },
    {
      id: 'lab',
      label: 'Laboratorio',
      contextPreset: 'lab',
      jailbreak: 'developer',
      injection: 'system', // override del sistema
      manipulation: 'authority',
      obfuscation: 'none',
      custom: ''
    }
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1 px-2">
      <span className="text-xs font-medium text-slate-600">Plantillas rápidas:</span>
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => applyTemplate(t)}
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs shadow-sm 
                     hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#001223]
                     first:ml-1 last:mr-1"
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

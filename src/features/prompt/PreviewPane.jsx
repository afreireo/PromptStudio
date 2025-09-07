import React from 'react'
import { PanelsTopLeft, Copy } from 'lucide-react'
import { tt } from '../../lib/i18n.js'

export default function PreviewPane({ preview, onCopy, copied }) {
  // preview: { text, xml }
  const [view, setView] = React.useState('text') // 'text' | 'xml'
  const content = view === 'text' ? (preview?.text || '') : (preview?.xml || '')

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <PanelsTopLeft size={16}/> {tt('preview')}
        </h3>
        <button
          onClick={() => onCopy?.(content)}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#001223]"
          title={tt('copy')}
        >
          <Copy size={16} /> {copied ? tt('copied') : tt('copy')}
        </button>
      </div>

      {/* Tabs (debajo del header) */}
      <div className="px-4 pt-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5">
          <button
            type="button"
            onClick={() => setView('text')}
            className={`px-2.5 py-1 text-[11px] leading-none rounded-full ${view==='text' ? 'bg-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            aria-pressed={view==='text'}
          >
            txt
          </button>
          <button
            type="button"
            onClick={() => setView('xml')}
            className={`px-2.5 py-1 text-[11px] leading-none rounded-full ${view==='xml' ? 'bg-white shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            aria-pressed={view==='xml'}
          >
            xml
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <pre
          className="whitespace-pre-wrap text-sm leading-relaxed font-medium
                     text-slate-900 bg-slate-100 rounded-xl p-4
                     border border-slate-200 max-h-[60vh] overflow-auto"
        >
{content}
        </pre>
      </div>
    </div>
  )
}

import React from 'react'
import { PanelsTopLeft, Copy } from 'lucide-react'
import { tt } from '../../lib/i18n.js'

export default function PreviewPane({ preview, onCopy, copied }){
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold flex items-center gap-2"><PanelsTopLeft size={16}/> {tt('preview')}</h3>
        <div className="flex items-center gap-2">
          <button onClick={onCopy} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#001223]" title={tt('copy')}>
            <Copy size={16} /> {copied ? tt('copied') : tt('copy')}
          </button>
        </div>
      </div>
      <div className="p-4">
        <article className="prose prose-slate max-w-none">
          <pre className="whitespace-pre-wrap text-xs leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-200">{preview}</pre>
        </article>
      </div>
    </div>
  )
}
import React from 'react'
import { Download } from 'lucide-react'
import { tt } from '../../lib/i18n.js'
import { classNames, downloadFile } from '../../lib/utils.js'

export default function ExportPane({ mode, canExport, preview, xmlExport, structured }){
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Download size={16}/> {tt('export')}</h3>
      </div>
      {mode === 'hacking' && !canExport && (
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-2">{tt('disabled_export_tip')}</p>
      )}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <button disabled={!canExport} onClick={()=>downloadFile('prompt.txt', preview)} className={classNames('rounded-xl px-3 py-2 text-sm shadow-sm border transition', canExport?'bg-[#001223] text-white':'bg-slate-100 text-slate-400 border-slate-200')}>{tt('export_text')}</button>
        <button disabled={!canExport} onClick={()=>downloadFile('prompt.xml', xmlExport, 'application/xml')} className={classNames('rounded-xl px-3 py-2 text-sm shadow-sm border transition', canExport?'bg-[#001223] text-white':'bg-slate-100 text-slate-400 border-slate-200')}>{tt('export_xml')}</button>
        <button disabled={!canExport} onClick={()=>downloadFile('prompt-structured.json', JSON.stringify(structured, null, 2), 'application/json')} className={classNames('rounded-xl px-3 py-2 text-sm shadow-sm border transition', canExport?'bg-[#001223] text-white':'bg-slate-100 text-slate-400 border-slate-200')}>{tt('export_json')}</button>
      </div>
    </div>
  )
}
import React from 'react'

export default function CheckboxRow({ checked, onChange, title, description }){
  return (
    <label className="flex items-start gap-3 p-3 rounded-2xl border border-slate-200 bg-white shadow-sm cursor-pointer hover:border-slate-300">
      <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-[#001223] focus:ring-[#001223]" />
      <span className="text-sm leading-tight">
        <span className="block font-semibold text-slate-800">{title}</span>
        {description && <span className="block text-slate-600 font-normal">{description}</span>}
      </span>
    </label>
  )
}
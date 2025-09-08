import React from 'react'
import { classNames } from '../lib/utils'

export default function TextInput({ label, value, onChange, placeholder, textarea = false }){
  const base = 'w-full rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001223] bg-white placeholder-slate-400 shadow-sm'
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className={classNames(base, 'p-3 min-h-[50px]')} />
      ) : (
        <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className={classNames(base, 'p-3')} />
      )}
    </label>
  )
}
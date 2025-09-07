import React from 'react'
import TextInput from '../../components/TextInput.jsx'
import { tt } from '../../lib/i18n.js'

export default function ModeForm({ mode, state }){
  const { rapRole, setRapRole, rapAudience, setRapAudience, rapPurpose, setRapPurpose, crContext, setCrContext, crRole, setCrRole, crInstruction, setCrInstruction, crSpecs, setCrSpecs, crPost, setCrPost, hkBase, setHkBase, hkJailbreak, setHkJailbreak, hkInjection, setHkInjection, hkManipulation, setHkManipulation, hkCustom, setHkCustom, hkSafety, setHkSafety, hkEthics, setHkEthics } = state

  if (mode === 'simple') {
    return (
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <TextInput label={tt('simple_fields.role')} value={rapRole} onChange={setRapRole} placeholder={tt('placeholder_generic')} />
        <TextInput label={tt('simple_fields.audience')} value={rapAudience} onChange={setRapAudience} placeholder={tt('placeholder_generic')} />
        <div className="md:col-span-2">
          <TextInput label={tt('simple_fields.purpose')} value={rapPurpose} onChange={setRapPurpose} placeholder={tt('placeholder_generic')} />
        </div>
      </div>
    )
  }

  if (mode === 'avanzado') {
    return (
      <div className="mt-4 grid grid-cols-1 gap-3">
        <TextInput label={tt('advanced_fields.context')} value={crContext} onChange={setCrContext} placeholder={tt('placeholder_generic')} textarea />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextInput label={tt('advanced_fields.role')} value={crRole} onChange={setCrRole} placeholder={tt('placeholder_generic')} />
          <TextInput label={tt('advanced_fields.instruction')} value={crInstruction} onChange={setCrInstruction} placeholder={tt('placeholder_generic')} />
        </div>
        <TextInput label={tt('advanced_fields.specifics')} value={crSpecs} onChange={setCrSpecs} placeholder={tt('placeholder_generic')} textarea />
        <TextInput label={tt('advanced_fields.post')} value={crPost} onChange={setCrPost} placeholder={tt('placeholder_generic')} textarea />
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
        <div className="font-semibold">{tt('ethical_banner_title')}</div>
        <div>{tt('ethical_banner_body')}</div>
      </div>
      <TextInput label={tt('hacking_fields.base')} value={hkBase} onChange={setHkBase} placeholder={tt('placeholder_generic')} textarea />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">{tt('hacking_fields.jailbreak')}</span>
          <select className="w-full rounded-2xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#001223] bg-white" value={hkJailbreak} onChange={(e)=>setHkJailbreak(e.target.value)}>
            <option value="none">{tt('selects.none')}</option>
            <option value="dan">{tt('selects.dan')}</option>
            <option value="developer">{tt('selects.developer')}</option>
            <option value="custom">{tt('selects.custom')}</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">{tt('hacking_fields.injection')}</span>
          <select className="w-full rounded-2xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#001223] bg-white" value={hkInjection} onChange={(e)=>setHkInjection(e.target.value)}>
            <option value="none">{tt('selects.none')}</option>
            <option value="prompt">{tt('selects.prompt')}</option>
            <option value="context">{tt('selects.context')}</option>
            <option value="role">{tt('selects.role')}</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">{tt('hacking_fields.manipulation')}</span>
          <select className="w-full rounded-2xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#001223] bg-white" value={hkManipulation} onChange={(e)=>setHkManipulation(e.target.value)}>
            <option value="none">{tt('selects.none')}</option>
            <option value="urgency">{tt('selects.urgency')}</option>
            <option value="flattery">{tt('selects.flattery')}</option>
            <option value="guilt">{tt('selects.guilt')}</option>
            <option value="curiosity">{tt('selects.curiosity')}</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-slate-600">{tt('hacking_fields.safety')}</span>
          <select className="w-full rounded-2xl border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#001223] bg-white" value={hkSafety} onChange={(e)=>setHkSafety(e.target.value)}>
            <option value="low">{tt('selects.low')}</option>
            <option value="medium">{tt('selects.medium')}</option>
            <option value="high">{tt('selects.high')}</option>
            <option value="stealth">{tt('selects.stealth')}</option>
          </select>
        </label>
      </div>
      <TextInput label={tt('hacking_fields.custom')} value={hkCustom} onChange={setHkCustom} placeholder={tt('placeholder_generic')} textarea />
      <TextInput label={tt('hacking_fields.ethics')} value={hkEthics} onChange={setHkEthics} placeholder={tt('placeholder_generic')} textarea />
    </div>
  )
}
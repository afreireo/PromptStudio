// src/lib/builders.js

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* ===================== RAP (Simple) ===================== */
/**
 * techniques: Array<{ name: string, instruction?: string }>
 * (También admite Array<string> para compatibilidad; se toma como {name}).
 * Solo se imprimen campos no vacíos.
 */
export function buildRAP({ role = '', audience = '', purpose = '', techniques = [] }) {
  // normalizar técnicas (strings -> objetos)
  const techs = (Array.isArray(techniques) ? techniques : [])
    .map(t => typeof t === 'string' ? ({ name: t }) : (t || {}))
    .map(t => ({ name: (t.name || '').trim(), instruction: (t.instruction || '').trim() }))
    .filter(t => t.name || t.instruction)

  // ===== TXT =====
  const lines = ['[RAP]']
  if (role)     lines.push(`Role: ${role}`)
  if (audience) lines.push(`Audience: ${audience}`)
  if (purpose)  lines.push(`Purpose: ${purpose}`)
  if (techs.length) {
    lines.push('Techniques:')
    techs.forEach(t => {
      if (t.name && t.instruction) lines.push(`- ${t.name}: ${t.instruction}`)
      else if (t.name)             lines.push(`- ${t.name}`)
      else if (t.instruction)      lines.push(`- ${t.instruction}`)
    })
  }
  const text = lines.join('\n')

  // ===== XML =====
  const xmlParts = ['<RAP>']
  if (role)     xmlParts.push(`  <Role>${esc(role)}</Role>`)
  if (audience) xmlParts.push(`  <Audience>${esc(audience)}</Audience>`)
  if (purpose)  xmlParts.push(`  <Purpose>${esc(purpose)}</Purpose>`)
  if (techs.length) {
    xmlParts.push('  <Techniques>')
    xmlParts.push(
      techs.map(t => {
        const name = t.name ? `\n      <Name>${esc(t.name)}</Name>` : ''
        const instr = t.instruction ? `\n      <Instruction>${esc(t.instruction)}</Instruction>` : ''
        return `    <Technique>${name}${instr}\n    </Technique>`
      }).join('\n')
    )
    xmlParts.push('  </Techniques>')
  }
  xmlParts.push('</RAP>')
  const xml = xmlParts.join('\n')

  return { text, xml }
}

/* ===================== CRISP (Avanzado) ===================== */
/* Solo imprime campos presentes (placeholder mejorado) */
export function buildCRISP({ context = '', role = '', instruction = '', specifics = '', post = '' }) {
  // TXT
  const lines = ['[CRISP]']
  if (context)    lines.push(`Context: ${context}`)
  if (role)       lines.push(`Role: ${role}`)
  if (instruction)lines.push(`Instruction: ${instruction}`)
  if (specifics)  lines.push(`Specifics: ${specifics}`)
  if (post)       lines.push(`Post-Process: ${post}`)
  const text = lines.join('\n')

  // XML
  const xml = [
    '<CRISP>',
    context     ? `  <Context>${esc(context)}</Context>`       : null,
    role        ? `  <Role>${esc(role)}</Role>`                 : null,
    instruction ? `  <Instruction>${esc(instruction)}</Instruction>` : null,
    specifics   ? `  <Specifics>${esc(specifics)}</Specifics>`  : null,
    post        ? `  <PostProcess>${esc(post)}</PostProcess>`   : null,
    '</CRISP>'
  ].filter(Boolean).join('\n')

  return { text, xml }
}

/* ===================== HACKING ===================== */
/* Solo imprime campos presentes (placeholder mejorado) */
export function buildHacking({ base = '', jailbreak = '', injection = '', manipulation = '', custom = '', safety = '', ethics = '' }) {
  // TXT
  const lines = ['[HACKING]']
  if (base)         lines.push(`Base: ${base}`)
  if (jailbreak)    lines.push(`Jailbreak: ${jailbreak}`)
  if (injection)    lines.push(`Injection: ${injection}`)
  if (manipulation) lines.push(`Manipulation: ${manipulation}`)
  if (custom)       lines.push(`Custom: ${custom}`)
  if (safety)       lines.push(`Safety: ${safety}`)
  if (ethics)       lines.push(`Ethics: ${ethics}`)
  const text = lines.join('\n')

  // XML
  const xml = [
    '<HACKING>',
    base         ? `  <Base>${esc(base)}</Base>`                 : null,
    jailbreak    ? `  <Jailbreak>${esc(jailbreak)}</Jailbreak>`  : null,
    injection    ? `  <Injection>${esc(injection)}</Injection>`  : null,
    manipulation ? `  <Manipulation>${esc(manipulation)}</Manipulation>` : null,
    custom       ? `  <Custom>${esc(custom)}</Custom>`           : null,
    safety       ? `  <Safety>${esc(safety)}</Safety>`           : null,
    ethics       ? `  <Ethics>${esc(ethics)}</Ethics>`           : null,
    '</HACKING>'
  ].filter(Boolean).join('\n')

  return { text, xml }
}

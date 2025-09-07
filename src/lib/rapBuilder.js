// src/lib/rapBuilder.js
export function buildRap({ role, audience, purpose, techniques }) {
    const techList = techniques.filter(Boolean); // recibe array de strings (ya filtrado)
    const text =
  `[RAP]
  Role: ${role}
  Audience: ${audience}
  Purpose: ${purpose}
  Techniques: ${techList.join(', ')}`;
  
    const xml =
  `<RAP>
    <Role>${role}</Role>
    <Audience>${audience}</Audience>
    <Purpose>${purpose}</Purpose>
    <Techniques>
  ${techList.map(t => `    <Technique>${t}</Technique>`).join('\n')}
    </Techniques>
  </RAP>`;
  
    return { text, xml };
  }
  
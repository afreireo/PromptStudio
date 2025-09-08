# PromptStudio

Generador de prompts interactivo construido con **React + Vite + Tailwind**.  
Incluye modos de creación guiados, técnicas de Prompt Engineering, plantillas rápidas y previsualización/exportación en **TXT** y **XML**.

--> [https://afreireo.github.io/PromptStudio](https://afreireo.github.io/PromptStudio)

---

## Modos principales

### 🔹 Modo Simple (RAP)
> Rol + Audiencia + Propósito → para prompts rápidos y claros.

<img width="1287" height="782" alt="2025-09-08_00-14-44" src="https://github.com/user-attachments/assets/ea57d7ff-9b18-4f75-b5af-e70cf86f0c8d" />

---
### 🔹 Modo Avanzado (CRISP)
> Contexto + Rol + Instrucción + Especificaciones + Post-procesamiento.  
Ideal para prompts largos, técnicos o de investigación.

<img width="1305" height="775" alt="2025-09-08_00-14-54" src="https://github.com/user-attachments/assets/c9a1d9f4-adf2-4e1c-9117-dc1da8a91d74" />

---

### 🔹 Modo Hacking
> Entorno controlado de laboratorio para **pruebas de jailbreak y prompt injection**.  
Permite configurar contexto, técnicas de manipulación, métodos de inyección y ofuscación.

<img width="1306" height="785" alt="2025-09-08_00-15-03" src="https://github.com/user-attachments/assets/8c01c67e-630b-4e4f-bc08-4446fdb0ad05" />

---

##  Características principales
- **Tres modos de creación**:
  1. **Simple (RAP)** → estructura rápida basada en **Rol, Audiencia, Propósito**.
  2. **Avanzado (CRISP)** → prompts más completos con **Contexto, Rol, Instrucción, Especificaciones, Post-procesamiento**.
  3. **Hacking** → pantalla especial para **testing de jailbreaks y prompt injections** en un entorno educativo/laboratorio.

- **Técnicas de Prompt Engineering**:  
  Instrucción paso a paso (CoT), ejemplos (Few-shot), consistencia de rol, formato de salida, consideración de contexto y legibilidad.

- **Plantillas rápidas**:  
  Acceso directo a configuraciones predefinidas (desarrollo, investigación, soporte, negocio, etc.).

- **Previsualización**:  
  Genera la vista previa de tus prompts en **texto plano** o en formato **XML** exportable.

---

## ⚙️ Tecnologías
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) para iconos
- [gh-pages](https://www.npmjs.com/package/gh-pages) para deploy

---

## 📦 Scripts disponibles

- `npm run dev` → servidor de desarrollo  
- `npm run build` → compilar para producción  
- `npm run preview` → previsualizar build local  
- `npm run deploy` → publicar en GitHub Pages (`gh-pages`)

---

## 📄 Licencia
MIT

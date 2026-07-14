// url=https://www.figma.com/design/VibdutrclLgS5EpFWgbJhH/Portfolio-%7C-AI-Handoff?node-id=197-3056
// source=portfolio/src/components/layout/Footer.tsx
// component=Footer
import figma from 'figma'
const instance = figma.selectedInstance

// Figma component set (197:3056) exposes VARIANT "Property 1" with breakpoint
// variants: Footer-360, Footer-768, Footer-1024, Footer-1440, Footer-1920.
// The code Footer component has no props — responsiveness is handled via Tailwind
// breakpoints (desktop:, etc.), so variant mapping is intentionally omitted.

export default {
  example: figma.code`<Footer />`,
  imports: ['import { Footer } from "@/components/layout/Footer"'],
  id: 'footer',
}

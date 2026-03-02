# Interactive 3D Portfolio: Game & VR Developer

## System Architecture
This repository contains the source code for an interactive 3D portfolio, designed with a strict hybrid dual-layer architecture (WebGL + DOM). The 3D engine acts strictly as an interactive tech demo, while the User Interface resides entirely in the DOM to ensure frictionless accessibility, SEO, and readability. Spatial navigation uses *raycasting* with Bézier curve interpolation and quaternion alignment for smooth and deterministic camera transitions.

## Tech Stack & Extreme Optimization

* **Core Framework:** React 19 + TypeScript. Strict typing is non-negotiable to ensure the stability of transformation matrices, UI states, and 3D vector math in the rendering *loop*. Bundled with **Vite** for HMR and optimized *builds*.
* **Rendering Engine:** Three.js via React Three Fiber (R3F). R3F acts as a reconciler, declaratively managing the allocation and destruction of geometry and materials in VRAM in sync with the React component lifecycle, preventing *memory leaks*.
* **Animation & Easing:** GSAP (GreenSock). Manages the temporal interpolation of the camera and trajectories independent of framerate, replacing raw `requestAnimationFrame` math with standardized non-linear *easing* functions.
* **3D Asset Pipeline:** Models exported in `.glb`, optimized with spatial compression (Draco/Meshopt). Textures use KTX2 (Basis Universal) compression targeted at the GPU, drastically reducing network *payload* and *parsing* times.
* **Infrastructure & Backend:** Vercel. Static frontend hosting coupled with Serverless Functions (`/api` directory). O formulário de contacto comunica via `fetch` assíncrono com o *endpoint* `/api/contact`, que utiliza o SDK da **Resend** em ambiente isolado. Devido à ausência de um domínio de nível superior (TLD) dedicado, a infraestrutura de email opera estritamente no modo *Sandbox* da Resend, possuindo um remetente estático (`onboarding@resend.dev`) e permitindo o envio de *payloads* exclusivamente para o email do administrador.

## Data Structure & Current Implementation

### Foundation & State Management
* **Project Setup:** Base development environment established with Vite, explicitly configured for React 19 and strict TypeScript checking.
* **State Lifting & Flat Topology (`App.tsx`):** Navigation state (`activeSection`) and WebGL interaction state (`hoveredSection`) have been lifted to the root component. This establishes a *Single Source of Truth* that synchronizes the DOM `Navbar` with GPU-level *raycast* events strictly via unidirectional data flow, avoiding recursive re-renders. The DOM tree is strictly flattened to prevent rendering bottlenecks.

### Data Layer (`src/data`)
* **Logical Isolation & Strict Typing:** Static data is extracted into strictly typed constants (`aboutData.ts`, `experienceData.ts`, `projectData.ts`, `gameJamData.ts`, `publicationData.ts`, and `config.ts`).
* **Union Types & Optional Chains:** Enforces compiler-level rejection of arbitrary strings (e.g., `PublicationStatus`, `WorkMode`). Ensures deterministic conditional rendering for complex node actions (e.g., evaluating `paperLink` vs `awardLink`).

### WebGL Layer (`src/components/canvas`)
* **Global Scene Setup:** R3F Canvas configured with `ACESFilmicToneMapping` and `SRGBColorSpace` for accurate PBR rendering, and dynamic *pixel ratio* (`dpr={[1, 2]}`) to support *high-DPI* screens.
* **Space Environment (`Space.tsx`):** Volumetric background system using the default Drei `<Stars />` component.
* **Deterministic Orbital Geometry:** Planet vectors in `config.ts` are mathematically distributed using strict trigonometric projection ($r=8.5$, $\theta = n \cdot 60^\circ$). This guarantees a perfectly stable 3D ring layout, preventing camera FOV distortion and GSAP interpolation anomalies.
* **Camera Control Lockdown:** `OrbitControls` acts as a passive state machine. `autoRotate` is enabled during the global IDLE state but completely locked (`enableRotate={false}`) the millisecond a node is clicked, freezing the coordinate system to deliver clean vectors to GSAP.
* **Planet System (`Planet.tsx`):** Employs `useFrame` for GPU-isolated scale interpolation (`lerp`) on hover events. This mutates the 3D matrix directly in the render loop without triggering the React component lifecycle, keeping the framerate strictly at 60/120Hz.
* **FSM Character Animation (`ContactCharacter.tsx`):** 3D model animations are strictly governed by a Finite State Machine (`enum`) to handle blending (crossfade) between `Idle`, `Nodding`, and `Running` states, preventing impossible geometry overlapping.

### DOM Layer (`src/components/dom`)
* **CSS Architecture (`SharedPanels.css` & Scoped CSS):** Global extraction of UI patterns (Glassmorphism interfaces). Specific components like `Contact.css` utilize strict **CSS Grid** definitions to enforce absolute spatial determinism, isolating the DOM layout from the nested WebGL `<Canvas>` to completely eliminate *layout thrashing* and CLS.
* **Navigation Overlay (`Navbar.tsx`):** Pure component, event-driven via *props*. Implements localized styling updates based on the globally lifted `hoveredSection` state without compromising sibling components.
* **UI Panels:** High-performance functional components utilizing `React.memo` to block unnecessary cascading re-renders.
  * O `Contact.tsx` implementa *parsing* defensivo da resposta do servidor (`JSON.parse` blindado) e controlo de concorrência com *debounce* rigoroso no input de dados para estabilizar os *dispatches* da FSM do WebGL.
  * Heavy use of short-circuit evaluation (`&&`) guarantees deterministic DOM tree injection for optional data fields.

## Next Steps / Roadmap

* **Camera Interpolation (GSAP):** Intercept the `worldPosition` vector emitted by clicking on the `<Planet />` models to calculate and execute non-linear spatial camera transitions.
* **Close Event Management (Toggle):** Configure GSAP to listen for the `activeSection` state nullification and smoothly revert the camera to the global origin coordinates.

## Local Execution & Deployment (Vercel CLI)

A utilização do servidor nativo do Vite (`npm run dev`) está estritamente proibida, pois carece de capacidade para emular as *Serverless Functions* localizadas na diretoria `/api`. Para garantir a integridade entre o *frontend* e a API da Resend no ambiente de desenvolvimento, é imperativo o uso da **Vercel CLI**.

```bash
# 1. Instalar dependências globais e de projeto
npm i -g vercel
npm install

# 2. Autenticar e ligar o projeto local ao Vercel
vercel login
vercel link

# 3. Configurar Variáveis de Ambiente
# Se já estiverem configuradas no Vercel, puxar diretamente:
vercel env pull .env.local

# CASO CONTRÁRIO, criar manualmente o ficheiro .env.local na raiz com as credenciais do modo Sandbox:
# RESEND_API_KEY=re_tua_chave_aqui
# DESTINATION_EMAIL=o_teu_email_registado_no_resend@dominio.com

# 4. Iniciar o servidor de desenvolvimento unificado (Frontend + Serverless Backend)
vercel dev
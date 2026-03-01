# Interactive 3D Portfolio: Game & VR Developer

## System Architecture
This repository contains the source code for an interactive 3D portfolio, designed with a strict hybrid dual-layer architecture (WebGL + DOM). The 3D engine acts strictly as an interactive tech demo, while the User Interface resides entirely in the DOM to ensure frictionless accessibility, SEO, and readability. Spatial navigation uses *raycasting* with Bézier curve interpolation and quaternion alignment for smooth and deterministic camera transitions.

## Tech Stack & Extreme Optimization

* **Core Framework:** React 19 + TypeScript. Strict typing is non-negotiable to ensure the stability of transformation matrices, UI states, and 3D vector math in the rendering *loop*. Bundled with **Vite** for HMR and optimized *builds*.
* **Rendering Engine:** Three.js via React Three Fiber (R3F). R3F acts as a reconciler, declaratively managing the allocation and destruction of geometry and materials in VRAM in sync with the React component lifecycle, preventing *memory leaks*.
* **Animation & Easing:** GSAP (GreenSock). Manages the temporal interpolation of the camera and trajectories independent of framerate, replacing raw `requestAnimationFrame` math with standardized non-linear *easing* functions.
* **3D Asset Pipeline:** Models exported in `.glb`, optimized with spatial compression (Draco/Meshopt). Textures use KTX2 (Basis Universal) compression targeted at the GPU, drastically reducing network *payload* and *parsing* times.
* **Infrastructure & Backend:** Vercel. Static frontend hosting coupled with Serverless Functions (`/api` directory). The contact form integrates the **Resend** transactional API in an isolated environment, bypassing dedicated servers and unnecessary latency.

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
  * *Debounce* logic applied to keyboard input (`Contact.tsx`) to optimize UI thread scheduling and stabilize FSM dispatches.
  * Heavy use of short-circuit evaluation (`&&`) guarantees deterministic DOM tree injection for optional data fields.

## Next Steps / Roadmap

* **Camera Interpolation (GSAP):** Intercept the `worldPosition` vector emitted by clicking on the `<Planet />` models to calculate and execute non-linear spatial camera transitions.
* **Close Event Management (Toggle):** Configure GSAP to listen for the `activeSection` state nullification and smoothly revert the camera to the global origin coordinates.

## Local Execution & Deployment

To run the application in a local development environment, it is imperative to configure the environment variables responsible for the email *gateway*.

```bash
# 1. Install project dependencies
npm install

# 2. Configure the environment (create a .env.local file in the root)
# Insert: RESEND_API_KEY=your_production_key_here

# 3. Start local server with Hot Module Replacement
npm run dev
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
* **State Lifting & Flat Topology (`App.tsx`):** Navigation state (`activeSection`) has been lifted to the root component, establishing a *Single Source of Truth* that simultaneously and synchronously orchestrates WebGL and DOM click triggers. The DOM tree is strictly flattened to prevent rendering bottlenecks (Composite/Paint layers overhead), including a static semantic `<footer>` for copyright injection.

### Data Layer (`src/data`)
* **Logical Isolation & Strict Typing:** Static data is extracted into strictly typed constants (`aboutData.ts`, `experienceData.ts`, `projectData.ts`, `gameJamData.ts`, and `config.ts`).
* **Union Types & Optional Chains:** Enforces compiler-level rejection of arbitrary strings (e.g., `WorkMode`, `ProjectType`), preventing runtime parsing errors and ensuring deterministic conditional rendering for optional action links.

### WebGL Layer (`src/components/canvas`)
* **Global Scene Setup:** R3F Canvas configured with `ACESFilmicToneMapping` and `SRGBColorSpace` for accurate PBR rendering, and dynamic *pixel ratio* (`dpr={[1, 2]}`) to support *high-DPI* screens without dropping *frames*.
* **Space Environment (`Space.tsx`):** Volumetric background system using the default Drei `<Stars />` component (7,000 particles).
* **Camera Control Lockdown:** `OrbitControls` manually restricted (`enableZoom={false}`, `enablePan={false}`). This is mathematically mandatory to preserve the integrity of the camera's position and target vectors prior to GSAP non-linear interpolations.
* **Planet System (`Planet.tsx`):** Modular and dynamic 3D object handler triggering custom cursors and click events via *raycast* that emit the exact `worldPosition` of the target.

### DOM Layer (`src/components/dom`)
* **CSS Architecture (`SharedPanels.css`):** Global extraction of common UI patterns (Glassmorphism interfaces, typography, custom scrollbars, and timeline topologies). This enforces DRY principles, optimizes CSSOM parsing by the browser, and eliminates redundant payload from the Vite build pipeline. Specific components (`About.css`, `Experience.css`, `Projects.css`, `GameJams.css`) retain only strict structural overrides or unique visual identities.
* **Navigation Overlay (`Navbar.tsx`):** Pure component, event-driven via *props*, with a *flexbox layout* and advanced GPU-accelerated *Glassmorphism* styling.
* **UI Panels (`About.tsx`, `Experience.tsx`, `Projects.tsx`, `GameJams.tsx`):** High-performance functional components utilizing `React.memo` to block unnecessary re-renders.
  * Raster images are purged where possible to eliminate HTTP requests and prevent Cumulative Layout Shifts (CLS).
  * Heavy use of short-circuit evaluation (`&&`) guarantees deterministic DOM tree injection for optional data fields.
  * Flexbox is restricted to rigid axes to prevent layout thrashing during DOM reflows.

## Next Steps / Roadmap

* **Camera Interpolation (GSAP):** Intercept the `worldPosition` vector emitted by clicking on the `<Planet />` models to calculate and execute non-linear spatial camera transitions.
* **Close Event Management (Toggle):** Configure GSAP to listen for the `activeSection` state nullification and smoothly revert the camera to the global origin coordinates.
* **Asset Loading:** Introduce loading barriers (Suspense *fallbacks*) to ensure the initial render does not block the *main thread*.

## Local Execution & Deployment

To run the application in a local development environment, it is imperative to configure the environment variables responsible for the email *gateway*.

```bash
# 1. Install project dependencies
npm install

# 2. Configure the environment (create a .env.local file in the root)
# Insert: RESEND_API_KEY=your_production_key_here

# 3. Start local server with Hot Module Replacement
npm run dev
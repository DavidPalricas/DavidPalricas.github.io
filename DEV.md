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
* **State Lifting (App.tsx):** Navigation state (`activeSection`) has been lifted to the root component, establishing a *Single Source of Truth* that simultaneously and synchronously orchestrates WebGL and DOM click triggers.
* **Dual-Layer Layout:** Functional implementation isolating the DOM *overlay* (`z-index: 10`, `pointer-events: none/auto`) from the underlying WebGL Canvas (`z-index: 1`).

### Data Layer (`src/data`)
* **Logical Isolation:** Static data (profile, education, links) extracted into strictly typed constants (`aboutData.ts` and `config.ts`). Prevents polluting JSX components with static JSON data and ensures scalability when adding new nodes without forcing structural UI recompilation.

### WebGL Layer (`src/components/canvas`)
* **Global Scene Setup:** R3F Canvas configured with `ACESFilmicToneMapping` and `SRGBColorSpace` for accurate PBR rendering, and dynamic *pixel ratio* (`dpr={[1, 2]}`) to support *high-DPI* screens without dropping *frames*.
* **Space Environment (`Space.tsx`):** Volumetric background system using the default Drei `<Stars />` component (7,000 particles).
* **Planet System (`Planet.tsx`):** Modular and dynamic 3D object handler.
  * Full integration of *Pointer* events: custom cursors and click events via *raycast* that emit the exact `worldPosition` of the target.

### DOM Layer (`src/components/dom`)
* **Navigation Overlay (`Navbar.tsx`):** Converted into a pure component (*dumb component*), event-driven via *props*, with a *flexbox layout* and advanced GPU-accelerated *Glassmorphism* styling.
* **About Panel (`About.tsx`):** High-performance interface conditionally managed by the `App.tsx` root state.
  * Optimized vector rendering through *inline* SVGs (eliminating the latency of additional HTTP *requests*).
  * Education *timeline* structuring via CSS pseudo-elements (`::before`), avoiding empty node formatting in the DOM tree (*DOM pollution*).
  * Typography processing in iterable *arrays* to mitigate *layout thrashing* and enforce semantic structural spacing.

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
```
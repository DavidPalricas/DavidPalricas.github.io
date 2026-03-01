# Interactive 3D Portfolio: Game & VR Developer

## System Architecture
This repository contains the source code for an interactive 3D portfolio, engineered with a strict dual-layer hybrid architecture (WebGL + DOM). The 3D renderer acts solely as an interactive technical showcase, while the User Interface resides entirely in the DOM to guarantee accessibility, SEO, and frictionless readability. Spatial navigation utilizes raycasting with Bézier curve interpolation and quaternion alignment for fluid, deterministic camera transitions.

## Tech Stack & Extreme Optimization

* **Core Framework:** React 19 + TypeScript. Strict typing is non-negotiable to ensure the stability of transformation matrices, UI states, and 3D vector math within the render loop. Bundled with **Vite** for optimized HMR and builds.
* **Rendering Engine:** Three.js via React Three Fiber (R3F). R3F acts as a reconciler, declaratively managing the allocation and destruction of geometry and materials in VRAM in sync with the React component lifecycle, effectively preventing memory leaks.
* **Animation & Easing:** GSAP (GreenSock). Manages temporal camera interpolation and trajectories independently of frame rate, replacing raw `requestAnimationFrame` math with standardized, non-linear easing functions.
* **3D Asset Pipeline:** Models are exported in `.glb` format, optimized with spatial compression (Draco/Meshopt). Textures utilize GPU-targeted KTX2 (Basis Universal) compression, drastically reducing network payload and parse times.
* **Infrastructure & Backend:** Vercel. Static frontend hosting coupled with Serverless Functions (`/api` directory). The contact form integrates the **Resend** transactional API in an isolated environment, bypassing dedicated servers and unnecessary latency.

## Data Structure & Current Implementation

### Foundation
* **Project Setup:** The base development environment is established using Vite, explicitly configured for React 19 and strict TypeScript checking.
* **Dual-Layer Layout:** Working implementation in `App.tsx` separating the DOM overlay (`z-index: 10`) from the WebGL Canvas underneath (`z-index: 1`).

### WebGL Layer (`src/components/canvas`)
* **Global Scene Setup:** The R3F Canvas is configured with `ACESFilmicToneMapping` and `SRGBColorSpace` for accurate PBR rendering, dynamic pixel ratio (`dpr={[1, 2]}`) to support high-DPI screens without frame drops, and basic `OrbitControls`.
* **Space Environment (`Space.tsx`):** Volumetric background system utilizing Drei's `<Stars />` component (7,000 particles). Includes a base lighting rig with `ambientLight` and `directionalLight` (with shadows enabled).
* **Planet System (`Planet.tsx`):** Modular and dynamic 3D object handler.
  * Dynamically fetches `.glb` models.
  * Preloads a `default.glb` mesh.
  * Full Pointer event integration: custom cursor states (`onPointerOver`, `onPointerOut`) and raycast-based click events that bubble up the exact `worldPosition`.

### DOM Layer (`src/components/dom`)
* **Navigation Overlay (`Navbar.tsx` & `Navbar.css`):** Built with an extensible array for routing ('About', 'Experience', 'Projects', 'Contact') and CSS flexbox layout.

## Next Steps / Roadmap

* **Camera Transitions:** Integrate GSAP to catch the `worldPosition` emitted by clicking a `<Planet />` and interpolate the Three.js camera smoothly.
* **Content Integration:** Bind the Navbar DOM elements to specific states/routes.
* **Asset Loading:** Introduce loading screens (Suspense fallbacks).

## Local Execution & Deployment

To run the application in a development environment, the environment variables responsible for the email gateway must be configured.

```bash
# 1. Install project dependencies
npm install

# 2. Configure the environment (create a .env.local file in the root directory)
# Insert: RESEND_API_KEY=your_production_key_here

# 3. Start the local server with Hot Module Replacement
npm run dev
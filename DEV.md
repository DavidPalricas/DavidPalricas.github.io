# Interactive 3D Portfolio: Game & VR Developer

## System Architecture
This repository contains the source code for an interactive 3D portfolio, engineered with a strict dual-layer hybrid architecture (WebGL + DOM). The 3D renderer acts solely as an interactive technical showcase, while the User Interface resides entirely in the DOM to guarantee accessibility, SEO, and frictionless readability. Spatial navigation utilizes raycasting with Bézier curve interpolation and quaternion alignment for fluid, deterministic camera transitions.

## Tech Stack & Extreme Optimization

* **Core Framework:** React 18 + TypeScript. Strict typing is non-negotiable to ensure the stability of transformation matrices and 3D vector math within the render loop.
* **Rendering Engine:** Three.js via React Three Fiber (R3F). R3F acts as a reconciler, declaratively managing the allocation and destruction of geometry and materials in VRAM in sync with the React component lifecycle, effectively preventing memory leaks.
* **Animation & Easing:** GSAP (GreenSock). Manages temporal camera interpolation and trajectories independently of frame rate, replacing raw `requestAnimationFrame` math with standardized, non-linear easing functions.
* **3D Asset Pipeline:** Models are exported in `.glb` format, optimized with spatial compression (Draco/Meshopt). Textures utilize GPU-targeted KTX2 (Basis Universal) compression, drastically reducing network payload and parse times.
* **Infrastructure & Backend:** Vercel. Static frontend hosting coupled with Serverless Functions (`/api` directory). The contact form integrates the **Resend** transactional API in an isolated environment, bypassing dedicated servers and unnecessary latency.

## Data Structure & Components

Application content is fully decoupled from the rendering logic, dynamically injected and segmented into the following sections:

* **About:** Direct exposure of the technology stack and software engineering proficiencies (C++, C#, Unity, Unreal, WebGL, 3D Math).
* **Experience:** Professional history focused strictly on systems architecture and production metrics impact.
* **Projects:**
    * *Core Development:* Repositories for long-term architectural projects and custom tools (Custom Engines, Advanced VR mechanics).
    * *Rapid Prototyping:* Strict triage of Game Jam executions, documenting exclusively engineering solutions under extreme time pressure and code efficiency.
* **Publications:** Technical papers and articles published in the field of Computer Graphics and Virtual Reality.
* **Contact:** Communication interface wired directly to a Vercel Serverless route.

## Local Execution & Deployment

To run the application in a development environment, the environment variables responsible for the email gateway must be configured.

```bash
# 1. Install project dependencies
npm install

# 2. Configure the environment (create a .env.local file in the root directory)
# Insert: RESEND_API_KEY=your_production_key_here

# 3. Start the local server with Hot Module Replacement
npm run dev
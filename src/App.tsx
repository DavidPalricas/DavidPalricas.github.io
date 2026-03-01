import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './components/game/Planet';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* DOM Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <nav style={{ pointerEvents: 'auto', padding: '2rem', color: 'white', display: 'flex', gap: '2rem' }}>
          <span>About</span>
          <span>Experience</span>
          <span>Projects</span>
          <span>Contact</span>
        </nav>
      </div>

      {/* WebGL Canvas */}
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        camera={{ position: [0, 2, 10], fov: 45, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050505']} />
        
        {/* Iluminação de Estúdio para Teste */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />

        {/* Utilitário Drei para rotação de câmara via rato. 
            Será removido mais tarde quando implementarmos a animação de curvas de Bézier. */}
        <OrbitControls makeDefault />

        {/* Fronteira de Assincronicidade. 
            O fallback={null} significa que nada é renderizado enquanto o .glb descarrega. */}
        <Suspense fallback={null}>
          <Planet 
            modelPath="/models/planets/default.glb" 
            position={[0, 0, 0]} 
            onClick={(targetPosition) => console.log('Coordenadas de transição:', targetPosition)} 
          />
        </Suspense>

      </Canvas>
    </div>
  );
};

export default App;
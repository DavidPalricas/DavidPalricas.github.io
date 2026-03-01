import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './components/canvas/Planet';
import { Navbar } from './components/dom/NavBar';
import Space from './components/canvas/Space'; // Ajusta o caminho de importação conforme a tua estrutura

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <Navbar />
      </div>

      {/* CAMADA WEBGL */}
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
        <color attach="background" args={['#000000']} />
        
        {/* Componente Modular Injetado */}
        <Space />

        <OrbitControls makeDefault />

        <Suspense fallback={null}>
          <Planet 
            name="test" 
            position={[0, 0, 0]} 
            onClick={(targetPosition) => console.log('Alvo:', targetPosition)} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
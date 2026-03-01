import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './components/canvas/Planet';
import { Navbar } from './components/dom/Navbar';
import { About } from './components/dom/NavBarElements/About/About';
import Space from './components/canvas/Space';
import { SECTIONS } from './config';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavigation = useCallback((sectionId: string | null, _worldPosition?: THREE.Vector3) => {
    // Lógica de Toggle: Se clicar na secção que já está aberta, fecha (null).
    setActiveSection(prev => {
      const isClosing = prev === sectionId || sectionId === null;
      if (isClosing) {
        console.log('[Sistema] A fechar interface DOM e a repor câmara.');
        // Aqui o GSAP fará o reset da câmara para a posição inicial
        return null;
      }
      return sectionId;
    });
    
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* CAMADA DOM */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <Navbar activeSection={activeSection} onNavigate={handleNavigation} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
      <Navbar activeSection={activeSection} onNavigate={handleNavigation} />
          
          {/* Renderização condicional imediata */}
          {activeSection === 'about' && <About onClose={() => handleNavigation(null)} />}
</div>
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
        <Space />
        <OrbitControls makeDefault />

        <Suspense fallback={null}>
          {SECTIONS.map((section) => (
            <Planet 
              key={section.id}
              name={section.modelName} 
              position={section.position} 
              onClick={(pos) => handleNavigation(section.id, pos)} 
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
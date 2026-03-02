// src/App.tsx
import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Planet } from './components/canvas/Planet';
import Space from './components/canvas/Space';
import { Navbar } from './components/dom/Navbar';
import { About } from './components/dom/NavBarElements/About/About';
import { Experience } from './components/dom/NavBarElements/Experience/Experience';
import { Projects } from './components/dom/NavBarElements/Projects/Projects';
import { GameJams } from './components/dom/NavBarElements/GameJams/GameJams';
import { Publications } from './components/dom/NavBarElements/Publications/Publication';
import { Contact } from './components/dom/NavBarElements/Contact/Contact';
import { SECTIONS } from './config';
import './components/dom/NavBarElements/NavBarElement.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  // Estado rigoroso para monitorização do foco do sistema operativo
  const [isWindowFocused, setIsWindowFocused] = useState<boolean>(true);

  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => {
      setIsWindowFocused(false);
      setHoveredSection(null); // Limpa resíduos de hover no DOM forçadamente
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleNavigation = useCallback((sectionId: string | null, worldPosition?: THREE.Vector3) => {
    setActiveSection(prev => {
      const isClosing = prev === sectionId || sectionId === null;
      
      if (isClosing) {
        console.log('[Sistema] Interface fechada. Executar rotina GSAP para reposição da câmara na origem.');
        // TODO: Inserir GSAP tween para reset da câmara -> gsap.to(camera.position, { x: 0, y: 2, z: 10, duration: 1.5, ease: 'power3.inOut' })
        return null;
      }

      if (worldPosition) {
        console.log(`[Sistema] Navegação para ${sectionId}. Executar GSAP para alvo vetorial:`, worldPosition);
        // TODO: Inserir GSAP tween interpolando a câmara baseada no vetor de worldPosition do Planeta alvo
      }

      return sectionId;
    });
  }, []);

  // Máquina de estados boleana para oclusão de Raycast no WebGL
  const interactionEnabled = activeSection === null && isWindowFocused;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* CAMADA DOM - Topologia Achatada */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <Navbar 
          activeSection={activeSection} 
          hoveredSection={hoveredSection} 
          onNavigate={handleNavigation} 
        />
        
        {/* Renderização Persistente (GPU Warm-up). Os componentes nunca são destruídos, apenas ocultados via hardware acceleration. */}
        <div className={`panel-wrapper ${activeSection === 'about' ? 'visible' : 'hidden'}`}>
          <About onClose={() => handleNavigation(null)} />
        </div>
        <div className={`panel-wrapper ${activeSection === 'experience' ? 'visible' : 'hidden'}`}>
          <Experience onClose={() => handleNavigation(null)} />
        </div>
        <div className={`panel-wrapper ${activeSection === 'projects' ? 'visible' : 'hidden'}`}>
          <Projects onClose={() => handleNavigation(null)} />
        </div>
        <div className={`panel-wrapper ${activeSection === 'game-jams' ? 'visible' : 'hidden'}`}>
          <GameJams onClose={() => handleNavigation(null)} />
        </div>
        <div className={`panel-wrapper ${activeSection === 'publications' ? 'visible' : 'hidden'}`}>
          <Publications onClose={() => handleNavigation(null)} />
        </div>
        <div className={`panel-wrapper ${activeSection === 'contact' ? 'visible' : 'hidden'}`}>
          <Contact onClose={() => handleNavigation(null)} />
        </div>
        
        {/* Assinatura / Copyright / Créditos */}
        <footer style={{ 
          position: 'absolute', 
          bottom: '2rem', 
          left: '2.5rem',
          right: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem', 
          color: 'rgba(255, 255, 255, 0.5)', 
          fontFamily: "'Inter', system-ui, sans-serif",
          pointerEvents: 'auto',
          letterSpacing: '0.5px'
        }}>
          <span>Special thanks to <a href="https://poly.pizza/u/Quaternius" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sw-yellow)', textDecoration: 'none' }}>Quaternius</a> for his models & animations found on Poly Pizza.</span>
          <span>&copy; {new Date().getFullYear()} <span style={{ color: 'var(--sw-yellow)', fontWeight: 600 }}>David Palricas</span>.</span>
        </footer>
      </div>

      {/* CAMADA WEBGL - Hardware Acceleration isolada */}
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
        camera={{ position: [0, 2, 20], fov: 45, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        <Space interactionEnabled={interactionEnabled} />
        
        <OrbitControls 
          makeDefault 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
          autoRotate={activeSection === null} 
          autoRotateSpeed={0.2} 
        />

        <Suspense fallback={null}>
          {SECTIONS.map((section) => (
            <Planet 
              key={section.id}
              id={section.id}
              name={section.modelName} 
              position={section.position} 
              onClick={(pos) => handleNavigation(section.id, pos)} 
              onHoverStateChange={setHoveredSection}
              interactionEnabled={interactionEnabled}
            />
          ))}
        </Suspense>
      </Canvas>
      
    </div>
  );
};

export default App;
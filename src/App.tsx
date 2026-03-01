import React, { Suspense, useState, useCallback } from 'react';
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

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* CAMADA DOM - Topologia Achatada */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <Navbar activeSection={activeSection} onNavigate={handleNavigation} />
        
        {/* Renderização Condicional de Modais */}
        {activeSection === 'about' && <About onClose={() => handleNavigation(null)} />}
        {activeSection === 'experience' && <Experience onClose={() => handleNavigation(null)} />}
        {activeSection === 'projects' && <Projects onClose={() => handleNavigation(null)} />}
        {activeSection === 'game-jams' && <GameJams onClose={() => handleNavigation(null)} />}
        {activeSection === 'publications' && <Publications onClose={() => handleNavigation(null)} />}
        {activeSection === 'contact' && <Contact onClose={() => handleNavigation(null)} />}
        
        {/* Assinatura / Copyright */}
        <footer style={{ 
          position: 'absolute', 
          bottom: '2rem', 
          right: '2.5rem', 
          fontSize: '0.85rem', 
          color: 'rgba(255, 255, 255, 0.5)', 
          fontFamily: "'Inter', system-ui, sans-serif",
          pointerEvents: 'auto',
          letterSpacing: '0.5px'
        }}>
          &copy; {new Date().getFullYear()} <span style={{ color: 'var(--sw-yellow)', fontWeight: 600 }}>David Palricas</span>.
        </footer>
      </div>

      {/* CAMADA WEBGL - Hardware Acceleration isolada */}
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
        
        {/* Restrição total de Zoom e Pan para manter a integridade vetorial da câmara para o GSAP */}
        <OrbitControls makeDefault enableZoom={false} enablePan={false} />

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
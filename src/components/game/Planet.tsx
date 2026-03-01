import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

// Definição estrita do contrato de dados do componente.
interface PlanetProps {
  modelPath: string; // Caminho estático servido pela pasta public (ex: '/models/planets/contact.glb')
  position: [number, number, number]; // Coordenadas espaciais fixas locais
  onClick: (targetPosition: THREE.Vector3) => void; // Callback para injetar o vetor alvo no controlador da câmara
}

export const Planet: React.FC<PlanetProps> = ({ modelPath, position, onClick }) => {
  // O hook useGLTF faz parse ao binário, descodifica compressão Draco automaticamente 
  // (se configurado no root) e coloca o resultado em cache.
  const { scene } = useGLTF(modelPath);
  const planetRef = useRef<THREE.Group>(null);

  // O Raycaster do R3F emite eventos sintéticos.
  // Parar a propagação (stopPropagation) é crítico. Se tiveres um planeta atrás de outro 
  // e clicares no da frente, o evento não pode atravessar a geometria e disparar no de trás.
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (planetRef.current) {
      // Nunca passes a prop 'position' crua. Em arquiteturas hierárquicas, a posição local
      // difere da global. Extrai o vetor global absoluto para garantir que a curva de Bézier
      // da câmara calcula a trajetória correta, independentemente do parentesco do planeta.
      const worldPosition = new THREE.Vector3();
      planetRef.current.getWorldPosition(worldPosition);
      onClick(worldPosition);
    }
  };

  return (
    <group
      ref={planetRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Injeção imperativa da árvore do modelo no Scene Graph declarativo.
          Nota técnica: se precisares de alterar a cor de um material dinamicamente 
          neste planeta sem afetar outros que usem o mesmo ficheiro, tens de fazer clone 
          profundo da cena usando SkeletonUtils.clone(scene) em vez de usar a scene diretamente. */}
      <primitive object={scene} />
    </group>
  );
};

// A diretiva preload garante que o browser inicia o fetch HTTP e o parse binário do modelo
// na background thread antes sequer de o componente ser montado, eliminando o "pop-in" visual.
// Na tua arquitetura final, deves mapear os teus ficheiros estáticos e fazer preload de todos eles na inicialização.
useGLTF.preload('/models/planets/default.glb');
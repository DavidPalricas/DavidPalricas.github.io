import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  name?: string; 
  position: [number, number, number];
  onClick: (targetPosition: THREE.Vector3) => void;
}

// O basePath existe no scope do módulo.
// É uma "variável estática" natural do JavaScript, carregada uma única vez na RAM.
const BASE_PATH = '/models/planets/';

export const Planet: React.FC<PlanetProps> = ({ name = 'default', position, onClick }) => {
  // Construção dinâmica do caminho
  const modelPath = `${BASE_PATH}${name}.glb`;
  
  // O hook useGLTF opera perfeitamente dentro do componente funcional
  const { scene } = useGLTF(modelPath);
  const planetRef = useRef<THREE.Group>(null);

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
      <primitive object={scene} />
    </group>
  );
};

// Preload do modelo por defeito para evitar bloqueios na main thread
useGLTF.preload(`${BASE_PATH}default.glb`);
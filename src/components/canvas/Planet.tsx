import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetProps {
  id: string; // Identificador obrigatório para ligar à secção do DOM
  name?: string; 
  position: [number, number, number];
  onClick: (targetPosition: THREE.Vector3) => void;
  onHoverStateChange: (id: string | null) => void; // Emissor para a Navbar
}

const BASE_PATH = '/models/planets/';

export const Planet: React.FC<PlanetProps> = ({ id, name = 'default', position, onClick, onHoverStateChange }) => {
  const modelPath = `${BASE_PATH}${name}.glb`;
  const { scene } = useGLTF(modelPath);
  const planetRef = useRef<THREE.Group>(null);
  
  // Estado local retido apenas para o gatilho lógico, não dita a animação final
  const [isHovered, setIsHovered] = useState(false);

  // Interpolação matemática direta no Render Loop (Frame a Frame)
  useFrame((_, delta) => {
    if (!planetRef.current) return;
    
    // Escala alvo: 1.2 quando em hover, 1.0 no estado natural
    const targetScale = isHovered ? 1.2 : 1.0;
    
    // LERP (Linear Interpolation) com fator de tempo (delta * 10) garante fluidez independente dos FPS
    planetRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale), 
      delta * 10
    );
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setIsHovered(true);
    onHoverStateChange(id); // Propaga para o DOM
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    setIsHovered(false);
    onHoverStateChange(null); // Limpa o estado no DOM
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
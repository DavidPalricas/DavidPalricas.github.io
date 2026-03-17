import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Props for a clickable planet in the 3D navigation ring.
 */
interface PlanetProps {
  id: string; 
  name?: string; 
  position: [number, number, number];
  onClick: (targetPosition: THREE.Vector3) => void;
  onHoverStateChange: (id: string | null) => void;
  interactionEnabled: boolean; // Strict interaction control prop.
}

const BASE_PATH = '/models/planets/';

/**
 * Renders an interactive planet mesh used as a navigation target.
 */
export const Planet: React.FC<PlanetProps> = ({ id, name = 'default', position, onClick, onHoverStateChange, interactionEnabled }) => {
  const modelPath = `${BASE_PATH}${name}.glb`;
  const { scene } = useGLTF(modelPath);
  const planetRef = useRef<THREE.Group>(null);
  
  const [isHovered, setIsHovered] = useState(false);

  // Forces cursor/state reset if interaction is disabled while pointer is over the mesh.
  useEffect(() => {
    if (!interactionEnabled && isHovered) {
      setIsHovered(false);
      document.body.style.cursor = 'auto';
    }
  }, [interactionEnabled, isHovered]);

  useFrame((_, delta) => {
    if (!planetRef.current) return;
    
    // If interaction is disabled, target scale is forced to absolute 1.0.
    const targetScale = (isHovered && interactionEnabled) ? 1.2 : 1.0;
    
    planetRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale), 
      delta * 10
    );
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactionEnabled) return;
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setIsHovered(true);
    onHoverStateChange(id); 
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    if (!interactionEnabled) return;
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    setIsHovered(false);
    onHoverStateChange(null); 
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactionEnabled) return;
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
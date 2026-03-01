// src/components/canvas/ContactCharacter.tsx
import React, {useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { CharacterAction } from '../../types/contact';

interface ContactCharacterProps {
  currentState: CharacterAction;
}

export const ContactCharacter: React.FC<ContactCharacterProps> = React.memo(({ currentState }) => {
  // Assume que o ficheiro .glb tem as animações nomeadas exatamente como no Enum
  const { scene, animations } = useGLTF('/models/contact_character.glb') as any;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const currentAction = actions[currentState];

 
    if (!currentAction) {
      console.error(`Animação '${currentState}' ausente no modelo GLTF.`);
      return;
    }

    // Interpolação suave (blending) de 0.2 segundos entre estados
    currentAction.reset().fadeIn(0.2).play();

    return () => {
      currentAction.fadeOut(0.2);
    };
  }, [currentState, actions]);

 return (
    <primitive 
      object={scene} 
      // Ajusta o Y negativo para centrar o centro de massa do modelo na vista
      position={[0, -1.5, 0]} 
      // Rotação Y a 0 (ou Math.PI, dependendo da orientação de exportação do teu modelo)
      rotation={[0, 0, 0]} 
      // Reduz drasticamente a escala para caber no Frustum da câmara
      scale={0.8} 
    />
  );
});
// src/components/canvas/ContactCharacter.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
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

    // Reset obrigatório para garantir que a animação recomeça do zero ao transitar
    currentAction.reset();

    // Lógica de controlo de máquina de estados de animação
    if (currentState === CharacterAction.ERROR) {
      // Bloqueia o loop para animações terminais (Death/Error) e retém o último frame
      currentAction.setLoop(THREE.LoopOnce, 1);
      currentAction.clampWhenFinished = true;
    } else {
      // Restaura o comportamento padrão (loop infinito) para estados como IDLE e RUNNING
      currentAction.setLoop(THREE.LoopRepeat, Infinity);
      currentAction.clampWhenFinished = false;
    }

    // Interpolação suave (blending) de 0.2 segundos entre estados
    currentAction.fadeIn(0.2).play();

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

// DIRETIVA DE OTIMIZAÇÃO CRÍTICA:
// Força o browser a alocar o modelo na cache de suspense assim que o módulo JS é processado,
// eliminando o tempo de espera visual quando a aba de contacto é aberta.
useGLTF.preload('/models/contact_character.glb');
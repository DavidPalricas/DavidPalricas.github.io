// src/components/canvas/ContactCharacter.tsx
import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterAction } from '../../types/contact';

/**
 * Props for the contact character animation controller.
 */
interface ContactCharacterProps {
  currentState: CharacterAction;
}

/**
 * Renders and animates the contact character model according to UI state.
 */
export const ContactCharacter: React.FC<ContactCharacterProps> = React.memo(({ currentState }) => {
  // Assumes the .glb file animation names exactly match the enum values.
  const { scene, animations } = useGLTF('/models/contact_character.glb') as any;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const currentAction = actions[currentState];

    if (!currentAction) {
      console.error(`Animação '${currentState}' ausente no modelo GLTF.`);
      return;
    }

    // Mandatory reset to ensure animation restarts from frame zero during transitions.
    currentAction.reset();

    // Animation state-machine control logic.
    if (currentState === CharacterAction.ERROR) {
      // Disables looping for terminal animations (Death/Error) and keeps the last frame.
      currentAction.setLoop(THREE.LoopOnce, 1);
      currentAction.clampWhenFinished = true;
    } else {
      // Restores default behavior (infinite loop) for states like IDLE and RUNNING.
      currentAction.setLoop(THREE.LoopRepeat, Infinity);
      currentAction.clampWhenFinished = false;
    }

    // Smooth 0.2-second blending between animation states.
    currentAction.fadeIn(0.2).play();

    return () => {
      currentAction.fadeOut(0.2);
    };
  }, [currentState, actions]);

  return (
    <primitive 
      object={scene} 
      // Applies a negative Y offset to center the model's mass in view.
      position={[0, -1.5, 0]} 
      // Keeps Y rotation at 0 (or Math.PI depending on model export orientation).
      rotation={[0, 0, 0]} 
      // Scales down the model to fit the camera frustum.
      scale={0.8} 
    />
  );
});

// CRITICAL OPTIMIZATION DIRECTIVE:
// Forces the browser to cache the model in suspense as soon as the JS module is processed,
// removing visual loading delay when the contact tab is opened.
useGLTF.preload('/models/contact_character.glb');
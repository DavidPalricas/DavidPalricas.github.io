import { memo, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';

const SPACESHIP_MODELS = [
  '/models/spaceships/spaceship1.glb',
  '/models/spaceships/spaceship2.glb',
  '/models/spaceships/spaceship3.glb',
  '/models/spaceships/spaceship4.glb',
];

SPACESHIP_MODELS.forEach((model) => useGLTF.preload(model));

interface SpaceshipProps {
  modelPath: string;
  startPosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  speed: number;
  scale: number;
  interactionEnabled: boolean;
}

const Spaceship = memo(({ modelPath, startPosition, targetPosition, speed, scale, interactionEnabled }: SpaceshipProps) => {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Alinhamento inicial determinístico com base num vetor distante
  useMemo(() => {
    if (ref.current) {
      ref.current.position.copy(startPosition);
      ref.current.lookAt(targetPosition);
    }
  }, [startPosition, targetPosition]);

  useFrame((_, delta) => {
    if (!interactionEnabled || !ref.current) return;

    // Translação estrita sobre o eixo Z local. A câmara nativa do Three.js é -Z.
    ref.current.translateZ(-speed * delta); 

    // Limites de Bounding Box expandidos (Wrap-Around). 
    // Garante que o teletransporte ocorre fora do FOV da câmara.
    const limitX = 40;
    const limitY = 25;
    const limitZ = 30;

    const pos = ref.current.position;

    if (pos.x > limitX) pos.x = -limitX;
    else if (pos.x < -limitX) pos.x = limitX;

    if (pos.y > limitY) pos.y = -limitY;
    else if (pos.y < -limitY) pos.y = limitY;

    if (pos.z > limitZ) pos.z = -limitZ;
    else if (pos.z < -limitZ) pos.z = limitZ;
  });

  return (
    <group ref={ref} scale={[scale, scale, scale]}>
      {/* Correção forçada de exportação do Blender (180 graus no eixo Y) */}
      <Clone object={scene} castShadow rotation={[0, Math.PI, 0]} />
    </group>
  );
});

interface FleetProps {
  interactionEnabled: boolean;
}

export const Fleet = memo(({ interactionEnabled }: FleetProps) => {
  const fleetData = useMemo(() => {
    const NUM_SHIPS = 12; 
    
    return Array.from({ length: NUM_SHIPS }).map((_, i) => {
      const modelPath = SPACESHIP_MODELS[Math.floor(Math.random() * SPACESHIP_MODELS.length)];
      
      // Geração dispersa num paralelepípedo amplo que excede a câmara (Z=20)
      const startPosition = new THREE.Vector3(
        (Math.random() - 0.5) * 70, // Largura máxima (X: -35 a 35)
        (Math.random() - 0.5) * 40, // Altura máxima (Y: -20 a 20)
        (Math.random() - 0.5) * 50  // Profundidade (Z: -25 a 25)
      );

      // Geração de um vetor direcional normalizado para garantir trajetórias estáveis
      const direction = new THREE.Vector3(
        Math.random() - 0.5,
        (Math.random() - 0.5) * 0.4, // Amortecimento no eixo Y para evitar naves a viajar a pique para cima/baixo
        Math.random() - 0.5
      ).normalize();

      // Projeta o alvo num ponto infinitamente distante para a bússola do lookAt
      const targetPosition = startPosition.clone().add(direction.multiplyScalar(100));

      return { 
        id: `ship-${i}`, 
        modelPath, 
        startPosition, 
        targetPosition,
        speed: 2 + Math.random() * 3, // Velocidade aumentada para compensar a escala do novo mapa
        scale: 0.05 + Math.random() * 0.03 // Escala reduzida para enquadrar na imensidão
      };
    });
  }, []);

  return (
    <group name="spaceship-fleet">
      {fleetData.map((data) => (
        <Spaceship 
          key={data.id} 
          modelPath={data.modelPath} 
          startPosition={data.startPosition} 
          targetPosition={data.targetPosition}
          speed={data.speed}
          scale={data.scale}
          interactionEnabled={interactionEnabled} 
        />
      ))}
    </group>
  );
});
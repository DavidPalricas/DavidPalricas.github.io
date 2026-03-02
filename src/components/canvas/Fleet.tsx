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

// Câmara em [0, 2, 20], FOV 45 — planetas num raio de ~8.5 unidades
// Naves vivem no volume visível entre a câmara e o fundo do mapa
const LIMIT_X = 12;   // cobre largura do mapa + margem
const LIMIT_Y = 6;    // altura razoável acima/abaixo dos planetas
const LIMIT_Z = 14;   // profundidade: da câmara até ao fundo do mapa
const Z_OFFSET = 3;   // centro do volume deslocado para o meio da cena (z≈3)

interface SpaceshipProps {
  modelPath: string;
  startPosition: THREE.Vector3;
  startRotation: THREE.Euler;
  velocity: THREE.Vector3;
  scale: number;
  interactionEnabled: boolean;
}

const Spaceship = memo(({ modelPath, startPosition, startRotation, velocity, scale, interactionEnabled }: SpaceshipProps) => {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const initialized = useRef(false);

  useFrame((_, delta) => {
    if (!interactionEnabled || !ref.current) return;

    if (!initialized.current) {
      ref.current.position.copy(startPosition);
      ref.current.rotation.copy(startRotation);
      initialized.current = true;
    }

    ref.current.position.addScaledVector(velocity, delta);

    const pos = ref.current.position;

    if (pos.x > LIMIT_X) pos.x = -LIMIT_X;
    else if (pos.x < -LIMIT_X) pos.x = LIMIT_X;

    if (pos.y > LIMIT_Y) pos.y = -LIMIT_Y;
    else if (pos.y < -LIMIT_Y) pos.y = LIMIT_Y;

    // Wrap no Z centrado no mapa (entre z≈-11 e z≈17)
    if (pos.z > LIMIT_Z + Z_OFFSET) pos.z = -LIMIT_Z + Z_OFFSET;
    else if (pos.z < -LIMIT_Z + Z_OFFSET) pos.z = LIMIT_Z + Z_OFFSET;
  });

  return (
    <group ref={ref} scale={[scale, scale, scale]}>
      <Clone object={scene} castShadow rotation={[0, Math.PI, 0]} />
    </group>
  );
});

interface FleetProps {
  interactionEnabled: boolean;
}

export const Fleet = memo(({ interactionEnabled }: FleetProps) => {
  const fleetData = useMemo(() => {
    const NUM_SHIPS = 20;

    return Array.from({ length: NUM_SHIPS }).map((_, i) => {
      const modelPath = SPACESHIP_MODELS[Math.floor(Math.random() * SPACESHIP_MODELS.length)];

      // Spawn distribuído dentro do volume visível
      const startPosition = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(LIMIT_X * 2),
        THREE.MathUtils.randFloatSpread(LIMIT_Y * 2),
        THREE.MathUtils.randFloatSpread(LIMIT_Z * 2) + Z_OFFSET
      );

      const speed = 2 + Math.random() * 3; // velocidade mais lenta para serem visíveis

      // Direção aleatória ligeiramente achatada no Y (mais cinematográfico)
      const dir = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(0.6),
        THREE.MathUtils.randFloatSpread(2)
      ).normalize();

      const velocity = dir.clone().multiplyScalar(speed);

      // Rotação alinhada com a direção de voo
      const dummy = new THREE.Object3D();
      dummy.lookAt(dir.clone().negate());
      const startRotation = new THREE.Euler().setFromQuaternion(dummy.quaternion);

      return {
        id: `ship-${i}`,
        modelPath,
        startPosition,
        startRotation,
        velocity,
        scale: 0.06 + Math.random() * 0.05, // ligeiramente maiores
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
          startRotation={data.startRotation}
          velocity={data.velocity}
          scale={data.scale}
          interactionEnabled={interactionEnabled}
        />
      ))}
    </group>
  );
});
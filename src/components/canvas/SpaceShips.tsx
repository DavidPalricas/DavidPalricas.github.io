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

const LIMIT_X = 12;
const LIMIT_Y = 6;
const LIMIT_Z = 14;
const Z_OFFSET = 3;

/**
 * Props for one procedural spaceship instance.
 */
interface SpaceshipProps {
  modelPath: string;
  startPosition: THREE.Vector3;
  startRotation: THREE.Euler;
  speed: number;
  scale: number;
  interactionEnabled: boolean;
}

const Spaceship = memo(({ modelPath, startPosition, startRotation, speed, scale, interactionEnabled }: SpaceshipProps) => {
  // Pivot controls flight position and orientation.
  const pivotRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const initialized = useRef(false);

  useFrame((_, delta) => {
    if (!interactionEnabled || !pivotRef.current) return;

    if (!initialized.current) {
      pivotRef.current.position.copy(startPosition);
      pivotRef.current.rotation.copy(startRotation);
      initialized.current = true;
    }

    // Move pivot in local Z axis so the ship always flies forward.
    pivotRef.current.translateZ(speed * delta);

    const pos = pivotRef.current.position;

    if (pos.x > LIMIT_X) pos.x = -LIMIT_X;
    else if (pos.x < -LIMIT_X) pos.x = LIMIT_X;

    if (pos.y > LIMIT_Y) pos.y = -LIMIT_Y;
    else if (pos.y < -LIMIT_Y) pos.y = LIMIT_Y;

    if (pos.z > LIMIT_Z + Z_OFFSET) pos.z = -LIMIT_Z + Z_OFFSET;
    else if (pos.z < -LIMIT_Z + Z_OFFSET) pos.z = LIMIT_Z + Z_OFFSET;
  });

  return (
    // Invisible pivot that defines direction and position.
    <group ref={pivotRef}>
      {/* Child model adjusts only GLB visual offset without affecting flight behavior. */}
      <group scale={[scale, scale, scale]}>
        <Clone object={scene} castShadow rotation={[0, 0, 0]} />
      </group>
    </group>
  );
});

/**
 * Props for the fleet controller component.
 */
interface SpaceShipsProps {
  interactionEnabled: boolean;
}

/**
 * Generates and renders a fleet of procedural spaceships in the background.
 */
export const SpaceShips = memo(({ interactionEnabled }: SpaceShipsProps) => {
  const fleetData = useMemo(() => {
    const NUM_SHIPS = 20;

    return Array.from({ length: NUM_SHIPS }).map((_, i) => {
      const modelPath = SPACESHIP_MODELS[Math.floor(Math.random() * SPACESHIP_MODELS.length)];

      const startPosition = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(LIMIT_X * 2),
        THREE.MathUtils.randFloatSpread(LIMIT_Y * 2),
        THREE.MathUtils.randFloatSpread(LIMIT_Z * 2) + Z_OFFSET
      );

      // Pivot rotation defines flight direction; the model follows automatically.
      const startRotation = new THREE.Euler(
        THREE.MathUtils.randFloatSpread(Math.PI),
        THREE.MathUtils.randFloat(0, Math.PI * 2),
        THREE.MathUtils.randFloatSpread(Math.PI / 2)
      );

      return {
        id: `ship-${i}`,
        modelPath,
        startPosition,
        startRotation,
        speed: 2 + Math.random() * 3,
        scale: 0.06 + Math.random() * 0.05,
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
          speed={data.speed}
          scale={data.scale}
          interactionEnabled={interactionEnabled}
        />
      ))}
    </group>
  );
});
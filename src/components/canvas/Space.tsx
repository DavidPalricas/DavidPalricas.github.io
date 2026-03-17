import { memo } from 'react';
import { Stars } from '@react-three/drei';
import { SpaceShips } from './SpaceShips';

/**
 * Props for the scene environment wrapper.
 */
interface SpaceProps {
  interactionEnabled: boolean;
}

/**
 * Renders the shared 3D environment (lights, stars, and ships).
 */
const Space = ({ interactionEnabled }: SpaceProps) => {
  return (
    <group name="environment-rig">
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <Stars radius={80} depth={50} count={7000} factor={4} saturation={0} fade speed={1.5} />
      
      {/* State propagation for vectorized interaction suspension. */}
      <SpaceShips interactionEnabled={interactionEnabled} />
    </group>
  );
};

export default memo(Space);
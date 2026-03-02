import { memo } from 'react';
import { Stars } from '@react-three/drei';
import { SpaceShips } from './SpaceShips';

// Tipagem estrita
interface SpaceProps {
  interactionEnabled: boolean;
}

const Space = ({ interactionEnabled }: SpaceProps) => {
  return (
    <group name="environment-rig">
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <Stars radius={80} depth={50} count={7000} factor={4} saturation={0} fade speed={1.5} />
      
      {/* Propagação de estado para suspensão vetorial */}
      <SpaceShips interactionEnabled={interactionEnabled} />
    </group>
  );
};

export default memo(Space);
import { memo } from 'react';
import { Stars } from '@react-three/drei';

const Space = () => {
  return (
    <group name="environment-rig">
      {/* Luz ambiente para garantir que as faces não iluminadas do planeta não ficam pretas puras */}
      <ambientLight intensity={1.5} />

      {/* Luz direcional simulando uma estrela próxima/sol para criar sombras e relevo (Normal Maps) */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2} 
        castShadow // Otimização: Só ativa se o teu planeta aceitar sombras
      />

      {/* Sistema de partículas espacial */}
      <Stars 
        radius={80}
        depth={50}
        count={7000}
        factor={4}
        saturation={0}
        fade
        speed={1.5}
      />
    </group>
  );
};

export default memo(Space);
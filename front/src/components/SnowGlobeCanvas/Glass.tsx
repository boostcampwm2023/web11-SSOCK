import React from 'react';
import * as THREE from 'three';

interface GlassProps {
  position: THREE.Vector3;
  radius: number;
  color: THREE.Color;
  opacity: number;
}

const Glass: React.FC<GlassProps> = ({ position, radius, color, opacity }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 36, 32]} />
      <meshStandardMaterial
        transparent={true}
        color={color}
        opacity={opacity}
        roughness={0}
        metalness={0.5}
      />
    </mesh>
  );
};

export default Glass;

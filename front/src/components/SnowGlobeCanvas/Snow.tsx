import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';

interface SnowProps {
  radius: number;
  centerPosition: THREE.Vector3;
  rangeRadius: number;
}

const Snow: React.FC<SnowProps> = ({ radius, centerPosition, rangeRadius }) => {
  const snowRef = useRef<THREE.Mesh>(null);
  const speed = 0.05;
  const position = new THREE.Vector3(
    centerPosition.x - rangeRadius + Math.random() * rangeRadius * 2,
    centerPosition.y + rangeRadius + Math.random() * 2 * rangeRadius,
    centerPosition.z - rangeRadius + Math.random() * rangeRadius * 2
  );
  useFrame(() => {
    const snow = snowRef.current;
    if (snow) {
      if (snow.position.y <= 0) {
        snow.position.y = centerPosition.y + rangeRadius;
      }
      snow.position.y -= speed;

      if (
        (snow.position.x - centerPosition.x) ** 2 +
          (snow.position.y - centerPosition.y) ** 2 +
          (snow.position.z - centerPosition.z) ** 2 >
        (rangeRadius - 0.5) ** 2
      ) {
        snow.visible = false;
      } else {
        snow.visible = true;
      }
    }
  });

  return (
    <mesh position={position} ref={snowRef}>
      <sphereGeometry args={[radius, 32, 16]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Snow;

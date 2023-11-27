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
  const position = new THREE.Vector3(
    centerPosition.x - rangeRadius + Math.random() * rangeRadius * 2,
    centerPosition.y + rangeRadius + Math.random() * 2 * rangeRadius,
    centerPosition.z - rangeRadius + Math.random() * rangeRadius * 2
  );
  useFrame((_, delta) => {
    const snow = snowRef.current;
    const speed = 1 * delta;
    if (snow) {
      if (snow.position.y <= 0) {
        snow.position.y =
          centerPosition.y + rangeRadius + Math.random() * rangeRadius * 2;
      }
      snow.position.y -= speed;

      if (snow.position.distanceTo(centerPosition) > rangeRadius - 0.5) {
        snow.visible = false;
      } else {
        snow.visible = true;
      }
    }
  });

  return (
    <mesh position={position} ref={snowRef}>
      <sphereGeometry args={[radius, 8, 6]} />

      <meshStandardMaterial />
    </mesh>
  );
};

export default Snow;

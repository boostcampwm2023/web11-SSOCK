import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import * as THREE from 'three';

interface SnowProps {
  radius: number;
  centerPosition: THREE.Vector3;
  rangeRadius: number;
  model: number;
}

const Snow: React.FC<SnowProps> = ({
  centerPosition,
  rangeRadius,
  model
}) => {
  const snowRef = useRef<THREE.Mesh>(null);
  const position = new THREE.Vector3(
    centerPosition.x - rangeRadius + Math.random() * rangeRadius * 2,
    centerPosition.y + rangeRadius + Math.random() * 2 * rangeRadius,
    centerPosition.z - rangeRadius + Math.random() * rangeRadius * 2
  );

  const snow = useGLTF(`/models/snowFlake0${model + 1}.glb`).scene.clone();

  snow.position.set(position.x, position.y, position.z);
  snow.scale.set(0.5, 0.5, 0.5);
  snow.rotation.y = Math.random();
  useFrame((_, delta) => {
    const snow = snowRef.current;
    const speed = 1 * delta;
    if (snow) {
      if (snow.position.y <= 0) {
        snow.position.y =
          centerPosition.y + rangeRadius + Math.random() * rangeRadius * 2;
      }
      snow.position.y -= speed;
      snow.rotation.y += speed;

      if (snow.position.distanceTo(centerPosition) > rangeRadius - 0.5) {
        snow.visible = false;
      } else {
        snow.visible = true;
      }
    }
  });

  return <primitive object={snow} ref={snowRef} />;
};

export default Snow;

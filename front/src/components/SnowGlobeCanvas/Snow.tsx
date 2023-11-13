import { useRef } from 'react';
import { Vector3, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface SnowProps {
  position: Vector3;
  radius: number;
}

const Snow = (props: SnowProps) => {
  const snowRef = useRef<Mesh>(null);
  const speed = 0.05;

  useFrame(() => {
    if (snowRef.current) {
      if (snowRef.current.position.y <= 0) {
        snowRef.current.position.y = 22;
      }
      snowRef.current.position.y -= speed;

      if (
        snowRef.current.position.x ** 2 +
          (snowRef.current.position.y - 8) ** 2 +
          snowRef.current.position.z ** 2 >
        13 ** 2
      ) {
        snowRef.current.visible = false;
      } else {
        snowRef.current.visible = true;
      }
    }
  });

  return (
    <mesh position={props.position} ref={snowRef}>
      <sphereGeometry args={[props.radius, 32, 16]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Snow;

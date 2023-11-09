import { Vector3 } from '@react-three/fiber';

interface SnowProps {
  position: Vector3;
  radius: number;
}

const Snow = (props: SnowProps) => {
  return (
    <mesh position={props.position}>
      <sphereGeometry args={[props.radius, 32, 16]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Snow;

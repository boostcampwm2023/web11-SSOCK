import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { DECO } from '../../constants/deco';

interface DecoProps {
  id: number;
  scale: number;
  position: THREE.Vector3;
  message: string;
  color: string;
}

const Deco = ({ scale, position, message, id, color }: DecoProps) => {
  const deco = useGLTF(DECO[id].fileName).scene.clone();
  const target = { x: 8, z: 0 };
  const test = Math.atan2(position.z - target.z, position.x - target.x);

  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  deco.traverse(mesh => {
    mesh.userData.message = message;
  });
  // deco.userData.message = message;
  deco.rotateY(Math.PI - test);
  // console.log(deco);
  return <primitive object={deco} />;
};

export default Deco;

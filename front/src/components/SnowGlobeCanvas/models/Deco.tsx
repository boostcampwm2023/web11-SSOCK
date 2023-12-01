import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { DECO, MSG_COLOR } from '../../../constants/deco';

interface DecoProps {
  id: number;
  scale: number;
  position: THREE.Vector3;
  message: string;
  color: string;
  sender: string;
  letterID: number;
}

const Deco = ({
  scale,
  position,
  message,
  id,
  color,
  sender,
  letterID
}: DecoProps) => {
  const deco = useGLTF(DECO[id].fileName).scene.clone();
  const target = { x: 8, z: 0 };
  const test = Math.atan2(position.z - target.z, position.x - target.x);

  deco.name = DECO[id].name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  deco.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      child.userData.message = message;
      child.userData.sender = sender;
      child.userData.color = color;
      child.userData.letterColor = MSG_COLOR[letterID].color;

      child.castShadow = true;
      if (child.name === 'Sub') {
        return;
      }
      if (child.name === 'Main') {
        const newMaterial = child.material.clone();
        newMaterial.color = new THREE.Color(color);
        child.material = newMaterial;
      }
    }
  });
  deco.rotateY(Math.PI - test);
  return <primitive object={deco} />;
};

export default Deco;

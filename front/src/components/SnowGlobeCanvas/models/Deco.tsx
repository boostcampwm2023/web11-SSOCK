import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import * as MeshUtils from '@utils/meshUtils';
import { DECO, MSG_COLOR } from '@constants';

interface DecoProps {
  id: number;
  scale: number;
  position: THREE.Vector3;
  message: string;
  color: string;
  sender: string;
  letterID: number;
  isOpened: boolean;
  messageID: number;
}

const DecoSet = (deco: THREE.Group<THREE.Object3DEventMap>) => {
  const newModel = useGLTF('/models/new.glb').scene.clone().children[0];
  newModel.position.set(0, 1.2, 0);
  newModel.scale.set(0.1, 0.1, 0.1);
  deco.add(newModel);
};

const Deco = ({
  scale,
  position,
  message,
  id,
  color,
  sender,
  letterID,
  isOpened,
  messageID
}: DecoProps) => {
  const deco = useGLTF(DECO[id].fileName).scene.clone();
  const target = { x: 8, z: 0 };
  const test = Math.atan2(position.z - target.z, position.x - target.x);

  deco.name = DECO[id].name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  if (!isOpened) {
    DecoSet(deco);
  }

  deco.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      child.userData.message = message;
      child.userData.sender = sender;
      child.userData.color = color;
      child.userData.letterColor = MSG_COLOR[letterID].color;
      child.userData.messageID = messageID;
      child.castShadow = true;
      if (child.name === 'Main') {
        child.material = MeshUtils.makeColorChangedMaterial(child, color);
      }
    }
  });
  deco.rotateY(Math.PI - test);

  return <primitive object={deco} />;
};

export default Deco;

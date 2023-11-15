import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface giftBoxProps {
  scale: number;
  position: THREE.Vector3;
  message: string;
  id: number;
}

const GiftBox: React.FC<giftBoxProps> = ({ scale, position, message, id }) => {
  const color = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#FF00FF'
  ];

  const { scene } = useGLTF('/testModel/giftbox.glb');
  const modelRef = useRef<THREE.Object3D>(null);

  // change box id color
  const material = new THREE.MeshPhysicalMaterial({ color: color[id - 1] });
  scene.getObjectByName('Box')?.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.material = material;
    }
  });

  scene.scale.set(scale, scale, scale);
  scene.position.set(position.x, position.y, position.z);
  scene.userData.message = message;
  return <primitive object={scene.clone()} ref={modelRef} />;
};

export default GiftBox;

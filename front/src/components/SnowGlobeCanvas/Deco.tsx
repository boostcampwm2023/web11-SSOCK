import React, { ReactNode, useRef } from 'react';
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

const decoClickEvent = () => {
  console.log('click');
};

const Deco = ({ scale, position, message, id, color }: DecoProps) => {
  const deco = useGLTF(DECO[id].fileName).scene.clone();
  //   const modelRef = useRef<THREE.Object3D>(null);

  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  deco.userData.message = message;
  console.log(deco);
  return <primitive object={deco} onclick={decoClickEvent} />;
};

export default Deco;

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface GroundProps {
  scale: number;
  position: THREE.Vector3;
}

const Ground: React.FC<GroundProps> = ({ scale, position }) => {
  const ground = useGLTF('/models/ground.glb').scene.clone();

  ground.scale.set(scale, scale, scale);
  ground.position.set(position.x, position.y, position.z);
  ground.children.forEach(e => (e.receiveShadow = true));
  return <primitive object={ground} />;
};

export default Ground;

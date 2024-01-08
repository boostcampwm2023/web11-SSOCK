import React from 'react';
import { useGLTF } from '@react-three/drei/core/useGLTF';
import { Vector3 } from 'three';

interface GroundProps {
  scale: number;
  position: Vector3;
}

const Ground: React.FC<GroundProps> = ({ scale, position }) => {
  const ground = useGLTF('/models/ground1.glb').scene.clone();

  ground.scale.set(scale, scale, scale);
  ground.position.set(position.x, position.y, position.z);
  ground.children.forEach(e => (e.receiveShadow = true));
  return <primitive object={ground} />;
};

export default Ground;

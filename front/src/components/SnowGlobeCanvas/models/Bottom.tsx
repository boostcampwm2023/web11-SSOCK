import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BottomProps {
  scale: number;
  position: THREE.Vector3;
}

const Bottom: React.FC<BottomProps> = ({ scale, position }) => {
  const bottom = useGLTF('/models/bottom.glb').scene.clone();

  bottom.scale.set(scale, scale, scale);
  bottom.position.set(position.x, position.y, position.z);
  return <primitive object={bottom} />;
};

export default Bottom;

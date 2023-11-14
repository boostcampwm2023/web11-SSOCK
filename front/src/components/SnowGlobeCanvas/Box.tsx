import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
interface BoxProps {
  scale: number;
  position: THREE.Vector3;
  color: THREE.Color;
}

const Box: React.FC<BoxProps> = ({ scale, position, color }) => {
  const { scene } = useGLTF('./testModel/1mBox.glb');

  const cube = scene.getObjectByName('Cube') as THREE.Mesh;
  cube.material = new THREE.MeshBasicMaterial({ color });

  cube.scale.set(scale, scale, scale);
  cube.position.set(position.x, position.y, position.z);

  return <primitive object={scene.clone()} />;
};

export default Box;

import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface GroundProps {
  scale: number;
  position: THREE.Vector3;
}

const Ground: React.FC<GroundProps> = ({ scale, position }) => {
  const { scene } = useGLTF('./models/ground_snow.glb');

  const ground = scene.getObjectByName('Ground_snow') as THREE.Mesh;

  ground.scale.set(scale, scale, scale);
  ground.position.set(position.x, position.y, position.z);
  return <primitive object={scene.clone()} />;
};

export default Ground;

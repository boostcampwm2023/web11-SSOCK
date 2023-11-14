import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MyModelProps {
  url: string;
  scale: number;
  position: THREE.Vector3;
  color: THREE.Color;
}
interface BoxProps {
  scale: number;
  position: THREE.Vector3;
  color: THREE.Color;
}

const MyModel: React.FC<MyModelProps> = ({ url, scale, position, color }) => {
  const { scene } = useGLTF(url);

  const cube = scene.getObjectByName('Cube') as THREE.Mesh;
  cube.material = new THREE.MeshBasicMaterial({ color });

  cube.scale.set(scale, scale, scale);
  cube.position.set(position.x, position.y, position.z);
  //console.log(gltf.scene);
  return <primitive object={scene.clone()} />;
};

const Box: React.FC<BoxProps> = ({ scale, position, color }) => {
  return (
    <>
      <MyModel
        url={'./testModel/1mBox.glb'}
        scale={scale}
        position={position}
        color={color}
      />
    </>
  );
};

export default Box;

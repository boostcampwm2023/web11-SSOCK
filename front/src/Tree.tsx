import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Cube from './Cube';

interface MyModelProps {
  url: string;
  scale: number;
  position: THREE.Vector3;
}

const fallingModel = (
  modelRef: THREE.Object3D | null,
  speedRef: React.MutableRefObject<THREE.Vector3>,
  stopFallingRef: React.MutableRefObject<boolean>
) => {
  const airResistance = 0.01;
  const gravity = 0.1 / 60;
  if (modelRef) {
    modelRef.position.add(speedRef.current);
    speedRef.current.y -= gravity;
    speedRef.current.y *= 1 - airResistance;

    if (modelRef.position.y <= 0.1 && Math.abs(speedRef.current.y) <= 0.02) {
      stopFallingRef.current = true;
    }

    if (modelRef.position.y <= 0) {
      speedRef.current.y *= -1;
    }
  }
};

// const rotateModel = (modelRef: THREE.Object3D | null) => {
//   if (modelRef) {
//     modelRef.rotation.y += 0.01;
//   }
// };

const MyModel: React.FC<MyModelProps> = ({ url, scale, position }) => {
  const gltf = useGLTF(url);
  const modelRef = useRef<THREE.Object3D>(null);
  const speedRef = useRef(new THREE.Vector3(0, -0.01, 0));
  const stopFallingRef = useRef(false);

  useFrame(() => {
    if (!stopFallingRef.current) {
      fallingModel(modelRef.current, speedRef, stopFallingRef);
    } else {
      console.log('1');
      return;
    }
  }); // 이걸 일정 조건됐을때 remove

  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(position.x, position.y, position.z);
  return <primitive object={gltf.scene} ref={modelRef} />;
};

const Tree: React.FC = () => {
  return (
    <>
      <OrbitControls />

      <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 3]} intensity={1} />
      <directionalLight position={[2, 5, 3]} intensity={1} />

      <MyModel
        url={require('./assets/tree_2.glb')}
        scale={0.5}
        position={new THREE.Vector3(0, 10, 0)}
      />

      <Cube />
    </>
  );
};

export default Tree;

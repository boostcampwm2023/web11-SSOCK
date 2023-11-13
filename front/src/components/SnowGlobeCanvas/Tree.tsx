import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MyModelProps {
  url: string;
  scale: number;
  position: THREE.Vector3;
}

const fallingModel = (
  modelRef: THREE.Object3D | null,
  speedRef: React.MutableRefObject<THREE.Vector3>
) => {
  const airResistance = 0.02;
  const gravity = 0.1 / 60;

  if (modelRef) {
    modelRef.position.add(speedRef.current);
    speedRef.current.y -= gravity;
    speedRef.current.y *= 1 - airResistance;

    if (modelRef.position.y <= 0.4 && Math.abs(speedRef.current.y) <= 0.02) {
      speedRef.current = new THREE.Vector3(0, 0, 0);
    }

    if (modelRef.position.y <= 0.3) {
      speedRef.current.y *= -1;
    }
  }
};

const MyModel: React.FC<MyModelProps> = ({ url, scale, position }) => {
  const gltf = useGLTF(url);
  const modelRef = useRef<THREE.Object3D>(null); // 이안에 위치 정보 들어있음
  const speedRef = useRef(new THREE.Vector3(0, -0.01, 0)); // 이건 속도 정보

  useFrame(() => {
    fallingModel(modelRef.current, speedRef);
  });

  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(position.x, position.y, position.z);

  return <primitive object={gltf.scene} ref={modelRef} />;
};

const Tree: React.FC = () => {
  return (
    <>
      <MyModel
        url={'./testModel/tree_2.glb'}
        scale={1}
        position={new THREE.Vector3(0, 10, 0)}
      />
    </>
  );
};

export default Tree;

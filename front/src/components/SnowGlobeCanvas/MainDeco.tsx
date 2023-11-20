import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MAIN } from '../../constants/deco';

interface MyModelProps {
  id: number;
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

    if (modelRef.position.y <= 0.1 && Math.abs(speedRef.current.y) <= 0.02) {
      speedRef.current = new THREE.Vector3(0, 0, 0);
    }

    if (modelRef.position.y <= 0) {
      speedRef.current.y *= -1;
    }
  }
};

const MainDeco = ({ id, scale, position }: MyModelProps) => {
  const deco = useGLTF(MAIN[id].fileName).scene.clone();
  const speedRef = useRef(new THREE.Vector3(0, -0.01, 0));

  deco.name = MAIN[id].name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);

  useFrame(() => {
    fallingModel(deco, speedRef);
  });

  return <primitive object={deco} />;
};

export default MainDeco;

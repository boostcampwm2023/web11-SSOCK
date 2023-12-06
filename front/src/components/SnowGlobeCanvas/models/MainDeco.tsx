import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { makeColorChangedMaterial } from '@utils/meshUtils';
import { MAIN } from '@constants';

interface MyModelProps {
  id: number;
  scale: number;
  position: THREE.Vector3;
  color: string;
}

const fallingModel = (
  modelRef: THREE.Object3D | null,
  speedRef: React.MutableRefObject<THREE.Vector3>,
  delta: number,
  isStoppedRef: React.MutableRefObject<boolean>
) => {
  const airResistance = 0.02;
  const acceleration = 0.3 * delta; //가속도

  if (modelRef) {
    modelRef.position.add(speedRef.current);
    speedRef.current.y -= acceleration;
    speedRef.current.y *= 1 - airResistance;

    if (modelRef.position.y <= 0.1 && Math.abs(speedRef.current.y) <= 0.05) {
      isStoppedRef.current = true;
    }

    if (modelRef.position.y <= 0) {
      speedRef.current.y *= -1;
    }
  }
};

const MainDeco = ({ id, scale, position, color }: MyModelProps) => {
  const deco = useGLTF(MAIN[id].fileName).scene.clone();
  const speedRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const isStoppedRef = useRef<boolean>(false);
  useEffect(() => {
    isStoppedRef.current = false;
  }, [deco]);
  deco.name = MAIN[id].name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  const colorPart = deco.getObjectByName('colorPart') as THREE.Mesh;
  colorPart.material = makeColorChangedMaterial(colorPart, color);
  deco.children.forEach(mesh => (mesh.castShadow = true));
  useFrame((_, delta) => {
    if (!isStoppedRef.current) {
      fallingModel(deco, speedRef, delta, isStoppedRef);
    }
  });

  return <primitive object={deco} />;
};

export default MainDeco;

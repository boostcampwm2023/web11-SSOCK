import { MutableRefObject, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei/core/useGLTF';
import { useFrame } from '@react-three/fiber';
import { Mesh, Object3D, Vector3 } from 'three';
import { makeColorChangedMaterial } from '@utils/meshUtils';
import { MAIN } from '@constants';

interface MyModelProps {
  id: number;
  scale: number;
  position: Vector3;
  color: string;
}

const fallingModel = (
  modelRef: Object3D | null,
  speedRef: MutableRefObject<Vector3>,
  delta: number,
  isStoppedRef: MutableRefObject<boolean>
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
  const speedRef = useRef<Vector3>(new Vector3(0, 0, 0));
  const isStoppedRef = useRef<boolean>(false);

  useEffect(() => {
    isStoppedRef.current = false;
  }, [deco]);

  deco.name = MAIN[id].name;
  deco.scale.set(scale, scale, scale);
  deco.position.set(position.x, position.y, position.z);
  deco.children.forEach(mesh => (mesh.castShadow = true));

  const colorPart = deco.getObjectByName('colorPart') as Mesh;
  colorPart.material = makeColorChangedMaterial(colorPart, color);

  useFrame((_, delta) => {
    if (delta > 1) {
      delta = 0;
    }
    if (!isStoppedRef.current) {
      fallingModel(deco, speedRef, delta, isStoppedRef);
    }
  });

  return <primitive object={deco} />;
};

export default MainDeco;

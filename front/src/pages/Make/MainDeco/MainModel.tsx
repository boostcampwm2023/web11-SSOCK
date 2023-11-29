import { useContext } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MAIN, BOTTOM } from '../../../constants/deco';
import { DecoContext } from './DecoProvider';

const MainModel = () => {
  const { step, mainDecoID, mainColor, bottomID } = useContext(DecoContext);
  const selectDeco = 0;
  const selectBottom = 2;
  const fileName =
    step === selectDeco
      ? MAIN[mainDecoID].fileName
      : step === selectBottom
      ? BOTTOM[bottomID].fileName
      : MAIN[0].fileName;
  const deco = useGLTF(fileName).scene.clone();

  if (step !== selectDeco && step !== selectBottom) return <></>;

  if (step === selectDeco) {
    deco.scale.set(0.8, 0.8, 0.8);
    deco.position.set(0, -0.3, 0);
  } else {
    deco.scale.set(0.2, 0.2, 0.2);
    deco.position.set(0, 1, 0);
  }

  deco.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      if (child.name === 'Sub') {
        return;
      }
      if (child.name === 'Main') {
        const newMaterial = child.material.clone();
        newMaterial.color = new THREE.Color(mainColor);
        child.material = newMaterial;
      }
    }
  });
  return <primitive object={deco} />;
};

export default MainModel;

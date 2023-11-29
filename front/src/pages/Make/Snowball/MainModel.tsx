import { useContext } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MAIN } from '../../../constants/deco';
import { MainContext } from './MainProvider';

const MainModel = () => {
  const { mainID, color } = useContext(MainContext);
  const mainDeco = useGLTF(MAIN[mainID].fileName).scene.clone();

  mainDeco.scale.set(1, 1, 1);
  mainDeco.position.set(0, 0, 0);
  mainDeco.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      if (child.name === 'Sub') {
        return;
      }
      if (child.name === 'Main') {
        const newMaterial = child.material.clone();
        newMaterial.color = new THREE.Color(color);
        child.material = newMaterial;
      }
    }
  });
  return <primitive object={mainDeco} />;
};

export default MainModel;

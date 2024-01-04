import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import * as MeshUtils from '@utils/meshUtils';
import { BOTTOM } from '@constants';

interface BottomProps {
  scale: number;
  position: THREE.Vector3;
  bottomID: number;
  title: string;
  color: THREE.Color;
}

const Bottom: React.FC<BottomProps> = ({
  scale,
  position,
  bottomID,
  title,
  color
}) => {
  const bottom = useGLTF(BOTTOM[bottomID].fileName).scene.clone();
  const nameTag = bottom.getObjectByName('nameTag') as THREE.Mesh;
  if (nameTag && nameTag.material instanceof THREE.MeshStandardMaterial) {
    const newTexture = MeshUtils.makeCanvasTexture({
      string: title,
      width: 1024,
      height: 1024,
      positionY: 1024 / 8,
      font: 'Bold 6.25rem KingSejongInstitute',
      fontColor: 'black',
      backgGroundColor: 'white'
    });
    nameTag.material.map = newTexture;
    nameTag.material.bumpMap = newTexture;
  }

  const mainColor = bottom.getObjectByName('mainColor') as THREE.Mesh;
  if (mainColor) {
    const material = mainColor.material as THREE.MeshStandardMaterial;
    material.color = color;
  }

  bottom.scale.set(scale, scale, scale);
  bottom.position.set(position.x, position.y, position.z);

  return <primitive object={bottom} />;
};

export default Bottom;

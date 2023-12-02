import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { BOTTOM } from '../../../constants/deco';

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
  if (nameTag) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const material = nameTag.material as THREE.MeshStandardMaterial;
    canvas.width = 1024;
    canvas.height = 1024;

    if (context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 1024, 1024);
      context.font = 'Bold 6.25rem KingSejongInstitute';
      context.fillStyle = '#131313';
      context.textBaseline = 'middle';

      const textWidth = context.measureText(title).width;
      if (textWidth > 1000) {
        context.font = 'Bold 3.125rem KingSejongInstitute';
      }
      context.fillText(title, canvas.width / 2 - textWidth / 2, 1024 / 8, 1024);
    }

    const nameTexture = new THREE.CanvasTexture(canvas);
    material.map = nameTexture;
    material.bumpMap = nameTexture;
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

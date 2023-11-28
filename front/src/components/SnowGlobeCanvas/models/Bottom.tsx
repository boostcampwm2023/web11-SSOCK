import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BottomProps {
  scale: number;
  position: THREE.Vector3;
}

const Bottom: React.FC<BottomProps> = ({ scale, position }) => {
  const bottom = useGLTF('/models/bottom2.glb').scene.clone();
  const title = '바보의 스노우볼';
  const nameTag = bottom.getObjectByName('nameTag') as THREE.Mesh;

  if (nameTag) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const material = nameTag.material as THREE.MeshStandardMaterial;
    canvas.width = 1024;
    canvas.height = 1024;
    console.log(canvas, context);
    if (context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 1024, 1024);
      context.font = 'Bold 100px KingSejongInstitute';
      context.fillStyle = '#131313';
      context.textBaseline = 'middle';
      let textWidth = context.measureText(title).width;
      if (textWidth > 1000) {
        context.font = 'Bold 50px KingSejongInstitute';
      }
      textWidth = context.measureText(title).width;
      console.log(textWidth);
      context.fillText(title, canvas.width / 2 - textWidth / 2, 1024 / 8, 1024);
    }
    const nameTexture = new THREE.CanvasTexture(canvas);
    console.log(nameTag);
    material.map = nameTexture;
    material.bumpMap = nameTexture;
  }

  bottom.scale.set(scale, scale, scale);
  bottom.position.set(position.x, position.y, position.z);

  return <primitive object={bottom} />;
};

export default Bottom;

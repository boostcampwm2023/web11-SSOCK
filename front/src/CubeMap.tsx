import React from 'react';
import * as THREE from 'three';
import { MeshPhysicalMaterial, CubeTextureLoader } from 'three';
import { useThree } from '@react-three/fiber';

function CubeMap() {
  // CubeTextureLoader를 사용하여 환경 맵을 로드합니다.
  

  //   const skyMaterialArray = [];
  //   const textureFt = new THREE.TextureLoader().load('.cubemap/flames_ft.jpg'); // 순서 중요
  //   const textureBk = new THREE.TextureLoader().load('.cubemap/flames_bk.jpg');
  //   const textureUp = new THREE.TextureLoader().load('.cubemap/flames_up.jpg');
  //   const textureDn = new THREE.TextureLoader().load('.cubemap/flames_dn.jpg');
  //   const textureRt = new THREE.TextureLoader().load('.cubemap/flames_rt.jpg');
  //   const textureLf = new THREE.TextureLoader().load('.cubemap/flames_lf.jpg');
  //   skyMaterialArray.push(
  //     new THREE.MeshStandardMaterial({
  //       map: textureFt
  //     })
  //   );
  //   skyMaterialArray.push(
  //     new THREE.MeshStandardMaterial({
  //       map: textureBk
  //     })
  //   );
  //   skyMaterialArray.push(
  //     new THREE.MeshStandardMaterial({
  //       map: textureUp
  //     })
  //   );
  //   skyMaterialArray.push(
  //     new THREE.MeshStandardMaterial({
  //       map: textureDn
  //     })
  //   );
  //   skyMaterialArray.push(
  //     new THREE.MeshStandardMaterial({
  //       map: textureRt
  //     })
  //   );
  //   skyMaterialArray.push(
  //     new THREE.MeshStandardMaterial({
  //       map: textureLf
  //     })
  //   );
  // for (let i = 0; i < 6; i++) {
  //   skyMaterialArray[i].side = THREE.BackSide; // 바깥이 아니라 안쪽에 texture 적용
  // }
  //   const geometry1 = new THREE.BoxGeometry(2400, 2400, 2400); // 정육면체, x, y, z
  //   const obj1 = new THREE.Mesh(geometry1, skyMaterialArray);
  //   // scene.add(obj1);

  return (
    <mesh>
      <boxGeometry args={[50, 50, 50]} />
      <meshPhysicalMaterial
        clearcoat={1}
        transmission={0.9}
        transparent
        envMap={envMap}
      />
    </mesh>
  );
}

export default CubeMap;

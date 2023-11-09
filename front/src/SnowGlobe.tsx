import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { CubeTextureLoader } from 'three';
import Tree from './Tree';
import { useThree } from '@react-three/fiber';

interface MyModelProps {
  url: string;
  scale: number;
  position: THREE.Vector3;
}

const MyModel: React.FC<MyModelProps> = ({ url, scale, position }) => {
  const gltf = useGLTF(url);
  const modelRef = useRef<THREE.Object3D>(null); //이안에 위치 정보 들어있음

  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(position.x, position.y, position.z);
  return <primitive object={gltf.scene} ref={modelRef} />;
};

const SnowGlobe: React.FC = () => {
  const cubeTextureLoader = new CubeTextureLoader();
  //   const envMap = cubeTextureLoader.load([
  //     './cubemap/flames_ft.jpg', //해주셈 cubemap 사진으로
  //     './cubemap/flames_bk.jpg',
  //     './cubemap/flames_up.jpg',
  //     './cubemap/flames_dn.jpg',
  //     './cubemap/flames_rt.jpg',
  //     './cubemap/flames_lf.jpg'flames
  //   ]);
  //   const envMap = cubeTextureLoader.load([
  //     './cubemap/kenon_star_ft.jpg', //해주셈 cubemap 사진으로
  //     './cubemap/kenon_star_bk.jpg',
  //     './cubemap/kenon_star_up.jpg',
  //     './cubemap/kenon_star_dn.jpg',
  //     './cubemap/kenon_star_rt.jpg',
  //     './cubemap/kenon_star_lf.jpg'
  //   ]);
  // const envMap = cubeTextureLoader.load([
  //   './cubemap/sleepyhollow_ft.jpg', //해주셈 cubemap 사진으로
  //   './cubemap/sleepyhollow_bk.jpg',
  //   './cubemap/sleepyhollow_up.jpg',
  //   './cubemap/sleepyhollow_dn.jpg',
  //   './cubemap/sleepyhollow_rt.jpg',
  //   './cubemap/sleepyhollow_lf.jpg'
  // ]);

  const envMap = cubeTextureLoader.load([
    './cubemap/test.png',
    './cubemap/test.png',
    './cubemap/test.png',
    './cubemap/test.png',
    './cubemap/test.png',
    './cubemap/test.png'
  ]);
  const { scene } = useThree();
  scene.background = envMap;
  return (
    <>
      {/* Environment는 drie에서 제공하는 광원 ➡️ HDRIs파일 🟰 그림이 빛 역할 */}
      {/* <Environment background files={'./christmas_photo_studio_01_4k.hdr'} /> */}

      <MyModel
        url={'./snowglobe.glb'}
        scale={3}
        position={new THREE.Vector3(0, 0, 0)}
      />
      <Tree />
    </>
  );
};

export default SnowGlobe;

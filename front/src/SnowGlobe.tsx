import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { CubeTextureLoader } from 'three';
import Tree from './Tree';
import { useThree } from '@react-three/fiber';
import Snow from './Snow';

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
  const center = new THREE.Vector3(0, 8, 0);
  const radius = 14;
  const snows = Array.from({ length: 100 }, (_, i) => (
    <Snow
      key={i}
      position={
        new THREE.Vector3(
          center.x - radius + Math.random() * 2 * radius,
          center.y + radius + Math.random() * radius * 2,
          center.z - radius + Math.random() * 2 * radius
        )
      }
      radius={0.1 + Math.random() * 0.3}
    />
  ));

  return (
    <>
      <MyModel
        url={'./snowglobe.glb'}
        scale={3}
        position={new THREE.Vector3(0, 0, 0)}
      />
      {snows}
      <Tree />
    </>
  );
};

export default SnowGlobe;

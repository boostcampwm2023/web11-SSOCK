import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { CubeTextureLoader } from 'three';
import { useThree } from '@react-three/fiber';

interface MyModelProps {
  url: string;
  scale: number;
  position: THREE.Vector3;
}

const fallingModel = (
  modelRef: THREE.Object3D | null,
  speedRef: React.MutableRefObject<THREE.Vector3>
) => {
  const airResistance = 0.01;
  const gravity = 0.1 / 60;
  if (modelRef) {
    modelRef.position.add(speedRef.current);
    speedRef.current.y -= gravity;
    speedRef.current.y *= 1 - airResistance;

    if (modelRef.position.y <= 1.1 && Math.abs(speedRef.current.y) <= 0.02) {
      speedRef.current = new THREE.Vector3(0, 0, 0);
    }

    if (modelRef.position.y <= 1.0) {
      speedRef.current.y *= -1;
    }
  }
};

// const rotateModel = (modelRef: THREE.Object3D | null) => {
//   if (modelRef) {
//     modelRef.rotation.y += 0.01;
//   }
// };

const MyModel: React.FC<MyModelProps> = ({ url, scale, position }) => {
  const gltf = useGLTF(url);
  const modelRef = useRef<THREE.Object3D>(null); //이안에 위치 정보 들어있음
  const speedRef = useRef(new THREE.Vector3(0, -0.01, 0)); //이건 속도 정보

  //되게 저번에 어렵게 생각했었는데 사실 3차원 세상에서 필요한건 지금 내 위치랑 속도밖에 없음
  //하나의 모델있잖아 얘는 위치랑 속도만 가지고 있으면 되고
  //이 모델들의 속도를 관리해주는 메소드들을 앞으로 만들게 될것
  //useFrame에는 속도에 따라 위치를 바꿔주는 단 한개의 함수만 있으면 만사 오케이 ㅇㅈ? <- 당신 뭐야?
  // 해 줘 구조를 그릴까 좀?
  useFrame(() => {
    fallingModel(modelRef.current, speedRef);
  }); //너무 구려

  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(position.x, position.y, position.z);
  return <primitive object={gltf.scene} ref={modelRef} />;
};

const Tree: React.FC = () => {
  const cubeTextureLoader = new CubeTextureLoader();
  const envMap = cubeTextureLoader.load([
    './cubemap/flames_ft.jpg', //해주셈 cubemap 사진으로
    './cubemap/flames_bk.jpg',
    './cubemap/flames_up.jpg',
    './cubemap/flames_dn.jpg',
    './cubemap/flames_rt.jpg',
    './cubemap/flames_lf.jpg'
  ]);
  //const { scene } = useThree();
  //scene.background = envMap;
  return (
    <>
      {/* Environment는 drie에서 제공하는 광원 ➡️ HDRIs파일 🟰 그림이 빛 역할 */}
      {/* <Environment background files={'./christmas_photo_studio_01_4k.hdr'} /> */}

      <MyModel
        url={'./tree_2.glb'}
        scale={0.2}
        position={new THREE.Vector3(0, 10, 0)}
      />
    </>
  );
};

export default Tree;

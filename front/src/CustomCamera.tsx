import { useThree, useFrame } from '@react-three/fiber';

const CustomCamera = () => {
  const { camera } = useThree();
  //0,0,0 기준으로 빙글빙글 돌게하는법

  useFrame(state => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.cos(time) * 10;
    camera.position.z = Math.sin(time) * 10;

    camera.lookAt(0, 0, 0);
  });

  camera.position.set(Math.cos(10), 5, Math.sin(10));
};

export default CustomCamera;

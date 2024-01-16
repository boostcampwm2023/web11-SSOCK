import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Canvas } from '@react-three/fiber';
import { CanvasContainer } from '@utils';
import DecoModel from './DecoModel';

const DecoCavnas = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [5, 0, 0] }}>
        <OrbitControls />
        <ambientLight intensity={1} position={[5, 5, 0]} />
        <directionalLight
          position={[5, 7, 3]}
          intensity={5}
          color={'#e2bb83'}
        />
        <DecoModel />
      </Canvas>
    </CanvasContainer>
  );
};

export default DecoCavnas;

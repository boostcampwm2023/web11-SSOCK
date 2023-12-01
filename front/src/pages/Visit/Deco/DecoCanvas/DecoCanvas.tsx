import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import DecoModel from './DecoModel';
import { OrbitControls } from '@react-three/drei';

const CanvasContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

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

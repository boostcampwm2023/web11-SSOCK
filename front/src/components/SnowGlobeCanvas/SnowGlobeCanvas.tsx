import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import theme from '../../utils/theme';
import SnowGlobe from './SnowGlobe';
import Box from './Box';
import * as THREE from 'three';
import Ground from './Ground';

const CanvasBox = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;

const SnowGlobeCanvas = () => {
  return (
    <CanvasBox>
      <Canvas camera={{ position: [0, 10, 10] }}>
        <OrbitControls />

        <ambientLight intensity={0.5} color={'#cfcabb'} />
        <directionalLight
          position={[1, 1, 0]}
          intensity={3}
          color={'#e2bb83'}
        />
        <Ground scale={1} position={new THREE.Vector3(0, 0, 0)} />
        {/* <SnowGlobe /> */}
      </Canvas>
    </CanvasBox>
  );
};

export default SnowGlobeCanvas;

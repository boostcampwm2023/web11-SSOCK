import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import theme from '../../utils/theme';
import SnowGlobe from './SnowGlobe';
import Box from './Box';
import * as THREE from 'three';

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
        <Box
          scale={1}
          position={new THREE.Vector3(0, 0, 0)}
          color={new THREE.Color('red')}
        />
        <Box
          scale={1}
          position={new THREE.Vector3(1, 0, 0)}
          color={new THREE.Color('blue')}
        />
        <Box
          scale={1}
          position={new THREE.Vector3(-1, 0, 0)}
          color={new THREE.Color('green')}
        />
        <Box
          scale={1}
          position={new THREE.Vector3(0, 0, -1)}
          color={new THREE.Color('white')}
        />

        <Box
          scale={1}
          position={new THREE.Vector3(0, 0, 1)}
          color={new THREE.Color('black')}
        />
        {/* <SnowGlobe /> */}
      </Canvas>
    </CanvasBox>
  );
};

export default SnowGlobeCanvas;

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import theme from '../../utils/theme';
import SnowGlobe from './SnowGlobe';

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
      <Canvas camera={{ position: [0, 10, -40] }}>
        <OrbitControls />

        <ambientLight intensity={0.5} color={'#cfcabb'} />
        <directionalLight
          position={[1, 1, 0]}
          intensity={3}
          color={'#e2bb83'}
        />

        <SnowGlobe />
      </Canvas>
    </CanvasBox>
  );
};

export default SnowGlobeCanvas;

import { Canvas } from '@react-three/fiber';
import Tree from './Tree';
import Cube from './Cube';
import Glass from './Glass';
import { OrbitControls } from '@react-three/drei';
// import CustomCamera from './CustomCamera';
import { Button } from './components';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import theme from './utils/theme';

const CanvasBox = styled.div`
  margin: auto;
  width: 70vw;
  height: 70vh;
  @media (min-width: ${theme.size.maxWidth}) {
    width: ${theme.size.maxWidth};
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />

      <CanvasBox>
        <Canvas>
          {/* <CustomCamera /> */}
          <OrbitControls />
          <ambientLight intensity={1} />
          <directionalLight position={[2, 1, 3]} intensity={1} />

          <Glass />
          <Tree />
          <Cube />
        </Canvas>
      </CanvasBox>

      <Button text={'버튼 텍스트를 입력해주세요.'} color={'red'} />
      <Button text={'버튼 텍스트를 입력해주세요.'} color={'green'} />
    </>
  );
};

export default App;

import { Canvas } from '@react-three/fiber';
import Tree from './Tree';
import Cylinder from './Cylinder';
import Glass from './Glass';
import { OrbitControls } from '@react-three/drei';
// import CustomCamera from './CustomCamera';
import { Button } from './components';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import theme from './utils/theme';

const CanvasBox = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  @media (min-width: ${theme.size.maxWidth}) {
    width: ${theme.size.maxWidth};
  }
`;

const ButtonBox = styled.div`
  position: fixed;
  width: 100%;
  @media (min-width: ${theme.size.maxWidth}) {
    width: ${theme.size.maxWidth};
  }
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
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
          <Cylinder />
        </Canvas>
      </CanvasBox>

      <ButtonBox>
        <Button
          text={'버튼 텍스트를 입력해주세요.'}
          color={theme.colors['--primary-red-primary']}
        />
        <Button
          text={'버튼 텍스트를 입력해주세요.'}
          color={theme.colors['--primary-green-primary']}
        />
      </ButtonBox>
    </>
  );
};

export default App;

import { useContext } from 'react';
import styled from 'styled-components';
import { SnowGlobeCanvas, UIContainer } from '@components';
import IntroButtonBox from './IntroButtonBox';
import MsgBox from './MsgBox';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';
import { MessageProvider } from '../Visit/MessageProvider';

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 10rem;
  text-align: center;
  color: ${props => props.theme.colors['--primary-yellow']};
  font: ${props => props.theme.font['--normal-title-font']};
`;

const Intro = () => {
  const { snowBallData } = useContext(SnowBallContext);
  return (
    <>
      <MessageProvider>
        <SnowGlobeCanvas snowBallData={snowBallData} />
        <UIContainer>
          <TitleDiv>
            <span>스노우볼 속 내마음</span>
          </TitleDiv>
          <MsgBox />
          <IntroButtonBox />
        </UIContainer>
      </MessageProvider>
    </>
  );
};

export default Intro;

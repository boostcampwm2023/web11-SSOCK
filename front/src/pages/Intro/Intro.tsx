import styled from 'styled-components';
import { SnowGlobeCanvas, UIContainer } from '../../../src/components';
import IntroButtonBox from './IntroButtonBox';
import { MessageProvider } from '../Visit/MessageProvider';
import MsgBox from './MsgBox';

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
  return (
    <>
      <MessageProvider>
        <SnowGlobeCanvas />
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

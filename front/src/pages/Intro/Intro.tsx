import styled from 'styled-components';
import theme from '../../utils/theme';
import { SnowGlobeCanvas } from '../../../src/components';
import IntroButtonBox from './IntroButtonBox';
import { UIContainer } from '../../components/UIContainer';

const Outer = styled.div`
  position: relative;

  left: 50%;
  transform: translateX(-50%);

  width: 100vw;
  height: 100vh;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 10rem;
  text-align: center;
  color: ${theme.colors['--primary-yellow']};
  font: ${theme.font['--normal-title-font']};
`;

const Intro = () => {
  return (
    <>
      <Outer>
        <SnowGlobeCanvas />
        <UIContainer>
          <TitleDiv>
            <span>스노우볼 속 내마음</span>
          </TitleDiv>
          <IntroButtonBox />
        </UIContainer>
      </Outer>
    </>
  );
};

export default Intro;

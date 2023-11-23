import styled from 'styled-components';
import theme from '../../utils/theme';
import { SnowGlobeCanvas } from '../../../src/components';
import IntroButtonBox from './IntroButtonBox';
import { UIContainer } from '../../components/UIContainer';

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
        <SnowGlobeCanvas />
        <UIContainer>
          <TitleDiv>
            <span>스노우볼 속 내마음</span>
          </TitleDiv>
          <IntroButtonBox />
        </UIContainer>
    </>
  );
};

export default Intro;

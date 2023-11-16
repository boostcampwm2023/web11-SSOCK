import styled from 'styled-components';
import theme from '../../utils/theme';
import { SnowGlobeCanvas } from '../../../src/components';
import IntroButtonBox from './IntroButtonBox';

const Title = styled.div`
  color: ${theme.colors['--primary-yellow']};
  font: ${theme.font['--normal-title-font']};
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  white-space: nowrap;
`;

const Intro = () => {
  return (
    <>
      <SnowGlobeCanvas />
      <Title>스노우볼 속 내 마음</Title>
      <IntroButtonBox />
    </>
  );
};

export default Intro;

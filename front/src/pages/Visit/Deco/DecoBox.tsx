import styled from 'styled-components';
import theme from '../../../utils/theme';
import { DECO, MSG_COLOR } from '../../../constants/deco';
import { DecoContext } from './DecoProvider';

interface DecoProps {
  deco: 'Deco' | 'MsgColor';
}

const StyledBox = styled.div`
  border-radius: 50%;
  border: 3px solid white;
  background-color: ${theme.colors['--black-primary']};
  width: 10vh;
  height: 10vh;
  cursor: pointer;
  pointer-events: stroke;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 100%;
`;

const StyledColorBox = styled(StyledBox)`
  background-color: ${props => props.color};
`;

const decoImgs = (folder: string) => {
  return folder === 'Deco'
    ? DECO.map(({ fileName, img }) => (
        <StyledBox key={img}>
          <StyledImg
            src={`/modelsPng/${folder}/${img}`}
            alt="deco"
            onClick={() => console.log(`img click, ${fileName}`)}
          ></StyledImg>
        </StyledBox>
      ))
    : MSG_COLOR.map(({ color }) => (
        <StyledColorBox key={color} color={color}></StyledColorBox>
      ));
};

const DecoBox = (props: DecoProps) => {
  return <>{decoImgs(props.deco)}</>;
};

export default DecoBox;

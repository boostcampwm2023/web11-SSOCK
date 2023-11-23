import styled from 'styled-components';
import theme from '../../../utils/theme';
import { DECO, MAIN } from '../../../constants/deco';

interface DecoProps {
  deco: 'Deco' | 'Main';
}

interface Deco {
  name: string;
  fileName: string;
  img: string;
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

const decoImgs = (folder: string) => {
  return folder === 'Deco'
    ? DECO.map(({ img }: Deco) => (
        <StyledBox key={img}>
          <StyledImg
            src={`/modelsPng/${folder}/${img}`}
            alt="deco"
          ></StyledImg>
        </StyledBox>
      ))
    : MAIN.map(({ img }: Deco) => (
        <StyledBox key={img}>
          <StyledImg
            src={`/modelsPng/${folder}/${img}`}
            alt="main"
          ></StyledImg>
        </StyledBox>
      ));
};

const DecoBox = (props: DecoProps) => {
  return <>{decoImgs(props.deco)}</>;
};

export default DecoBox;

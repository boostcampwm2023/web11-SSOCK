import { useContext } from 'react';
import styled from 'styled-components';
import theme from '../../../utils/theme';
import { MAIN, BOTTOM } from '../../../constants/deco';
import { DecoContext } from './DecoProvider';

interface DecoProps {
  deco: 'Main' | 'Bottom';
}

const StyledBox = styled.div`
  border-radius: 100%;
  border: 2px solid white;
  background-color: ${theme.colors['--black-primary']};
  width: 7rem;
  height: 7rem;
  cursor: pointer;
  pointer-events: stroke;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 100%;
`;

const DecoImgs = (folder: string) => {
  const { setMainDecoID, setBottomID } = useContext(DecoContext);

  return folder === 'Main'
    ? MAIN.map(({ img }, index) => (
        <StyledBox key={img}>
          <StyledImg
            src={`/models/img/${folder}/${img}`}
            alt="deco"
            onClick={() => setMainDecoID(index)}
          />
        </StyledBox>
      ))
    : BOTTOM.map(({ img }, index) => (
        <StyledBox key={img}>
          <StyledImg
            src={`/models/img/${folder}/${img}`}
            alt="deco"
            onClick={() => setBottomID(index)}
          />
        </StyledBox>
      ));
};

const DecoBox = (props: DecoProps) => {
  return <>{DecoImgs(props.deco)}</>;
};

export default DecoBox;

import { useContext } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { DECO, MSG_COLOR } from '../../constants/deco';
import { DecoContext } from './DecoProvider';

interface DecoProps {
  deco: 'Deco' | 'MsgColor';
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

const StyledColorBox = styled(StyledBox)`
  background-color: ${props => props.color};
`;

const DecoImgs = (folder: string) => {
  const { setDecoID, setLetterID } = useContext(DecoContext);

  return folder === 'Deco'
    ? DECO.map(({ img }, index) => (
        <StyledBox key={img}>
          <StyledImg
            src={`/models/img/${folder}/${img}`}
            alt="deco"
            onClick={() => setDecoID(index)}
          />
        </StyledBox>
      ))
    : MSG_COLOR.map(({ color }, index) => (
        <StyledColorBox
          key={color}
          color={color}
          onClick={() => setLetterID(index)}
        />
      ));
};

const DecoBox = (props: DecoProps) => {
  return <>{DecoImgs(props.deco)}</>;
};

export default DecoBox;

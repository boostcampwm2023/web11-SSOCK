import { useContext } from 'react';
import styled from 'styled-components';
import { DECO, MSG_COLOR } from '@constants';
import { DecoContext } from './DecoProvider';

interface DecoProps {
  deco: 'Deco' | 'MsgColor';
}

const StyledBox = styled.div`
  border-radius: 100%;
  border: 2px solid white;
  background-color: ${props => props.theme.colors['--black-primary']};
  width: 7rem;
  height: 7rem;
  cursor: pointer;
  pointer-events: stroke;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: min-content;
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
    ? DECO.map(({ img }, index) => {
        if (index > 0)
          return (
            <StyledBox key={img}>
              <StyledImg
                src={img}
                alt="deco"
                onClick={() => setDecoID(index)}
              />
            </StyledBox>
          );
      })
    : MSG_COLOR.map(({ color }, index) => {
        if (index > 0)
          return (
            <StyledColorBox
              key={color}
              color={color}
              onClick={() => setLetterID(index)}
            />
          );
      });
};

const DecoBox = (props: DecoProps) => {
  return <>{DecoImgs(props.deco)}</>;
};

export default DecoBox;

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MakeDecoRecoil } from '@states';
import { BOTTOM, MAIN } from '@constants';

interface DecoProps {
  deco: 'Main' | 'Bottom';
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

const DecoImgs = (folder: string) => {
  const setMakeDecoBox = useSetRecoilState(MakeDecoRecoil);

  return folder === 'Main'
    ? MAIN.map(({ img }, index) => {
        if (index > 0)
          return (
            <StyledBox key={img}>
              <StyledImg
                src={img}
                alt={`mainDeco${index}`}
                onClick={() =>
                  setMakeDecoBox(prev => ({ ...prev, mainDecoID: index }))
                }
              />
            </StyledBox>
          );
      })
    : BOTTOM.map(({ img }, index) => {
        if (index > 0)
          return (
            <StyledBox key={img}>
              <StyledImg
                src={img}
                alt={`bottomDeco${index}`}
                onClick={() =>
                  setMakeDecoBox(prev => ({ ...prev, bottomID: index }))
                }
              />
            </StyledBox>
          );
      });
};

const DecoBox = (props: DecoProps) => {
  return <>{DecoImgs(props.deco)}</>;
};

export default DecoBox;

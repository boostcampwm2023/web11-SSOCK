import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { VisitDecoRecoil } from '@states';
import { DECO, MSG_COLOR } from '@constants';

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

const StyledPicture = styled.picture`
  width: 100%;
`;

const StyledColorBox = styled(StyledBox)`
  background-color: ${props => props.color};
`;

const DecoImgs = (folder: string) => {
  const setVisitDecoBox = useSetRecoilState(VisitDecoRecoil);

  return folder === 'Deco'
    ? DECO.map(({ img, webp }, index) => {
        if (index > 0)
          return (
            <StyledBox key={img}>
              <StyledPicture>
                <source
                  srcSet={webp}
                  type="image/webp"
                  onClick={() =>
                    setVisitDecoBox(prev => ({ ...prev, decoID: index }))
                  }
                />
                <StyledImg
                  src={img}
                  alt="deco"
                  onClick={() =>
                    setVisitDecoBox(prev => ({ ...prev, decoID: index }))
                  }
                />
              </StyledPicture>
            </StyledBox>
          );
      })
    : MSG_COLOR.map(({ color }, index) => {
        if (index > 0)
          return (
            <StyledColorBox
              key={color}
              color={color}
              onClick={() =>
                setVisitDecoBox(prev => ({ ...prev, letterID: index }))
              }
            />
          );
      });
};

const DecoBox = (props: DecoProps) => {
  return <>{DecoImgs(props.deco)}</>;
};

export default DecoBox;

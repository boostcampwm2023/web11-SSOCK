import { useState, useRef, useEffect } from 'react';
import { StepButton, PostButton } from '../../../components';
import theme from '../../../utils/theme';
import styled from 'styled-components';
import { Msg } from '../../../components';
import DecoEnroll from './DecoEnroll';
import { HeaderText } from '../../../components';

const StateBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StateBox = styled.div`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.color};
  transition: background-color 0.5s ease-in-out;
`;

const StyledButtonWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
`;

const SelectDecoBox = styled.div`
  overflow: hidden;
  display: flex;
  padding: 1rem;
  width: 100%;
  height: 10rem;
  background-color: rgba(236, 236, 236, 0.5);
  pointer-events: stroke;
  * {
    pointer-events: stroke;
  }
`;

const SelectDeco = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 0;
  gap: 1rem;
`;

const DecoBox = styled.div`
  border-radius: 100%;
  border: 2px solid white;
  background-color: ${theme.colors['--black-primary']};
  width: 7rem;
  height: 7rem;
  cursor: pointer;
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  pointer-events: all;
  overflow: scroll;
`;

const ColorInput = styled.input.attrs({
  type: 'color'
})`
  width: 3rem;
  height: 3rem;
`;

const ButtonBox = styled.div`
  display: flex;
  height: 10rem;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const StyledTopWrap = styled.div`
  display: flex;
  padding: 2rem;
  gap: 3rem;
  flex-direction: column;
`;
const StyledBody = styled.div`
  flex: 1 1 auto;
  display: flex;
  overflow-y: hidden;
`;
const StyledBottomWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Steps = () => {
  const [step, setStep] = useState(0);
  const [lastBox, setLastBox] = useState(false);

  const decoColor = useRef<string | null>(null);

  const doneStep = -1;
  const selectDeco = 0;
  const selectColor = 1;
  const selectMsgColor = 2;
  const writeMsg = 3;

  //const decoId = useRef<string | null>(null);
  const decoBox = useRef<HTMLDivElement>(null);

  const [isDecoBoxClicked, setIsDecoBoxClicked] = useState(false);
  const [startClickedX, setStartClickedX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mouseDown = (event: MouseEvent) => {
    setIsDecoBoxClicked(true);
    setStartClickedX(event.pageX - decoBox.current!.offsetLeft);
    setScrollLeft(decoBox.current!.scrollLeft);
  };

  const touchDown = (event: TouchEvent) => {
    setIsDecoBoxClicked(true);
    setStartClickedX(event.touches[0].pageX - decoBox.current!.offsetLeft);
    setScrollLeft(decoBox.current!.scrollLeft);
  };

  const leave = () => setIsDecoBoxClicked(false);
  const up = () => setIsDecoBoxClicked(false);

  const mouseMove = (event: MouseEvent) => {
    if (!isDecoBoxClicked) return;
    event.preventDefault();
    const nowX = event.pageX - decoBox.current!.offsetLeft;
    const move = nowX - startClickedX;
    decoBox.current!.scrollLeft = scrollLeft - move;
  };

  const touchMove = (event: TouchEvent) => {
    if (!isDecoBoxClicked) return;
    event.preventDefault();
    const nowX = event.touches[0].pageX - decoBox.current!.offsetLeft;
    const move = nowX - startClickedX;
    decoBox.current!.scrollLeft = scrollLeft - move;
  };

  useEffect(() => {
    if (decoBox.current) {
      const decoBoxRef = decoBox.current;

      decoBoxRef.addEventListener('mousedown', mouseDown);
      decoBoxRef.addEventListener('mouseleave', leave);
      decoBoxRef.addEventListener('mouseup', up);
      decoBoxRef.addEventListener('mousemove', mouseMove);

      decoBoxRef.addEventListener('touchstart', touchDown);
      decoBoxRef.addEventListener('touchend', up);
      decoBoxRef.addEventListener('touchmove', touchMove);
    }

    return () => {
      decoBox.current?.removeEventListener('mousedown', mouseDown);
      decoBox.current?.removeEventListener('mouseleave', leave);
      decoBox.current?.removeEventListener('mouseup', up);
      decoBox.current?.removeEventListener('mousemove', mouseMove);

      decoBox.current?.removeEventListener('touchstart', touchDown);
      decoBox.current?.removeEventListener('touchend', up);
      decoBox.current?.removeEventListener('touchmove', touchMove);
    };
  }, [isDecoBoxClicked]);

  const renderStateBoxes = () => {
    const boxes = [];
    for (let i = 0; i <= step; i++) {
      const progressColor = theme.colors['--primary-green-primary']; // Progress color
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    for (let i = step + 1; i < 3; i++) {
      const progressColor = theme.colors['--primary-red-primary']; // Progress color
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    return boxes;
  };

  return (
    <>
      <StyledTopWrap>
        <HeaderText Ref={null} />

        {step === writeMsg || step === doneStep ? null : (
          <StateBar>{renderStateBoxes()}</StateBar>
        )}
      </StyledTopWrap>
      <StyledBody>
        {step === writeMsg ? (
          <MsgBox>
            <Msg
              key={1}
              color={decoColor.current!}
              isInput={true}
              content={''}
              sender={''}
            />
          </MsgBox>
        ) : null}
      </StyledBody>
      <StyledBottomWrap>
        <StyledButtonWrap>
          {step <= selectDeco ? (
            <div></div>
          ) : (
            <StepButton
              text="< 이전"
              step="decrease"
              color={theme.colors['--primary-red-primary']}
              view={[step, setStep]}
              disabled={false}
            />
          )}

          {step >= writeMsg || step === doneStep ? (
            <div></div>
          ) : (
            <StepButton
              text="다음 >"
              step="increase"
              color={theme.colors['--primary-red-primary']}
              view={[step, setStep]}
              disabled={false}
            />
          )}
        </StyledButtonWrap>

        <SelectDecoBox ref={decoBox}>
          <SelectDeco>
            {step === selectDeco ? (
              <>
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
              </>
            ) : null}
            {step === selectColor ? (
              <>
                <ColorInput
                  onChange={e => (decoColor.current = e.target.value)}
                />
                <p>장식 생상을 선택해주세요</p>
              </>
            ) : null}{' '}
            {step === writeMsg ? (
              <ButtonBox>
                <PostButton
                  text="선물하기"
                  color={theme.colors['--primary-red-primary']}
                  view={[lastBox, setLastBox]}
                  visible={[step, setStep]}
                />
              </ButtonBox>
            ) : null}
            {step === selectMsgColor ? (
              <>
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
              </>
            ) : null}
          </SelectDeco>
        </SelectDecoBox>
      </StyledBottomWrap>

      {step === doneStep && lastBox === true ? (
        <DecoEnroll
          visible={[step, setStep]}
          view={[lastBox, setLastBox]}
        ></DecoEnroll>
      ) : null}
    </>
  );
};

export default Steps;

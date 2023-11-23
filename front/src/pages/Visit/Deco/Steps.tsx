import { useState, useRef, useEffect } from 'react';
import { StepButton, PostButton } from '../../../components';
import theme from '../../../utils/theme';
import styled from 'styled-components';
import { Msg } from '../../../components';
import DecoEnroll from './DecoEnroll';
import { HeaderText } from '../../../components';

const StateBar = styled.div`
  margin-top: 10%;
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: center;
  gap: 5%;
`;

const StateBox = styled.div`
  display: flex;
  border-radius: 50%;
  width: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  transition: background-color 0.5s ease-in-out;
`;

const StyledButtonWrap = styled.div`
  position: relative;
  display: flex;
  gap: 4px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5%;
`;

// 한번 더 감싸자
const StyledButtonBox = styled.div``;

const SelectDecoBox = styled.div`
  position: relative;

  overflow: hidden;
  height: 15vh;
  background-color: rgba(236, 236, 236, 0.5);
`;

const SelectDeco = styled.div`
  position: absolute;
  bottom: 0;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

const DecoBox = styled.div`
  border-radius: 50%;
  border: 3px solid white;
  background-color: ${theme.colors['--black-primary']};
  width: 10vh;
  height: 10vh;
  cursor: pointer;
  pointer-events: stroke;
`;

const MsgBox = styled.div`
  position: absolute;
  bottom: 30%;
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const StyledTopWrap = styled.div``;

const StyledBottomWrap = styled.div``;

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

      <StyledBottomWrap>
        <StyledButtonWrap>
          <StyledButtonBox>
            {step <= selectDeco ? null : (
              <StepButton
                text="< 이전"
                step="decrease"
                color={theme.colors['--primary-red-primary']}
                view={[step, setStep]}
                disabled={false}
              />
            )}
          </StyledButtonBox>

          <StyledButtonBox>
            {step >= writeMsg || step === doneStep ? null : (
              <StepButton
                text="다음 >"
                step="increase"
                color={theme.colors['--primary-red-primary']}
                view={[step, setStep]}
                disabled={false}
              />
            )}
          </StyledButtonBox>
        </StyledButtonWrap>

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

        {step === selectDeco || step === selectColor || step === selectMsgColor ? (
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
              ) : step === selectColor ? (
                <input
                  type="color"
                  onChange={e => (decoColor.current = e.target.value)}
                />
              ) : (
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
              )}
            </SelectDeco>
          </SelectDecoBox>
        ) : null}
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

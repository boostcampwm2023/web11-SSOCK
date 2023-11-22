import { useState, useRef, useEffect } from 'react';
import { StepButton, PostButton } from '../../../components';
import theme from '../../../utils/theme';
import styled from 'styled-components';
import { Msg } from '../../../components';
import DecoEnroll from './DecoEnroll';

const StateBar = styled.div`
  position: absolute;
  top: 15%;
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
  position: absolute;
  bottom: 300px;
  display: flex;
  gap: 4px;
  width: 100%;
  padding: 36px;
  align-items: center;
  margin: auto;
  justify-content: space-between;
  z-index: 1;
`;

// 한번 더 감싸자
const StyledButtonBox = styled.div``;

const SelectDecoBox = styled.div`
  position: relative;
  top: 85vh;
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
`;

const MsgBox = styled.div`
  position: absolute;
  top: 20%;
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 2%;
  display: flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Steps = () => {
  const [step, setStep] = useState(0);
  const [lastBox, setLastBox] = useState(false);

  const decoColor = useRef<string | null>(null);
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
      decoBox.current!.removeEventListener('mousedown', mouseDown);
      decoBox.current!.removeEventListener('mouseleave', leave);
      decoBox.current!.removeEventListener('mouseup', up);
      decoBox.current!.removeEventListener('mousemove', mouseMove);

      decoBox.current!.removeEventListener('touchstart', touchDown);
      decoBox.current!.removeEventListener('touchend', up);
      decoBox.current!.removeEventListener('touchmove', touchMove);
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
      {step === 3 || step === -1 ? null : (
        <StateBar>{renderStateBoxes()}</StateBar>
      )}

      <StyledButtonWrap>
        <StyledButtonBox>
          {step <= 0 ? null : (
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
          {step >= 3 || step === -1 ? null : (
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

      {step === 0 || step === 1 || step === 2 ? (
        <SelectDecoBox ref={decoBox}>
          <SelectDeco>
            {step === 0 ? (
              <>
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
                <DecoBox />
              </>
            ) : step === 1 ? (
              <input
                type="color"
                onChange={e => {
                  decoColor.current = e.target.value;
                }}
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
                <DecoBox />
              </>
            )}
          </SelectDeco>
        </SelectDecoBox>
      ) : null}

      {step === 3 ? (
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

      {step === 3 ? (
        <ButtonBox>
          <PostButton
            text="선물하기"
            color={theme.colors['--primary-red-primary']}
            view={[lastBox, setLastBox]}
            visible={[step, setStep]}
          />
        </ButtonBox>
      ) : null}

      {step === -1 && lastBox === true ? (
        <DecoEnroll
          visible={[step, setStep]}
          view={[lastBox, setLastBox]}
        ></DecoEnroll>
      ) : null}
    </>
  );
};

export default Steps;

import { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { theme, Container } from '@utils';
import { MakeDecoRecoil } from '@states';
import { InputSnowball, HeaderText, StepButton } from '@components';
import MakeButton from './MakeButton';
import DecoBox from './DecoBox';
import DecoEnroll from './DecoEnroll';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';

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

const StyledBottomWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledWarningBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledWarning = styled.div`
  color: ${props => props.theme.colors['--white-primary']};
  padding: 1rem;
  font: ${props => props.theme.font['--normal-introduce-font']};
  background-color: ${props => props.theme.colors['--primary-green-primary']};
  border-radius: 2rem;
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
  min-width: min-content;
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

const ToastMsg = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${props => props.theme.font['--normal-button-font']};
  background-color: ${props => props.theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
`;

const Steps = () => {
  const [step, setStep] = useState<number>(0);
  const [lastBox, setLastBox] = useState(false);
  const [alert, setAlert] = useState<number>(0);
  const [isDecoBoxClicked, setIsDecoBoxClicked] = useState(false);
  const [startClickedX, setStartClickedX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [{ mainColor, bottomColor }, setMakeDecoBox] =
    useRecoilState(MakeDecoRecoil);
  const { userData } = useContext(SnowBallContext);

  const doneStep = -1;
  const selectDeco = 0;
  const selectColor = 1;
  const selectBottom = 2;
  const selectBottomColor = 3;
  const writeSnowball = 4;
  const lastConfirm = 5;

  const error = 404;
  const good = 200;
  const returnPrev = -404;

  const selectDecoBox = useRef<HTMLDivElement>(null);

  const mouseDown = (event: MouseEvent) => {
    setIsDecoBoxClicked(true);
    setStartClickedX(event.pageX - selectDecoBox.current!.offsetLeft);
    setScrollLeft(selectDecoBox.current!.scrollLeft);
  };

  const touchDown = (event: TouchEvent) => {
    setIsDecoBoxClicked(true);
    setStartClickedX(
      event.touches[0].pageX - selectDecoBox.current!.offsetLeft
    );
    setScrollLeft(selectDecoBox.current!.scrollLeft);
  };

  const leave = () => setIsDecoBoxClicked(false);
  const up = () => setIsDecoBoxClicked(false);

  const mouseMove = (event: MouseEvent) => {
    if (!isDecoBoxClicked) return;
    event.preventDefault();
    const nowX = event.pageX - selectDecoBox.current!.offsetLeft;
    const move = nowX - startClickedX;
    selectDecoBox.current!.scrollLeft = scrollLeft - move;
  };

  const touchMove = (event: TouchEvent) => {
    if (!isDecoBoxClicked) return;
    event.preventDefault();
    const nowX = event.touches[0].pageX - selectDecoBox.current!.offsetLeft;
    const move = nowX - startClickedX;
    selectDecoBox.current!.scrollLeft = scrollLeft - move;
  };

  useEffect(() => {
    if (selectDecoBox.current) {
      const decoBoxRef = selectDecoBox.current;

      decoBoxRef.addEventListener('mousedown', mouseDown);
      decoBoxRef.addEventListener('mouseleave', leave);
      decoBoxRef.addEventListener('mouseup', up);
      decoBoxRef.addEventListener('mousemove', mouseMove);

      decoBoxRef.addEventListener('touchstart', touchDown);
      decoBoxRef.addEventListener('touchend', up);
      decoBoxRef.addEventListener('touchmove', touchMove);
    }

    return () => {
      selectDecoBox.current?.removeEventListener('mousedown', mouseDown);
      selectDecoBox.current?.removeEventListener('mouseleave', leave);
      selectDecoBox.current?.removeEventListener('mouseup', up);
      selectDecoBox.current?.removeEventListener('mousemove', mouseMove);

      selectDecoBox.current?.removeEventListener('touchstart', touchDown);
      selectDecoBox.current?.removeEventListener('touchend', up);
      selectDecoBox.current?.removeEventListener('touchmove', touchMove);
    };
  }, [isDecoBoxClicked]);

  const [toast, setToast] = useState(false);

  const timer = useRef<number | null>(null);
  const setToastMsg = () => {
    if (timer.current) clearTimeout(timer.current);
    if (step === selectDeco) {
      setToast(true);
      timer.current = window.setTimeout(() => {
        setToast(false);
      }, 1500);
    } else {
      setToast(false);
    }
  };

  useEffect(() => {
    setToastMsg();
  }, [step]);

  useEffect(() => {
    if (alert === good) setStep(step + 1);
    else if (alert === returnPrev) setStep(step - 1);
  }, [alert]);

  const renderStateBoxes = () => {
    const boxes = [];
    for (let i = 0; i <= step; i++) {
      const progressColor = theme.colors['--progress-done'];
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    for (let i = step + 1; i < lastConfirm; i++) {
      const progressColor = theme.colors['--progress-yet'];
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    return boxes;
  };

  return (
    <>
      {toast ? (
        <ToastMsg>드래그를 하여 여러 장식을 확인해보세요 !</ToastMsg>
      ) : null}

      <Container>
        <HeaderText Ref={null} userName={userData.nickname} />

        {step === lastConfirm || step === doneStep ? null : (
          <StateBar>{renderStateBoxes()}</StateBar>
        )}
      </Container>

      <StyledBottomWrap>
        <StyledWarningBox>
          {alert === error ? (
            <StyledWarning>스노우볼 이름을 입력해주세요!</StyledWarning>
          ) : null}
          {step === lastConfirm ? (
            <StyledWarning>🎅최종 확인 해주세요🎄</StyledWarning>
          ) : null}
        </StyledWarningBox>

        <StyledButtonWrap>
          {step <= selectDeco ? (
            <div />
          ) : step === lastConfirm ? (
            <StepButton
              text="< 이전"
              step="doneDecrease"
              color={theme.colors['--primary-red-primary']}
              view={[alert, setAlert]}
              disabled={false}
            />
          ) : (
            <StepButton
              text="< 이전"
              step="decrease"
              color={theme.colors['--primary-red-primary']}
              view={[step, setStep]}
              disabled={false}
            />
          )}

          {step >= lastConfirm || step === doneStep ? (
            <div />
          ) : step === writeSnowball ? (
            <StepButton
              text="다음 >"
              step="doneIncrease"
              color={theme.colors['--primary-red-primary']}
              view={[alert, setAlert]}
              disabled={false}
            />
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

        <SelectDecoBox ref={selectDecoBox}>
          <SelectDeco>
            {step === selectDeco ? <DecoBox deco={'Main'} /> : null}
            {step === selectColor ? (
              <>
                <ColorInput
                  value={mainColor}
                  onChange={e => {
                    setMakeDecoBox(prev => ({
                      ...prev,
                      mainColor: e.target.value
                    }));
                  }}
                />
                <p>장식 색상을 선택해주세요</p>
              </>
            ) : null}

            {step === selectBottom ? <DecoBox deco={'Bottom'} /> : null}
            {step === selectBottomColor ? (
              <>
                <ColorInput
                  value={bottomColor}
                  onChange={e =>
                    setMakeDecoBox(prev => ({
                      ...prev,
                      bottomColor: e.target.value
                    }))
                  }
                />
                <p>받침대 색상을 선택해주세요</p>
              </>
            ) : null}

            {step === writeSnowball ? <InputSnowball /> : null}
            {step === lastConfirm ? (
              <ButtonBox>
                <MakeButton
                  text="스노우볼 만들기"
                  color={theme.colors['--primary-red-primary']}
                  view={[lastBox, setLastBox]}
                  visible={[step, setStep]}
                />
              </ButtonBox>
            ) : null}
          </SelectDeco>
        </SelectDecoBox>
      </StyledBottomWrap>

      {step === doneStep && lastBox === true ? (
        <DecoEnroll visible={[step, setStep]} view={[lastBox, setLastBox]} />
      ) : null}
    </>
  );
};

export default Steps;

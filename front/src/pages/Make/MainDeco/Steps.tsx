import { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import theme from '../../../utils/theme';
import {
  InputSnowball,
  HeaderText,
  StepButton,
  MakeButton
} from '../../../components';
import DecoEnroll from './DecoEnroll';
import DecoBox from './DecoBox';
import { DecoContext } from './DecoProvider';

const StyledTopWrap = styled.div`
  display: flex;
  height: 10rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
`;

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

const StyledAlertBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledAlert = styled.div`
  color: ${theme.colors['--white-primary']};
  padding: 1rem;
  font: ${theme.font['--normal-introduce-font']};
  background-color: ${theme.colors['--primary-green-primary']};
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

const Steps = () => {
  const [step, setStep] = useState<number>(0);
  const [lastBox, setLastBox] = useState(false);
  const [alert, setAlert] = useState<number>(0);
  const { mainColor, bottomColor, setMainColor, setBottomColor } =
    useContext(DecoContext);

  const doneStep = -1;
  const selectDeco = 0;
  const selectColor = 1;
  const selectBottom = 2;
  const selectBottomColor = 3;
  const writeSnowball = 4;
  const lastConfirm = 5;

  const error = 404;
  const good = 200;

  const selectDecoBox = useRef<HTMLDivElement>(null);

  const [isDecoBoxClicked, setIsDecoBoxClicked] = useState(false);
  const [startClickedX, setStartClickedX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  useEffect(() => {
    if (alert === good) setStep(step + 1);
  }, [alert]);

  const renderStateBoxes = () => {
    const boxes = [];
    for (let i = 0; i <= step; i++) {
      const progressColor = theme.colors['--primary-green-primary']; // Progress color
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    for (let i = step + 1; i < 5; i++) {
      const progressColor = theme.colors['--primary-red-primary']; // Progress color
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    return boxes;
  };

  return (
    <>
      <StyledTopWrap>
        <HeaderText Ref={null} userName="받는사람" />

        {step === lastConfirm || step === doneStep ? null : (
          <StateBar>{renderStateBoxes()}</StateBar>
        )}
      </StyledTopWrap>

      <StyledBottomWrap>
        <StyledAlertBox>
          {alert === error ? (
            <StyledAlert>스노우볼 이름을 입력해주세요!</StyledAlert>
          ) : null}
          {step === lastConfirm ? (
            <StyledAlert>🎅최종 확인 해주세요🎄</StyledAlert>
          ) : null}
        </StyledAlertBox>

        <StyledButtonWrap>
          {step <= selectDeco ? (
            <div />
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
              step="done"
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
                    setMainColor(e.target.value);
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
                  onChange={e => setBottomColor(e.target.value)}
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

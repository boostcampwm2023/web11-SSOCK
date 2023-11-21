import { useState, useRef } from 'react';
import { Button, StepButton } from '../../../components';
import theme from '../../../utils/theme';
import styled from 'styled-components';
import { Msg } from '../../../components';

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
  background-color: ${(props) => props.color};
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
const StyledButtonBox = styled.div`

`;

const SelectDecoBox = styled.div<{ prevstep?: string; nextstep?: string}>`
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 100%;
  height: 200px;
  background-color: rgba(236, 236, 236, 0.5);
  align-items: center;
  justify-content: center;
  gap: 18px;

  left: ${( props ) => (props.prevstep === "false" ? '0' : '-100%')};
  right: ${( props ) => (props.nextstep === "false" ? '0' : '-100%')};
  transition: left 1s ease;
  transition: right 1s ease;
`;

const DecoBox = styled.div`
  border-radius: 50%;
  border: 3px solid white;
  background-color: ${theme.colors['--black-primary']};
  width: 100px;
  height: 100px;
  cursor : pointer;

`;

const MsgBox = styled.div`
  position: absolute;
  top : 20%;
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
  const [prevStep, setPrevStep] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  const decoColor = useRef<string | null>(null);
  const decoId = useRef<string | null>(null);

  const renderStateBoxes = () => {
    const boxes = [];
    for (let i = 0; i <= step; i++) {
      const progressColor = theme.colors['--primary-green-primary']; // Progress color
      boxes.push(
        <StateBox
          key={i}
          color={progressColor}
        ></StateBox>
      );
    }
    for (let i = step + 1; i < 3; i++) {
      const progressColor = theme.colors['--primary-red-primary']; // Progress color
      boxes.push(
        <StateBox
          key={i}
          color={progressColor}
        ></StateBox>
      );
    }
    return boxes;
  };

  return (
    <>
    { step === 3 ? null :
      <StateBar>
        {renderStateBoxes()}
      </StateBar>
    }
    
      <StyledButtonWrap>
        <StyledButtonBox>
      { step <= 0 ? null : <StepButton
        text="< 이전"
        step="decrease"
        color={theme.colors['--primary-red-primary']}
        view={[step, setStep]}
        visible={[prevStep, setPrevStep]}
        disabled={false}
      />}
      </StyledButtonBox>
      
      <StyledButtonBox>
        { step >= 3 ? null :
      <StepButton
        text="다음 >"
        step="increase"
        color={theme.colors['--primary-red-primary']}
        view={[step, setStep]}
        visible={[nextStep, setNextStep]}
        disabled={false}
      /> }
      </StyledButtonBox>
      </StyledButtonWrap>
      
      { step === 0 ? 
      <SelectDecoBox prevstep={prevStep.toString()} nextstep={nextStep.toString()}>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
      </SelectDecoBox>
      : null }

      { step === 1 ?
      <SelectDecoBox prevstep={prevStep.toString()} nextstep={nextStep.toString()}>
        <input type="color" onChange={(e) => {decoColor.current = e.target.value}}/>
        </SelectDecoBox>
        : null }
      
      { step === 2 ? 
      <SelectDecoBox prevstep={prevStep.toString()} nextstep={nextStep.toString()}>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
        <DecoBox></DecoBox>
      </SelectDecoBox>
      : null }

      { step === 3 ?
      <MsgBox>
      <Msg
      key={1}
      color={decoColor.current!}
      isInput={true}
      content={""}
      sender={""}
      />
      </MsgBox>
      : null}

      { step === 3 ?
      <ButtonBox>
      <Button
      text="선물하기"
      color={theme.colors['--primary-red-primary']}
      view={[null, null]}
      />
      </ButtonBox>
       : null}
    </>
  );
};

export default Steps;

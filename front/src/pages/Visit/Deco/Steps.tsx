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
  background-color: ${theme.colors['--primary-red-primary']};
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
`;

// 한번 더 감싸자
const StyledButtonBox = styled.div`

`;

const SelectDecoBox = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 100%;
  height: 200px;
  background-color: rgba(236, 236, 236, 0.5);
  align-items: center;
  justify-content: center;
  gap: 18px;

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

const Steps = () => {
  const [step, setStep] = useState(0);

  const decoColor = useRef<string | null>(null);
  const decoId = useRef<string | null>(null);

  return (
    <>
    { step === 3 ? null :
      <StateBar>
        <StateBox></StateBox>
        <StateBox></StateBox>
        <StateBox></StateBox>
      </StateBar>
    }
    
      <StyledButtonWrap>
        <StyledButtonBox>
      { step <= 0 ? null : <StepButton
        text="< 이전"
        step="decrease"
        color={theme.colors['--primary-red-primary']}
        view={[step, setStep]}
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
        disabled={false}
      /> }
      </StyledButtonBox>
      </StyledButtonWrap>
      
      { step === 0 ? 
      <SelectDecoBox>
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
      <SelectDecoBox>
        <input type="color" onChange={(e) => {decoColor.current = e.target.value}}/>
        </SelectDecoBox>
        : null }
      
      { step === 2 ? 
      <SelectDecoBox>
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
      <Button
      text="선물하기"
      color={theme.colors['--primary-red-primary']}
      view={null, null}
      /> : null}
    </>
  );
};

export default Steps;

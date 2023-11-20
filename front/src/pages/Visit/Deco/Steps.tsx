import { useState, useRef } from 'react';
import { StepButton } from '../../../components';
import theme from '../../../utils/theme';
import styled from 'styled-components';

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
const StyledButtonBox = styled.div``;

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

`;

const Steps = () => {
  const [step, setStep] = useState(0);

  const decoColor = useRef<string | null>(null);
  const decoId = useRef<string | null>(null);

  return (
    <>
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
      <StepButton
        text="다음 >"
        step="increase"
        color={theme.colors['--primary-red-primary']}
        view={[step, setStep]}
        disabled={false}
      />
      </StyledButtonBox>
      </StyledButtonWrap>
      

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



    </>
  );
};

export default Steps;

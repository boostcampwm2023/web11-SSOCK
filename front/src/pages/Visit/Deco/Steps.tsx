import { useState, useRef } from 'react';
import { StepButton } from '../../../components';
import theme from '../../../utils/theme';
import styled from 'styled-components';

const StyledButtonBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 300px;
  display: flex;
  gap: 4px;
  padding: 36px;
  align-items: center;
  margin: auto;
`;

const Prev = styled(StyledButtonBox)`
  left: 0%;
`;

const Next = styled(StyledButtonBox)`

`;

const Steps = () => {
  const [step, setStep] = useState(0);

  const decoColor = useRef<string | null>(null);
  const decoId = useRef<string | null>(null);

  return (
    <>
    <Prev>
      { step <= 0 ? null : <StepButton
        text="< 이전"
        step="decrease"
        color={theme.colors['--primary-red-primary']}
        view={[step, setStep]}
        disabled={false}
      />}
      </Prev>
      <Next>
      <StepButton
        text="다음 >"
        step="increase"
        color={theme.colors['--primary-red-primary']}
        view={[step, setStep]}
        disabled={false}
      />
      </Next>



    </>
  );
};

export default Steps;

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { LongButton } from '@utils';
import { MakeDecoRecoil } from '@states';

interface ButtonColor {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  step: 'increase' | 'decrease' | 'doneIncrease' | 'doneDecrease';
  view: [number, React.Dispatch<React.SetStateAction<number>>];
  disabled?: boolean;
}

const StyledButton = styled(LongButton)<ButtonColor>`
  background-color: ${props => props.color};
  border-radius: 3.125rem;
  width: auto;
  z-index: 100;
`;

const StepButton = (props: ButtonProps) => {
  const { snowballName } = useRecoilValue(MakeDecoRecoil);

  const ClickStep = () => {
    if (props.step === 'increase') {
      props.view[1](props.view[0] + 1);
    } else if (props.step === 'decrease') {
      props.view[1](props.view[0] - 1);
    } else {
      props.step === 'doneDecrease'
        ? props.view[1](-404)
        : snowballName === 'default'
          ? props.view[1](404)
          : props.view[1](200);
    }
  };

  return (
    <StyledButton
      color={props.color}
      onClick={ClickStep}
      disabled={props.disabled}
    >
      {props.text}
    </StyledButton>
  );
};

export default StepButton;

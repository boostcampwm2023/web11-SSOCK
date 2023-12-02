import { useContext } from 'react';
import styled from 'styled-components';
import { LongButton } from '../../utils';
import { DecoContext } from '../../pages/Make/Snowball/MainDeco/DecoProvider';

interface ButtonColor {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  step: 'increase' | 'decrease' | 'done';
  view: [number, React.Dispatch<React.SetStateAction<number>>];
  disabled?: boolean;
}

const StyledButton = styled(LongButton)<ButtonColor>`
  background-color: ${props => props.color};
  border-radius: 3.125rem;
  width: auto;
`;

const StepButton = (props: ButtonProps) => {
  const { snowballName } = useContext(DecoContext);

  const ClickStep = () => {
    if (props.step === 'increase') {
      props.view[1](props.view[0] + 1);
    } else if (props.step === 'decrease') {
      props.view[1](props.view[0] - 1);
    } else {
      snowballName === 'default' ? props.view[1](404) : props.view[1](200);
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

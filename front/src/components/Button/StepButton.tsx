import { useContext } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { DecoContext } from '../../pages/Make/MainDeco/DecoProvider';

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

const StyledButton = styled.button<ButtonColor>`
  background-color: ${props => props.color};
  font: ${theme.font['--normal-button-font']};
  border-radius: 50px;
  height: 3rem;
  padding: 0.625rem;
  margin: 0.25rem;
  color: white;
  border: 1px solid ${theme.colors['--white-primary']};
  cursor: pointer;
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

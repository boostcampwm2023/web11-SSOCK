import styled from 'styled-components';
import theme from '../../utils/theme';

interface ButtonColor {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  step: string;
  view: [number, React.Dispatch<React.SetStateAction<number>>];
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonColor>`
  background-color: ${props => props.color};
  font: ${theme.font['--normal-button-font']};
  border-radius: 50px;
  width: 16%;
  height: 48px;
  padding: 10px;
  margin: 4px;
  color: white;
  border: 1px solid ${theme.colors['--white-primary']};
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 10px;
    width: 16%;
  }
`;




const StepButton = (props: ButtonProps) => {

  const ClickStep = () => {
    if (props.step === 'increase') {
      props.view[1](props.view[0] + 1);
    } else if (props.step === 'decrease') {
      props.view[1](props.view[0] - 1);
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

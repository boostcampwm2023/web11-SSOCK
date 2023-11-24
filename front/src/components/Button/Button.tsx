import styled from 'styled-components';
import theme from '../../utils/theme';

interface ButtonColor {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonColor>`
  background-color: ${props => props.color};
  font: ${theme.font['--normal-button-font']};
  border-radius: 10px;
  width: 66.6667%;
  height: 3rem;
  padding: 0.625rem;
  margin: 0.25rem;
  color: white;
  border: 1px solid ${theme.colors['--white-primary']};
`;

const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      color={props.color}
      onClick={() => props.view[1](!props.view[0])}
      disabled={props.disabled}
    >
      {props.text}
    </StyledButton>
  );
};

export default Button;

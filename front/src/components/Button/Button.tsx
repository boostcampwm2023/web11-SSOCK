import theme from '../../utils/theme';
import styled from 'styled-components';

interface ButtonColor {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
}

const StyledButton = styled.button<ButtonColor>`
  background-color: ${props => props.color};
  font: ${theme.font['--normal-button-font']};
  border-radius: 999px;
  width: 66.6667%;
  height: 48px;
  padding: 10px;
  margin: 4px;
  color: white;
  border: 1px solid white;

  @media (min-width: ${theme.size.maxWidth}) {
    width: 600px;
  }
`;

const Button = (props: ButtonProps) => {
  return <StyledButton color={props.color}>{props.text}</StyledButton>;
};

export default Button;

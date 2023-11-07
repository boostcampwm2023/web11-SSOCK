import { ButtonColor, ButtonProps } from '../../utils/utils';
import theme from '../../utils/theme';
import styled from 'styled-components';

const StyledButton = styled.button<ButtonColor>`
  background-color: ${props =>
    props.color === 'red'
      ? theme.colors.primaryRedPrimary
      : theme.colors.primaryGreenPrimary};
  font-family: 'YUniverse-B';
  font-size: 18px;
  line-height: 150%;
  border-radius: 999px;
  width: 66.6667%;
  height: 48px;
  padding: 10px;
  margin: 4px;
  color: white;

  @media (min-width: ${theme.size.maxWidth}) {
    width: 600px;
  }
`;

const Button = (props: ButtonProps) => {
  return <StyledButton color={props.color}>{props.text}</StyledButton>;
};

export default Button;

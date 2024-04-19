import styled from 'styled-components';
import { LongButton } from '@utils';

interface ButtonColor {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  disabled?: boolean;
  callback?: () => void; // temp
}

const StyledButton = styled(LongButton)<ButtonColor>`
  background-color: ${props => props.color};
`;

const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      color={props.color}
      onClick={
        props.callback === undefined
          ? () => props.view[1](!props.view[0])
          : props.callback // temp
      }
      disabled={props.disabled}
    >
      {props.text}
    </StyledButton>
  );
};

export default Button;

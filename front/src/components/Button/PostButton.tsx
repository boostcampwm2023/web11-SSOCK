import styled from 'styled-components';
import theme from '../../utils/theme';

interface ButtonColor {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonColor>`
  background-color: ${props => props.color};
  font: ${theme.font['--normal-button-font']};
  border-radius: 10px;
  width: 66.6667%;
  height: 48px;
  padding: 10px;
  margin: 4px;
  color: white;
  border: 1px solid ${theme.colors['--white-primary']};

  @media (min-width: ${theme.size.maxWidth}) {
    width: 600px;
  }
`;

const PostButton = (props: ButtonProps) => {

  const ClickedPost = () => {
    props.view[1](!props.view[0]);
    props.visible[1](-1);
  };

  return (
    <StyledButton
      color={props.color}
      onClick={ClickedPost}
      disabled={props.disabled}
    >
      {props.text}
    </StyledButton>
  );
};

export default PostButton;

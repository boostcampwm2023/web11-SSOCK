import styled from 'styled-components';
import theme from '../../../utils/theme';
import { useContext, useState } from 'react';
import { DecoContext } from './DecoProvider';
import { SnowBallContext } from '../SnowBallProvider';
import axios from 'axios';

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
}

type ColorProps = Pick<ButtonProps, 'color'>;

const StyledButton = styled.button<ColorProps>`
  background-color: ${props => props.color};
  font: ${theme.font['--normal-button-font']};
  border-radius: 10px;
  width: 66.6667%;
  height: 3rem;
  padding: 0.625rem;
  margin: 0.25rem;
  color: white;
  border: 1px solid ${theme.colors['--white-primary']};

  @media (min-width: ${theme.size.maxWidth}) {
    width: 600px;
  }
`;

const PostButtonWrap = styled.div`
  width: 100%;
`;

const StyledAlert = styled.div`
  color: ${theme.colors['--white-primary']};
  padding-bottom: 1rem;
  font: ${theme.font['--normal-introduce-font']};
`;

const PostButton = (props: ButtonProps) => {
  const { color, decoID, letterID, content, sender } = useContext(DecoContext);
  const { userData, snowBallData } = useContext(SnowBallContext);

  const [alert, setAlert] = useState(false);

  const ClickedPost = () => {
    //여기서 axios요청
    if (content === '' || sender === '') {
      setAlert(true);
      return;
    }
    const a = {
      sender,
      content,
      decoration_id: decoID,
      decoration_color: color,
      location: 3,
      letter_id: letterID
    };
    console.log(a);
    axios
      .post(`/api/message/${userData.id}/${snowBallData.id}`, a)
      .then(res => {
        console.log(res, 'post DONE!!!');
      })
      .catch(e => console.error(e));

    props.view[1](!props.view[0]);
    props.visible[1](-1);
  };

  return (
    <>
      <PostButtonWrap>
        {alert ? <StyledAlert>내용과 이름을 입력해주세요 !</StyledAlert> : null}
        <StyledButton color={props.color} onClick={ClickedPost}>
          {props.text}
        </StyledButton>
      </PostButtonWrap>
    </>
  );
};

export default PostButton;

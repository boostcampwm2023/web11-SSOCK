import styled from 'styled-components';
import theme from '../../utils/theme';
import { useContext, useState } from 'react';
import { DecoContext } from '../../pages/Visit/Deco/DecoProvider';
import { SnowBallContext } from '../../pages/Visit/SnowBallProvider';

interface PostButtonProps {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
}

const StyledButton = styled.button<PostButtonProps>`
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

const PostButtonWrap = styled.div``;

const StyledAlert = styled.div`
  color: ${theme.colors['--white-primary']};
  padding-bottom: 1rem;
  font: ${theme.font['--normal-introduce-font']};
`;

const PostButton = (props: ButtonProps) => {
  const { color, decoID, letterID, content, sender } = useContext(DecoContext);
  const { data, setData } = useContext(SnowBallContext);

  const [ alert, setAlert ] = useState(false);


  const ClickedPost = () => {
    if (content === '' || sender === '') {
      setAlert(true);
      return ;
    };

    props.view[1](!props.view[0]);
    props.visible[1](-1);
    const newData = data;
    newData.snowball[0].message.push({
      message_id: 0,
      deco_id: decoID,
      deco_color: color,
      content: content,
      sender: sender,
      created_at: '2023-11-11',
      letter_id: letterID
    });
    setData(newData);
  };

  return (
    <>
    <PostButtonWrap>
    { alert ? (<StyledAlert>내용과 이름을 입력해주세요 !</StyledAlert>) : null}
    <StyledButton
      color={props.color}
      onClick={ClickedPost}
    >
      {props.text}
    </StyledButton>
    </PostButtonWrap>
    </>
  );
};

export default PostButton;

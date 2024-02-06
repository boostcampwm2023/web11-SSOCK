import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { LongButton, axios } from '@utils';
import { useNav } from '@hooks';
import { SnowBallRecoil, VisitDecoRecoil } from '@states';

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
}

type ColorProps = Pick<ButtonProps, 'color'>;

const StyledButton = styled(LongButton)<ColorProps>`
  background-color: ${props => props.color};
`;

const PostButtonWrap = styled.div`
  width: 100%;
`;

const StyledAlert = styled.div`
  color: ${props => props.theme.colors['--white-primary']};
  padding-bottom: 1rem;
  font: ${props => props.theme.font['--normal-introduce-font']};
`;

const ToastMsg = styled.div`
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${props => props.theme.font['--normal-button-font']};
  background-color: ${props => props.theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
`;

const PostButton = (props: ButtonProps) => {
  const navigate = useNav();
  const { user } = useParams();
  const [alerts, setAlerts] = useState(false);
  const [toast, setToast] = useState(false);
  const ButtonRef = useRef<HTMLButtonElement>(null);

  const { decoID, color, letterID, content, sender } =
    useRecoilValue(VisitDecoRecoil);
  const { snowBallData } = useRecoilValue(SnowBallRecoil);

  const ClickedPost = () => {
    if (content === '' || sender === '') {
      setAlerts(true);

      if (content === '')
        document.getElementById('textarea')!.style.border = '1px solid white';
      if (sender === '')
        document.getElementById('fromInput')!.style.border = '1px solid white';
      return;
    }

    document.getElementById('textarea')!.style.border = 'none';
    document.getElementById('fromInput')!.style.border = 'none';

    const msgInfo = {
      sender,
      content,
      decoration_id: decoID,
      decoration_color: color,
      letter_id: letterID
    };

    axios
      .post(`/api/message/${user}/${snowBallData.id}`, msgInfo)
      .then(() => {
        axios.get(`/api/snowball/${snowBallData.id}`).then(() => {
          props.view[1](!props.view[0]);
          props.visible[1](-1);
        });
      })
      .catch(() => {
        setToast(true);
        ButtonRef.current!.disabled = true;
        ButtonRef.current!.style.setProperty('opacity', '0.5');
        setTimeout(() => {
          navigate('../');
        }, 1500);
      });
  };

  return (
    <>
      {toast ? (
        <>
          <ToastMsg>
            <p>메시지가 꽉찼어요</p>
            <p>다른 스노우볼을 선택해주세요!</p>
            <p>작성중인 메시지는 유지됩니다!</p>
          </ToastMsg>
        </>
      ) : null}

      <PostButtonWrap>
        {alerts ? (
          <StyledAlert>내용과 이름을 입력해주세요 !</StyledAlert>
        ) : null}
        <StyledButton ref={ButtonRef} color={props.color} onClick={ClickedPost}>
          {props.text}
        </StyledButton>
      </PostButtonWrap>
    </>
  );
};

export default PostButton;

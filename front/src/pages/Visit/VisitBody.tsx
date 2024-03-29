import { useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { axios } from '@utils';
import {
  Message,
  MessageListRecoil,
  MessageRecoil,
  SnowBall,
  SnowBallRecoil
} from '@states';
import { Msg } from '@components';

const LeftBtn = styled.img`
  position: fixed;
  top: 50%;
  height: 4rem;
`;

const RightBtn = styled(LeftBtn)`
  right: 0;
`;

const moveSnowball = async (
  move: 'Prev' | 'Next',
  { userData, snowBallData }: SnowBall,
  setSnowBallBox: React.Dispatch<React.SetStateAction<SnowBall>>,
  setMessageListData: React.Dispatch<React.SetStateAction<Array<Message>>>,
  navigate: NavigateFunction
) => {
  const nowSnowBallID = userData.snowball_list.findIndex(
    id => id === snowBallData.id
  );

  if (nowSnowBallID === undefined) {
    throw '알수없는 snowballID입니다.';
  }

  const nextIdx = move === 'Prev' ? userData.snowball_count - 1 : 1;
  const nextSnowBallID =
    userData.snowball_list[(nowSnowBallID + nextIdx) % userData.snowball_count];

  try {
    const response = await axios(`/api/snowball/${nextSnowBallID}`);
    if (response.data.is_message_private === true) {
      const messageList = response.data.message_list as Array<Message>;
      const privateMessageList = messageList.map(message => {
        const privateMessage = {
          ...message
        };

        privateMessage.content = '비공개 메시지 입니다.';
        privateMessage.sender = '비공개';
        return privateMessage;
      });
      setMessageListData(privateMessageList);
    } else {
      setMessageListData(response.data.message_list as Array<Message>);
    }

    setSnowBallBox(prev => ({ ...prev, snowBallData: response.data }));
  } catch (error) {
    console.log(error);
    navigate('*');
  }
};

const VisitBody = () => {
  const navigate = useNavigate();
  const { message, sender, color } = useRecoilValue(MessageRecoil);
  const setMessageList = useSetRecoilState(MessageListRecoil);
  const [{ userData, snowBallData }, setSnowBallBox] =
    useRecoilState(SnowBallRecoil);

  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);

  const delayButton = () => {
    if (leftArrowRef.current && rightArrowRef.current) {
      leftArrowRef.current.style.pointerEvents = 'none';
      rightArrowRef.current.style.pointerEvents = 'none';
      leftArrowRef.current.style.animation = 'fadeOut 0.5s forwards';
      rightArrowRef.current.style.animation = 'fadeOut 0.5s forwards';

      setTimeout(() => {
        leftArrowRef.current!.style.pointerEvents = 'all';
        rightArrowRef.current!.style.pointerEvents = 'all';
        leftArrowRef.current!.style.animation = 'fadeIn 0.5s forwards';
        rightArrowRef.current!.style.animation = 'fadeIn 0.5s forwards';
      }, 1500);
    }
  };

  return (
    <>
      {message !== '' ? (
        <Msg
          color={color}
          isInput={false}
          content={message}
          sender={sender}
          to={userData.nickname}
          isDeco={false}
        />
      ) : null}

      {userData.snowball_list.length > 1 ? (
        <>
          <LeftBtn
            src={'/icons/prev.svg'}
            onClick={() => {
              moveSnowball(
                'Prev',
                { userData, snowBallData },
                setSnowBallBox,
                setMessageList,
                navigate
              );
              delayButton();
            }}
            ref={leftArrowRef}
          />

          <RightBtn
            src={'/icons/next.svg'}
            onClick={() => {
              moveSnowball(
                'Next',
                { userData, snowBallData },
                setSnowBallBox,
                setMessageList,
                navigate
              );
              delayButton();
            }}
            ref={rightArrowRef}
          />
        </>
      ) : null}
    </>
  );
};

export default VisitBody;

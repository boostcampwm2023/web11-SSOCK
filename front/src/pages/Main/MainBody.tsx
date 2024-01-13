import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { axios } from '@utils';
import {
  Message,
  SnowBall,
  MessageRecoil,
  MessageListRecoil,
  SnowBallRecoil
} from '@states';
import { Msg } from '@components';

interface MainBodyProps {
  animation: boolean;
}

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const LeftBtn = styled.img``;

const RightBtn = styled(LeftBtn)``;

const Container = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn 1s forwards;
`;

const ArrowLeft = styled.div`
  width: 100%;
  display: flex;
  padding-left: 0.5rem;
`;

const ArrowRight = styled(ArrowLeft)`
  justify-content: flex-end;
  padding-right: 0.5rem;
`;

const MainBody = (props: MainBodyProps): JSX.Element => {
  const { message, sender, color, messageID } = useRecoilValue(MessageRecoil);
  const [messageList, setMessageList] = useRecoilState(MessageListRecoil);
  const [{ snowBallData, userData }, setSnowBallBox] =
    useRecoilState(SnowBallRecoil);

  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);
  const BodyRef = useRef<HTMLDivElement>(null);

  const delayButton = () => {
    if (leftArrowRef.current && rightArrowRef.current) {
      leftArrowRef.current.style.pointerEvents = 'none';
      rightArrowRef.current.style.pointerEvents = 'none';
      leftArrowRef.current.style.animation = 'fadeOut 0.5s forwards';
      rightArrowRef.current.style.animation = 'fadeOut 0.5s forwards';

      setTimeout(() => {
        if (leftArrowRef.current && rightArrowRef.current) {
          leftArrowRef.current.style.pointerEvents = 'all';
          rightArrowRef.current.style.pointerEvents = 'all';
          leftArrowRef.current!.style.animation = 'fadeIn 0.5s forwards';
          rightArrowRef.current!.style.animation = 'fadeIn 0.5s forwards';
        }
      }, 1500);
    }
  };

  useEffect(() => {
    if (props.animation) {
      BodyRef.current?.setAttribute('style', 'animation: fadeOut 1s forwards');
    }
  }, [props.animation]);

  const moveSnowball = (
    move: 'Prev' | 'Next',
    { userData, snowBallData }: SnowBall,
    setSnowBallBox: React.Dispatch<React.SetStateAction<SnowBall>>,
    setMessageListData: React.Dispatch<React.SetStateAction<Array<Message>>>
  ) => {
    const nowSnowBallID = userData.snowball_list.findIndex(
      id => id === snowBallData.id
    );

    if (nowSnowBallID === undefined) {
      throw '알수없는 snowballID입니다.';
    }

    const nextIdx = move === 'Prev' ? userData.snowball_count - 1 : 1;
    const nextSnowBallID =
      userData.snowball_list[
        (nowSnowBallID + nextIdx) % userData.snowball_count
      ];

    axios(`/api/snowball/${nextSnowBallID}`).then(res => {
      setSnowBallBox(prev => ({ ...prev, snowBallData: res.data }));
      setMessageListData(res.data.message_list);
    });
  };

  useEffect(() => {
    if (messageID === 0) {
      return;
    }

    const nowMsg = messageList.find(message => message.id === messageID);
    if (nowMsg === undefined || nowMsg.opened !== null) {
      return;
    }

    axios.put(`/api/message/${messageID}/open`).then(() => {
      const newList = JSON.parse(JSON.stringify(messageList)) as Array<Message>;
      const nowMessage = newList.find(message => message.id === messageID);
      nowMessage ? (nowMessage.opened = 'opened') : null;
      setMessageList(newList);
    });
  }, [messageID]);

  return (
    <Container key="MainBody" ref={BodyRef}>
      {userData.snowball_list.length > 1 ? (
        <>
          <ArrowLeft>
            <LeftBtn
              src={'/icons/prev.svg'}
              onClick={() => {
                moveSnowball(
                  'Prev',
                  { userData, snowBallData },
                  setSnowBallBox,
                  setMessageList
                );
                delayButton();
              }}
              ref={leftArrowRef}
            />
          </ArrowLeft>

          <ArrowRight>
            <RightBtn
              src={'/icons/next.svg'}
              onClick={() => {
                moveSnowball(
                  'Next',
                  { userData, snowBallData },
                  setSnowBallBox,
                  setMessageList
                );
                delayButton();
              }}
              ref={rightArrowRef}
            />
          </ArrowRight>
        </>
      ) : null}

      <MsgContainer>
        {message !== '' ? (
          <Msg
            color={color}
            isInput={false}
            sender={sender}
            content={message}
            to={userData.nickname}
            isDeco={false}
          />
        ) : null}
      </MsgContainer>
    </Container>
  );
};

export default MainBody;

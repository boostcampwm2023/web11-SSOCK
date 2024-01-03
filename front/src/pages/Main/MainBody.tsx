import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { axios } from '@utils';
import { Msg } from '@components';
import { MessageListContext, Message } from '@pages/Visit/MessageListProvider';
import { MessageContext } from '../Visit/MessageProvider';
import {
  SnowBallContext,
  UserData,
  SnowBallData
} from '@pages/Visit/SnowBallProvider';

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const LeftBtn = styled.img`
  position: fixed;
  top: 50%;
  height: 4rem;
`;

const RightBtn = styled(LeftBtn)`
  right: 0;
`;

const MainBody = (): JSX.Element => {
  const { message, sender, color, messageID } = useContext(MessageContext);
  const { userData, snowBallData, setSnowBallData } =
    useContext(SnowBallContext);
  const { messageList, setMessageList } = useContext(MessageListContext);

  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);

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

  const moveSnowball = (
    move: 'Prev' | 'Next',
    userData: UserData,
    snowBallData: SnowBallData,
    setSnowBallData: React.Dispatch<React.SetStateAction<SnowBallData>>,
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
      setSnowBallData(res.data as SnowBallData);
      setMessageListData(res.data.message_list as Array<Message>);
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
    <>
      {userData.snowball_list.length > 1 ? (
        <>
          <LeftBtn
            src={'/icons/prev.svg'}
            onClick={() => {
              moveSnowball(
                'Prev',
                userData,
                snowBallData,
                setSnowBallData,
                setMessageList
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
                userData,
                snowBallData,
                setSnowBallData,
                setMessageList
              );
              delayButton();
            }}
            ref={rightArrowRef}
          />
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
    </>
  );
};

export default MainBody;

// <MainButtonBox
//   leftArrow={leftArrowRef}
//   rightArrow={rightArrowRef}
// />

// <MainBody />
// <EmptyDiv />

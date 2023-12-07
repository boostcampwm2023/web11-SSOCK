import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Msg } from '@components';
import { MessageListContext, Message } from '@pages/Visit/MessageListProvider';
import { MessageContext } from '../Visit/MessageProvider';
import { SnowBallContext } from '../Visit/SnowBallProvider';

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const MainBody = (): JSX.Element => {
  const { message, sender, color, messageID } = useContext(MessageContext);
  const { userData } = useContext(SnowBallContext);
  const { messageList, setMessageList } = useContext(MessageListContext);
  useEffect(() => {
    //자 일단 요청보내고 응답 정상이라고 치자 여기서
    console.log(messageID);
    const newList = JSON.parse(JSON.stringify(messageList)) as Array<Message>;
    const nowMessage = newList.find(message => message.id === messageID);
    if (nowMessage) {
      nowMessage.opened = 'opened';
    }
    setMessageList(newList);
  }, [messageID]);

  return (
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
  );
};

export default MainBody;

import { useContext, useEffect } from 'react';
import axios from '@utils/axios';
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

import { useContext, useEffect } from 'react';
import axios from 'axios';
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
    // 네엡 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
    //ㅋㅋ메시지 오픈 api 못하겠으믄 쉬고있어 농담임 ㅋ

    axios.put(`/api/message/${messageID}/open`).then(res => {
      console.log(res);

      const newList = JSON.parse(JSON.stringify(messageList)) as Array<Message>;
      const nowMessage = newList.find(message => message.id === messageID);
      if (nowMessage) {
        nowMessage.opened = 'opened';
      }
      setMessageList(newList);
    }); // 프리티어 필수~!~!~!~~~!~!~!~!~!~!~!~!~!~!~!~
    // if (nowMessage) {
    //   nowMessage.opened = 'opened';
    // }
    // setMessageList(newList);
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

import { useContext } from 'react';
import { getDecoPoisition } from '@utils';
import * as Models from './models';
import { MessageListContext } from '@pages/Visit/MessageListProvider';

const Decos = () => {
  const { messageList } = useContext(MessageListContext);
  const decos = messageList.map((message, index) => (
    <Models.Deco
      key={index}
      id={message.decoration_id}
      scale={1}
      position={getDecoPoisition(message.location)}
      message={message.content ?? '비공개메시지입니다'}
      color={message.decoration_color}
      sender={message.sender ?? '비공개'}
      letterID={message.letter_id ?? 0}
      messageID={message.id}
      isOpened={message.opened !== null}
    />
  ));
  return <>{decos}</>;
};

export default Decos;

import { useContext } from 'react';
import { getDecoPosition } from '@utils';
import * as Models from './models';
import { MessageListContext } from '@pages/Visit/MessageListProvider';
import { Vector3 } from 'three';

interface DecosProps {
  centerPosition: Vector3;
  radius: number;
}

const Decos = ({ centerPosition, radius }: DecosProps) => {
  const { messageList } = useContext(MessageListContext);

  const decos = messageList.map((message, index) => (
    <Models.Deco
      key={index}
      id={message.decoration_id}
      scale={1}
      position={getDecoPosition(message.location)}
      message={message.content ?? '비공개 메시지 입니다.'}
      color={message.decoration_color}
      sender={message.sender ?? '비공개'}
      letterID={message.letter_id ?? 0}
      messageID={message.id}
      isOpened={message.opened !== null}
    />
  ));

  const emojis = messageList.map((message, index) => (
    <Models.Emoji
      key={index}
      centerPosition={centerPosition}
      rangeRadius={radius}
      sentiment={message.sentiment}
      confidence={message.confidence}
    />
  ));

  return (
    <>
      {decos}
      {emojis}
    </>
  );
};

export default Decos;

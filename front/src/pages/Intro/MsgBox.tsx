import { useContext } from 'react';
import { Msg } from '@components';
import { MessageContext } from '../Visit/MessageProvider';
import { SnowBallContext } from '../Visit/SnowBallProvider';

const MsgBox = () => {
  const { message, sender, color } = useContext(MessageContext); // message가 '' 비어있지 않을때
  const { userData } = useContext(SnowBallContext);
  return (
    <>
      {message !== '' ? (
        <Msg
          color={color}
          isInput={false}
          content={message}
          sender={sender}
          to={userData.nickname}
        />
      ) : null}
    </>
  );
};

export default MsgBox;

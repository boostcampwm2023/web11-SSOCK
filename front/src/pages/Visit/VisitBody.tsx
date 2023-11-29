import { useContext } from 'react';
import { MessageContext } from './MessageProvider';
import { Msg } from '../../components';
import { SnowBallContext } from './SnowBallProvider';

const VisitBody = () => {
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

export default VisitBody;

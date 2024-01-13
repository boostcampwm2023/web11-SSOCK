import { useRecoilValue } from 'recoil';
import { Msg } from '@components';
import { MessageRecoil, SnowBallRecoil } from '@states';

const MsgBox = () => {
  const { message, sender, color } = useRecoilValue(MessageRecoil); // message가 '' 비어있지 않을때
  const { userData } = useRecoilValue(SnowBallRecoil);
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
    </>
  );
};

export default MsgBox;

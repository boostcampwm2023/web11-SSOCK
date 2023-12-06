import { useContext } from 'react';
import styled from 'styled-components';
import { Msg } from '@components';
import { MessageContext } from '../Visit/MessageProvider';
import { SnowBallContext } from '../Visit/SnowBallProvider';

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const MainBody = (): JSX.Element => {
  const { message, sender, color } = useContext(MessageContext);
  const { userData } = useContext(SnowBallContext);

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

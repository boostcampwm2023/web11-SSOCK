import { useContext } from 'react';
import { Msg } from '../../components';
import { MessageContext } from './MessageProvider';
import { SnowBallContext } from './SnowBallProvider';
import styled from 'styled-components';

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const VisitBody = () => {
  const { message, sender, color } = useContext(MessageContext); // message가 '' 비어있지 않을때
  const { userData } = useContext(SnowBallContext);
  return (
    <MsgContainer>
      {message !== '' ? (
        <Msg
          color={color}
          isInput={false}
          content={message}
          sender={sender}
          to={userData.nickname}
        />
      ) : null}
    </MsgContainer>
  );
};

export default VisitBody;

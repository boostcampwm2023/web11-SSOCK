import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ListMsg, Prev } from '@components';
import { MSG_COLOR } from '@constants';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';

interface ListMsgProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MsgResponse {
  user_id: number;
  snowball_id: number;
  location: number;
  content: string;
  sender: string;
  to: string;
  created: string;
  decoration_id: number;
  decoration_color: string;
  id: number;
  is_deleted: boolean;
  opened: string;
  letter_id: number;
}

const StyledList = styled.div`
  pointer-events: auto;
  position: absolute;
  width: 100%;
  top: 10%;
  height: 85%;
  overflow-y: scroll;
`;

const StyledListWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ListMsgs = (props: ListMsgProps) => {
  const [messages, setMessages] = useState<Array<MsgResponse>>([]);
  const { userData } = useContext(SnowBallContext);

  useEffect(() => {
    axios.get('/api/message').then(res => {
      if (res.data.length !== 0) setMessages(res.data);
      else props.set(false);
    });
  }, [userData]);

  return (
    <>
      {messages.length > 0 ? (
        <>
          <Prev set={props.set} />
          <StyledList>
            <StyledListWrap>
              {messages.map((msg, idx) => {
                return (
                  <ListMsg
                    key={idx}
                    color={MSG_COLOR[msg.letter_id].color}
                    content={msg.content}
                    sender={msg.sender}
                    to={userData.nickname}
                    messageId={msg.id}
                  />
                );
              })}
            </StyledListWrap>
          </StyledList>
        </>
      ) : null}
    </>
  );
};

export default ListMsgs;

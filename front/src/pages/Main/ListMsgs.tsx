import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ListMsg, Prev } from '../../components';
import { MSG_COLOR } from '../../constants/deco';

interface ListMsgProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
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

const ListMsgs = (props: ListMsgProps) => {
  const [messages, setMessages] = useState<Array<MsgResponse>>([]);

  useEffect(() => {
    axios.get('/api/message').then(res => {
      console.log(res.data);
      setMessages(res.data);
    });
  }, []);

  return (
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
                to={msg.to} // 요게 지금 없음
                messageId={msg.id}
              />
            );
          })}
        </StyledListWrap>
      </StyledList>
    </>
  );
};

export default ListMsgs;

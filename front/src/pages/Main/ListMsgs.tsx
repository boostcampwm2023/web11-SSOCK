import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
// import { axios } from '@utils';
// import { useLogout } from '@hooks';
import { SnowBallRecoil } from '@states';
import { ListMsg, Prev } from '@components';
import { MSG_COLOR } from '@constants';
//temp
import mockData from '@mock';

// removeed axios

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
  sentiment: 'positive' | 'neutral' | 'negative'; // temp
  confidence: number; // temp
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

const ListBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: scroll;

  @media (min-width: ${props => props.theme.size['--desktop-min-width']}) {
    width: ${props => props.theme.size['--desktop-width']};
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ToastMsg = styled.div`
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${props => props.theme.font['--normal-button-font']};
  background-color: ${props => props.theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
`;

const ListMsgs = (props: ListMsgProps) => {
  // const logout = useLogout();
  const [messages, setMessages] = useState<Array<MsgResponse>>([]);
  const [toast] = useState(false);
  const { userData } = useRecoilValue(SnowBallRecoil);

  useEffect(() => {
    // axios
    //   .get('/api/message')
    //   .then(res => {
    //     if (res.data.length !== 0) setMessages(res.data);
    //     else if (res.data.length === 0) {
    //       setToast(true);
    //       setTimeout(() => {
    //         props.set(false);
    //       }, 1500);
    //     }
    //   })
    //   .catch(() => logout());
    setMessages(mockData.snowball_data.message_list as Array<MsgResponse>);
  }, [userData]);

  return (
    <>
      {toast ? <ToastMsg>메세지가 없습니다.</ToastMsg> : null}
      {messages.length > 0
        ? createPortal(
            <ListBackground>
              <Prev set={props.set} />
              <StyledList>
                <StyledListWrap>
                  {messages.map((msg, idx) => {
                    return (
                      <ListMsg
                        key={idx}
                        arr={messages}
                        set={setMessages}
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
            </ListBackground>,
            document.body
          )
        : null}
    </>
  );
};

export default ListMsgs;

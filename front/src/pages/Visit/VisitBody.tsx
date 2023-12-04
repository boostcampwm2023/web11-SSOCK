import { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Msg } from '../../components';
import { MessageContext } from './MessageProvider';
import { SnowBallContext, SnowBallData } from './SnowBallProvider';

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const LeftBtn = styled.button`
  color: white;
  position: fixed;
  left: 0;
`;
const RightBtn = styled.button`
  color: white;
  position: fixed;
  right: 0;
`;

const VisitBody = () => {
  const { message, sender, color } = useContext(MessageContext); // message가 '' 비어있지 않을때
  const { userData, snowBallData, setSnowBallData } =
    useContext(SnowBallContext);
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
      ) : userData.snowball_list.length > 0 ? (
        <>
          <LeftBtn
            onClick={() => {
              const nowSnowBallID = userData.snowball_list.findIndex(
                id => id == snowBallData.id
              );
              if (nowSnowBallID === undefined) {
                throw '알수없는 snowballID입니다.';
              }
              const nextSnowBallID =
                userData.snowball_list[
                  (nowSnowBallID + userData.snowball_count - 1) %
                    userData.snowball_count
                ];
              axios(`/api/snowball/${nextSnowBallID}`)
                .then(res => {
                  setSnowBallData(res.data as SnowBallData);
                })
                .catch(e => {
                  console.error(e);
                });
            }}
          >
            이전
          </LeftBtn>
          <RightBtn
            onClick={() => {
              const nowSnowBallID = userData.snowball_list.findIndex(
                id => id == snowBallData.id
              );
              if (nowSnowBallID === undefined) {
                throw '알수없는 snowballID입니다.';
              }
              const nextSnowBallID =
                userData.snowball_list[
                  (nowSnowBallID + 1) % userData.snowball_count
                ];
              axios(`/api/snowball/${nextSnowBallID}`)
                .then(res => {
                  setSnowBallData(res.data as SnowBallData);
                })
                .catch(e => {
                  console.error(e);
                });
            }}
          >
            다음
          </RightBtn>
        </>
      ) : null}
    </MsgContainer>
  );
};

export default VisitBody;

import { useContext } from 'react';
import { Msg } from '../../components';
import { MessageContext } from './MessageProvider';
import { SnowBallContext, SnowBallData, UserData } from './SnowBallProvider';
import styled from 'styled-components';
import axios from 'axios';

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const Btn = styled.button`
  color: white;
`;

const VisitBody = () => {
  const { message, sender, color } = useContext(MessageContext); // message가 '' 비어있지 않을때
  const { userData, snowBallData, setSnowBallData } =
    useContext(SnowBallContext);
  console.log('------------------------');
  console.log(userData, snowBallData);
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
      {userData.snowball_list.length > 0 ? (
        <>
          <Btn
            onClick={e => {
              const nowSnowBallID = userData.snowball_list.findIndex(
                id => id == snowBallData.id
              );
              if (nowSnowBallID === undefined) {
                throw '알수없는 snowballID입니다.';
              }
              const nextSnowBallID =
                userData.snowball_list[
                  (nowSnowBallID - 1) % userData.snowball_count
                ];
              axios(`/api/snowball/${nextSnowBallID}`)
                .then(res => {
                  console.log('test', res);
                  setSnowBallData(res.data as SnowBallData);
                })
                .catch(e => {
                  console.error(e);
                });
            }}
          >
            이전
          </Btn>
          <Btn
            onClick={e => {
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
                  console.log('test', res);
                  setSnowBallData(res.data as SnowBallData);
                })
                .catch(e => {
                  console.error(e);
                });
            }}
          >
            다음
          </Btn>
        </>
      ) : null}
    </MsgContainer>
  );
};

export default VisitBody;

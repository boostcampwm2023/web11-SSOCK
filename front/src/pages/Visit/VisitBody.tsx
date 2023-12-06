import { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Msg } from '@components';
import { MessageContext } from './MessageProvider';
import { SnowBallContext, SnowBallData, UserData } from './SnowBallProvider';

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const LeftBtn = styled.img`
  position: fixed;
  top: 50%;
  height: 4rem;
`;

const RightBtn = styled(LeftBtn)`
  right: 0;
`;

const moveSnowball = (
  move: 'Prev' | 'Next',
  userData: UserData,
  snowBallData: SnowBallData,
  setSnowBallData: React.Dispatch<React.SetStateAction<SnowBallData>>
) => {
  const nowSnowBallID = userData.snowball_list.findIndex(
    id => id === snowBallData.id
  );

  if (nowSnowBallID === undefined) {
    throw '알수없는 snowballID입니다.';
  }

  const nextIdx = move === 'Prev' ? userData.snowball_count - 1 : 1;
  const nextSnowBallID =
    userData.snowball_list[(nowSnowBallID + nextIdx) % userData.snowball_count];

  axios(`/api/snowball/${nextSnowBallID}`)
    .then(res => {
      setSnowBallData(res.data as SnowBallData);
    })
    .catch(e => {
      console.error(e);
    });
};

const VisitBody = () => {
  const { message, sender, color } = useContext(MessageContext);
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
          isDeco={false}
        />
      ) : userData.snowball_list.length > 1 ? (
        <>
          <LeftBtn
            src={'/icons/prev.svg'}
            onClick={() =>
              moveSnowball('Prev', userData, snowBallData, setSnowBallData)
            }
          />
          <RightBtn
            src={'/icons/next.svg'}
            onClick={() =>
              moveSnowball('Next', userData, snowBallData, setSnowBallData)
            }
          />
        </>
      ) : null}
    </MsgContainer>
  );
};

export default VisitBody;

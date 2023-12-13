import { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { Loading, axios } from '@utils';
import { useLogout } from '@hooks';
import { SnowGlobeCanvas, UIContainer } from '@components';
import MainButtonBox from './MainButtonBox';
import MainBody from './MainBody';
import {
  SnowBallContext,
  UserData,
  SnowBallData
} from '@pages/Visit/SnowBallProvider';
import { MessageListContext, Message } from '@pages/Visit/MessageListProvider';

const LeftBtn = styled.img`
  position: fixed;
  top: 50%;
  height: 4rem;
`;

const RightBtn = styled(LeftBtn)`
  right: 0;
`;

const EmptyDiv = styled.div`
  width: 100%;
  height: 30%;
`;

const moveSnowball = (
  move: 'Prev' | 'Next',
  userData: UserData,
  snowBallData: SnowBallData,
  setSnowBallData: React.Dispatch<React.SetStateAction<SnowBallData>>,
  setMessageListData: React.Dispatch<React.SetStateAction<Array<Message>>>
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

  axios(`/api/snowball/${nextSnowBallID}`).then(res => {
    setSnowBallData(res.data as SnowBallData);
    setMessageListData(res.data.message_list as Array<Message>);
  });
};

const Main = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [cookie] = useCookies(['loggedin']);
  const { setSnowBallData, setUserData, userData, snowBallData } =
    useContext(SnowBallContext);
  const { setMessageList } = useContext(MessageListContext);

  const delayButton = () => {
    if (leftArrowRef.current && rightArrowRef.current) {
      leftArrowRef.current.style.pointerEvents = 'none';
      rightArrowRef.current.style.pointerEvents = 'none';
      leftArrowRef.current.style.animation = 'fadeOut 0.5s forwards';
      rightArrowRef.current.style.animation = 'fadeOut 0.5s forwards';

      setTimeout(() => {
        if (leftArrowRef.current && rightArrowRef.current) {
          leftArrowRef.current.style.pointerEvents = 'all';
          rightArrowRef.current.style.pointerEvents = 'all';
          leftArrowRef.current!.style.animation = 'fadeIn 0.5s forwards';
          rightArrowRef.current!.style.animation = 'fadeIn 0.5s forwards';
        }
      }, 1500);
    }
  };

  useEffect(() => {
    if (!cookie.loggedin) {
      navigate('/');
      return;
    }

    axios
      .get('/api/user', { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          const resUserData = res.data.user as UserData;
          setUserData(resUserData);

          if (res.data.main_snowball === null) {
            navigate('/make/snowball');
            return;
          }

          const resSnowballData = res.data.main_snowball as SnowBallData;
          const messageList = res.data.main_snowball
            .message_list as Array<Message>;
          setSnowBallData(resSnowballData);
          setMessageList(messageList);
          setIsLoading(true);

          if (
            userData.nickname === null ||
            userData.snowball_count === 0 ||
            userData.nickname === 'null'
          ) {
            navigate('/make/nickname');
          }
        }
      })
      .catch(() => logout());
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <SnowGlobeCanvas snowBallData={snowBallData} />
          <UIContainer>
            {userData.snowball_list.length > 1 ? (
              <>
                <LeftBtn
                  src={'/icons/prev.svg'}
                  onClick={() => {
                    moveSnowball(
                      'Prev',
                      userData,
                      snowBallData,
                      setSnowBallData,
                      setMessageList
                    );
                    delayButton();
                  }}
                  ref={leftArrowRef}
                />

                <RightBtn
                  src={'/icons/next.svg'}
                  onClick={() => {
                    moveSnowball(
                      'Next',
                      userData,
                      snowBallData,
                      setSnowBallData,
                      setMessageList
                    );
                    delayButton();
                  }}
                  ref={rightArrowRef}
                />
              </>
            ) : null}

            <MainButtonBox
              leftArrow={leftArrowRef}
              rightArrow={rightArrowRef}
            />

            <MainBody />
            <EmptyDiv />
          </UIContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Main;

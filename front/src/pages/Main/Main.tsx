import { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Loading } from '@utils';
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
import { useCookies } from 'react-cookie';

const MainBodyWrap = styled.div`
  width: 100%;
  height: 100%;
`;

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

  axios(`/api/snowball/${nextSnowBallID}`)
    .then(res => {
      setSnowBallData(res.data as SnowBallData);
      setMessageListData(res.data.message_list as Array<Message>);
    })
    .catch(e => {
      console.error(e);
    });
};

const Main = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { setSnowBallData, setUserData, userData, snowBallData } =
    useContext(SnowBallContext);
  const { setMessageList } = useContext(MessageListContext);
  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cookie] = useCookies(['loggedin']);

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

  const saveCookie = () => {
    const cookieToken = import.meta.env.VITE_APP_COOKIE_TOKEN;
    const cookieName = 'access_token';
    const cookieValue = cookieToken;
    const today = new Date();
    const expire = new Date();
    const secure = true;
    expire.setDate(today.getDate() + 1);
    document.cookie = `${cookieName}=${cookieValue}; expires=${expire.toUTCString()}; secure=${secure}; path=/`;
  };

  useEffect(() => {
    saveCookie();

    if (!cookie.loggedin) {
      navigate('/');
      return;
    }

    axios
      .get('/api/user', {
        withCredentials: true // axios 쿠키 값 전달
      })
      .then(res => {
        if (res.status === 200) {
          const resUserData = res.data.user as UserData;
          setUserData(resUserData);
          console.log('userdata=', resUserData);

          if (res.data.main_snowball === null) {
            navigate('/make');
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
            navigate('/make');
          }
        }
      })
      .catch(e => {
        console.error(e);
        logout;
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <SnowGlobeCanvas snowBallData={snowBallData} />
          <MainBodyWrap>
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
          </MainBodyWrap>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Main;

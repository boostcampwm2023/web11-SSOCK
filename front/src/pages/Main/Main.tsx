import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { Loading, axios } from '@utils';
import { useLogout } from '@hooks';
import { SnowGlobeCanvas, UIContainer } from '@components';

import MainBody from './MainBody';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import {
  SnowBallContext,
  UserData,
  SnowBallData
} from '@pages/Visit/SnowBallProvider';
import { MessageListContext, Message } from '@pages/Visit/MessageListProvider';
import LockModal from './LockModal';

import MenuModal from './MenuModal';
import Introduce from '@pages/Intro/Introduce';
import ListMsgs from './ListMsgs';
import { createPortal } from 'react-dom';

// 햄버거 버튼 메뉴의 크기가 동적으로 변하는 것을 유지하기 위해 fixed 사용
const StyledMenu = styled.img`
  position: fixed;
  top: 3.5rem;
  right: 0.8rem;
  width: 2rem;
  height: 2rem;
  animation: fadeIn 2s forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const EmptyDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: all;
  z-index: 100;
`;

const Main = () => {
  // const saveCookie = () => {
  //   const cookieToken = import.meta.env.VITE_APP_COOKIE_TOKEN;
  //   const cookieName = 'access_token';
  //   const cookieValue = cookieToken;
  //   const today = new Date();
  //   const expire = new Date();
  //   const secure = true;
  //   expire.setDate(today.getDate() + 1);
  //   document.cookie = `${cookieName}=${cookieValue}; expires=${expire.toUTCString()}; secure=${secure}; path=/`;

  //   const cookieToken2 = true;
  //   const cookieName2 = 'loggedin';
  //   const cookieValue2 = cookieToken2;
  //   const today2 = new Date();
  //   const expire2 = new Date();
  //   const secure2 = true;
  //   expire2.setDate(today2.getDate() + 1);
  //   document.cookie = `${cookieName2}=${cookieValue2}; expires=${expire2.toUTCString()}; secure=${secure2}; path=/`;
  // };

  const navigate = useNavigate();
  const logout = useLogout();

  const [isLoading, setIsLoading] = useState(false);

  const [cookie] = useCookies(['loggedin']);
  const { setSnowBallData, setUserData, userData, snowBallData } =
    useContext(SnowBallContext);
  const { setMessageList } = useContext(MessageListContext);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const [msgList, setMsgList] = useState(false);

  const [toast, setToast] = useState(false);
  const [linkToast, setLinkToast] = useState(false);

  const [menuModal, setMenuModal] = useState(false);
  const [intro, setIntro] = useState(false);

  const [show, setShow] = useState(true);

  const showScreen = () => {
    const music = document.getElementById('musicController');
    const prev = document.getElementById('prevBtn');

    setShow(true);
    music?.setAttribute('style', 'display: block');
    music?.setAttribute('style', 'animation: fadeIn 3s forwards');
    prev?.setAttribute('style', 'display: block');
    prev?.setAttribute('style', 'animation: fadeIn 3s forwards');
  };

  useEffect(() => {
    // saveCookie();
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
      .catch(() => logout());
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <SnowGlobeCanvas snowBallData={snowBallData} />
          {show ? (
            <UIContainer>
              {msgList ? null : (
                <StyledMenu
                  key="hambuger"
                  src={'/icons/menu.svg'}
                  onClick={() => setMenuModal(true)}
                />
              )}

              {menuModal ? (
                <MenuModal
                  intro={[intro, setIntro]}
                  set={setMenuModal}
                  list={setMsgList}
                />
              ) : null}

              {isModalOpened ? (
                <LockModal
                  toast={[toast, setToast]}
                  flag={isModalOpened}
                  set={setIsModalOpened}
                />
              ) : null}

              {intro
                ? createPortal(
                    <Background onClick={() => setIntro(false)}>
                      <Introduce view={[intro, setIntro]} />
                    </Background>,
                    document.body
                  )
                : null}

              {/* 이건 바디에 넣어도 됨*/}
              {msgList ? <ListMsgs set={setMsgList} /> : null}

              {toast ? (
                <ToastMsg>
                  {snowBallData.is_message_private
                    ? '메세지가 비공개 되었습니다.'
                    : '메세지가 공개 되었습니다.'}
                </ToastMsg>
              ) : null}

              {linkToast ? <ToastMsg>링크가 복사되었습니다.</ToastMsg> : null}

              <MainHeader set={[isModalOpened, setIsModalOpened]} />
              <MainBody />
              <MainFooter
                set={[show, setShow]}
                toast={[linkToast, setLinkToast]}
              />
            </UIContainer>
          ) : (
            <EmptyDiv
              onClick={() => {
                showScreen();
              }}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Main;

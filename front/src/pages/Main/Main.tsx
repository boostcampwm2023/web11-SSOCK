import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Loading, axios } from '@utils';
import { useLogout } from '@hooks';
import { MessageListRecoil, SnowBallRecoil } from '@states';
import { SnowGlobeCanvas, UIContainer } from '@components';

import Introduce from '@pages/Intro/Introduce';
import ListMsgs from './ListMsgs';
import MainBody from './MainBody';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import LockModal from './LockModal';
import MenuModal from './MenuModal';

// 햄버거 버튼 메뉴의 크기가 동적으로 변하는 것을 유지하기 위해 fixed 사용
const StyledMenu = styled.img`
  position: fixed;
  top: 3.5rem;
  right: 0.8rem;
  width: 2rem;
  height: 2rem;
  animation: fadeIn 1s forwards;
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
  const [cookie] = useCookies(['loggedin']);

  const setMessageList = useSetRecoilState(MessageListRecoil);
  const [{ snowBallData, userData }, setSnowBallBox] =
    useRecoilState(SnowBallRecoil);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [msgList, setMsgList] = useState(false);
  const [toast, setToast] = useState(false);
  const [linkToast, setLinkToast] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [intro, setIntro] = useState(false);
  const [show, setShow] = useState(true);
  const [animation, setAnimation] = useState(false);

  const hamburgerRef = useRef<HTMLImageElement>(null);

  const showScreen = () => {
    const music = document.getElementById('musicController');
    const prev = document.getElementById('prevBtn');
    const hamburger = hamburgerRef.current;

    setShow(true);
    music?.setAttribute('style', 'animation: fadeIn 1s forwards');
    prev?.setAttribute('style', 'animation: fadeIn 1s forwards');
    hamburger?.setAttribute('style', 'animation: fadeIn 1s forwards');
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
          const resUserData = res.data.user;
          setSnowBallBox(prev => ({ ...prev, userData: resUserData }));

          if (res.data.main_snowball === null) {
            navigate('/make');
            return;
          }

          const resSnowballData = res.data.main_snowball;
          const messageList = res.data.main_snowball.message_list;
          setSnowBallBox(prev => ({ ...prev, snowBallData: resSnowballData }));
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
                  ref={hamburgerRef}
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

              <MainHeader
                animation={animation}
                set={[isModalOpened, setIsModalOpened]}
              />
              <MainBody animation={animation} />
              <MainFooter
                set={[show, setShow]}
                toast={[linkToast, setLinkToast]}
                animation={[animation, setAnimation]}
                hamburger={hamburgerRef}
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

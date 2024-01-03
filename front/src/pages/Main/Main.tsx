import { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { Loading, axios } from '@utils';
import { useLogout } from '@hooks';
import { SnowGlobeCanvas, UIContainer } from '@components';

import MainButtonBox from './MainButtonBox';

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

// 햄버거 버튼 메뉴의 크기가 동적으로 변하는 것을 유지하기 위해 fixed 사용
const StyledMenu = styled.img`
  position: fixed;
  top: 3.5rem;
  right: 0.8rem;
  width: 2rem;
  height: 2rem;
`;

const Main = () => {
  const saveCookie = () => {
    const cookieToken = import.meta.env.VITE_APP_COOKIE_TOKEN;
    const cookieName = 'access_token';
    const cookieValue = cookieToken;
    const today = new Date();
    const expire = new Date();
    const secure = true;
    expire.setDate(today.getDate() + 1);
    document.cookie = `${cookieName}=${cookieValue}; expires=${expire.toUTCString()}; secure=${secure}; path=/`;

    const cookieToken2 = true;
    const cookieName2 = 'loggedin';
    const cookieValue2 = cookieToken2;
    const today2 = new Date();
    const expire2 = new Date();
    const secure2 = true;
    expire2.setDate(today2.getDate() + 1);
    document.cookie = `${cookieName2}=${cookieValue2}; expires=${expire2.toUTCString()}; secure=${secure2}; path=/`;
  };

  const navigate = useNavigate();
  const logout = useLogout();

  const [isLoading, setIsLoading] = useState(false);

  const [cookie] = useCookies(['loggedin']);
  const { setSnowBallData, setUserData, userData, snowBallData } =
    useContext(SnowBallContext);
  const { setMessageList } = useContext(MessageListContext);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalToast, setModalToast] = useState(false);

  const [hamburger, setHamburger] = useState(false);
  const menuRef = useRef<HTMLImageElement>(null);
  const [menuModal, setMenuModal] = useState(false);
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    saveCookie();
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
          <UIContainer>
            {hamburger ? null : (
              <StyledMenu
                ref={menuRef}
                src={'/icons/menu.svg'}
                onClick={() => setMenuModal(true)}
              />
            )}

            {menuModal ? (
              <MenuModal
                intro={[intro, setIntro]}
                set={setMenuModal}
                list={setHamburger}
              />
            ) : null}

            {isModalOpened ? (
              <LockModal
                toast={modalToast}
                setToast={setModalToast}
                flag={isModalOpened}
                set={setIsModalOpened}
              />
            ) : null}

            <MainHeader />
            <MainBody />
            <MainFooter />
          </UIContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Main;

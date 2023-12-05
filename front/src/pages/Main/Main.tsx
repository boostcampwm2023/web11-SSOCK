import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { SnowGlobeCanvas, UIContainer } from '@components';
import MainButtonBox from './MainButtonBox';
import {
  SnowBallContext,
  UserData,
  SnowBallData
} from '@pages/Visit/SnowBallProvider';

const StyledLeft = styled.img`
  position: fixed;
  top: 50%;
  height: 4rem;
`;

const StyledRight = styled(StyledLeft)`
  right: 0;
`;

const Main = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSnowBallData, setUserData } = useContext(SnowBallContext);
  const allSnowballIdx = 5; // fetch 필요
  const [snowballIdx, setSnowballIdx] = useState(1);
  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);

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
    axios
      .get('/api/user', {
        withCredentials: true // axios 쿠키 값 전달
      })
      .then(res => {
        if (res.status === 200) {
          const userData = res.data.user as UserData;
          const snowballData = res.data.main_snowball as SnowBallData;
          setSnowBallData(snowballData);
          setUserData(userData);
          console.log('wow');
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
        navigate('/');
      });
    if (
      !searchParams.size ||
      searchParams.get('snowball') !== String(snowballIdx)
    ) {
      navigate('/main?snowball=1');
      setSnowballIdx(1);
      searchParams.set('snowball', '1');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, navigate, snowballIdx]);

  const moveSnowball = (where: 'prev' | 'next') => {
    const nowIdx = where === 'prev' ? snowballIdx - 1 : snowballIdx + 1;
    setSnowballIdx(nowIdx);
    searchParams.set('snowball', `${nowIdx}`);
    setSearchParams(searchParams);
  };

  return (
    <>
      <SnowGlobeCanvas />

      <UIContainer>
        {snowballIdx > 1 ? (
          <StyledLeft
            ref={leftArrowRef}
            src={'/icons/prev.svg'}
            onClick={() => moveSnowball('prev')}
          />
        ) : null}

        {snowballIdx < allSnowballIdx ? (
          <StyledRight
            ref={rightArrowRef}
            src={'/icons/next.svg'}
            onClick={() => moveSnowball('next')}
          />
        ) : null}

        <MainButtonBox leftArrow={leftArrowRef} rightArrow={rightArrowRef} />
      </UIContainer>
    </>
  );
};

export default Main;

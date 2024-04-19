import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { theme } from '@utils';
import { useLogout, useNav } from '@hooks';
import { SnowBallRecoil } from '@states';
import { Button, SnowGlobeCanvas } from '@components';
import { MainDeco } from './MainDeco';

const StyledHeader = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  font: ${props => props.theme.font['--normal-nickname-input-font']};
  font-size: 1.25rem;
  text-align: center;
`;

const StyledName = styled.span`
  font: ${props => props.theme.font['--normal-nickname-font']};
  color: ${props => props.theme.colors['--nick-name']};
`;

const StyledWelcome = styled.div`
  font: ${props => props.theme.font['--normal-title-font']};
`;

const StyledBottom = styled.div`
  position: absolute;
  bottom: 25%;
  left: 50%;
  white-space: nowrap;
  text-align: center;
  transform: translate(-50%, 0);
  font: ${props => props.theme.font['--normal-introduce-font']};
  color: white;
  text-shadow: ${props => props.theme.font['--text-shadow']};
`;

const StyledBall = styled.span`
  color: ${props => props.theme.colors['--blue-blue-dark-10']};
`;

const StyledButtonBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 15%;
  text-align: center;
`;

const Home = styled.img`
  position: fixed;
  z-index: 99;
  top: 1rem;
  left: 0.2rem;
  width: 3rem;
  height: 3rem;
  filter: invert(1);
`;

const Snowball = () => {
  const navigate = useNav();
  const logout = useLogout();
  const [make, setMake] = useState(false);

  const [cookie] = useCookies(['loggedin']);
  const [{ snowBallData, userData }, setSnowball] =
    useRecoilState(SnowBallRecoil);

  const maxSnowball = 5;

  window.history.pushState({}, '', '/main');
  window.history.pushState({}, '', '/make/snowball');

  useEffect(() => {
    // if (!cookie.loggedin) {
    //   logout();
    //   return;
    // }

    if (
      userData.nickname === null ||
      userData.nickname === undefined ||
      userData.nickname === ''
    ) {
      // navigate('/make/nickname');
      setSnowball(prev => ({ ...prev, nickname: '김부캠' })); // temp
      return;
    }

    if (userData.snowball_count >= maxSnowball) {
      navigate('/main');
      return;
    }
  }, []);

  return (
    <>
      {make ? (
        <MainDeco set={setMake} />
      ) : (
        <>
          {userData.snowball_count !== undefined &&
          userData.snowball_count >= 1 ? (
            <Home onClick={() => navigate('/main')} src="/icons/home.svg" />
          ) : null}

          <SnowGlobeCanvas snowBallData={snowBallData} />
          <StyledHeader>
            <StyledName>{userData.nickname}</StyledName>&nbsp;님
            <StyledWelcome>환영합니다 :&#41;</StyledWelcome>
          </StyledHeader>

          <StyledBottom>
            <StyledBall>스노우볼</StyledBall>은 소중한 마음을 주고 받는
            <br />
            예쁜 선물 상자가 될 거예요.
          </StyledBottom>

          <StyledButtonBox>
            <Button
              text={'스노우볼 만들기'}
              color={theme.colors['--primary-red-primary']}
              view={[make, setMake]}
            />
          </StyledButtonBox>
        </>
      )}
    </>
  );
};

export default Snowball;

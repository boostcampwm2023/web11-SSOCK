import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { theme } from '@utils';
import { SnowGlobeCanvas, Button } from '@components';
import { MainDeco } from './MainDeco';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';
import { UserData } from '@pages/Visit/SnowBallProvider';

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

const Snowball = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('김부캠');
  const [make, setMake] = useState(false);
  const { snowBallData } = useContext(SnowBallContext);

  window.history.pushState({}, '', '/main');
  window.history.pushState({}, '', '/make/snowball');

  useEffect(() => {
    axios
      .get('/api/user', {
        withCredentials: true
      })
      .then(res => {
        if (res.status === 200) {
          const userData = res.data.user as UserData;
          setNickname(userData.nickname);
        } else {
          navigate('/make');
        }
      })
      .catch(e => {
        console.error(e);
        navigate('/make');
      });
  }, [navigate]);

  return (
    <>
      {make ? (
        <MainDeco set={setMake} />
      ) : (
        <>
          <SnowGlobeCanvas snowBallData={snowBallData} />
          <StyledHeader>
            <StyledName>{nickname}</StyledName>&nbsp;님
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

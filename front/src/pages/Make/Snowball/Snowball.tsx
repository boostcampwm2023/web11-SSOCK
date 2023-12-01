import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../utils/theme';
import mock from '../../../mockdata.json'; // temporary
import { SnowGlobeCanvas, Button } from '../../../components';

const StyledHeader = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

const StyledName = styled.span`
  font: ${theme.font['--normal-nickname-font']};
  color: ${theme.colors['--nick-name']};
`;

const StyledWelcome = styled.div`
  font: ${theme.font['--normal-title-font']};
`;

const StyledBottom = styled.div`
  position: absolute;
  bottom: 25%;
  left: 50%;
  white-space: nowrap;
  text-align: center;
  transform: translate(-50%, 0);
  font: ${theme.font['--normal-introduce-font']};
  color: white;
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
`;

const StyledBall = styled.span`
  color: ${theme.colors['--blue-blue-dark-10']};
`;

const StyledButtonBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 15%;
  text-align: center;
`;

const Snowball = () => {
  const navigate = useNavigate();
  const userName = mock.user_data.nickname;
  const [make, setMake] = useState(false);

  useEffect(() => {
    make ? navigate('/maindeco') : null;
  }, [make, navigate]);

  return (
    <>
      <SnowGlobeCanvas />
      <StyledHeader>
        <StyledName>{userName}</StyledName>&nbsp;님
        <StyledWelcome>환영합니다 :&#41;</StyledWelcome>
      </StyledHeader>

      <StyledBottom>
        아직 <StyledBall>스노우볼</StyledBall>이 없군요!
        <br />
        스노우볼은 소중한 마음을 주고 받는
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
  );
};

export default Snowball;

import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { axios, theme } from '@utils';
import { useLogout, useNav } from '@hooks';
import { SnowBallRecoil } from '@states';
import { Button } from '@components';

const StyledWrap = styled.div`
  width: 100%;
  height: 80%;
  padding: 5%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.size['--desktop-width']}) {
    width: ${props => props.theme.size['--desktop-width']};
  }
`;

const StyledExplain = styled.div`
  font: ${props => props.theme.font['--normal-nickname-font']};
  color: white;
  padding-top: 12rem;
`;

const StyledPink = styled.span`
  color: ${props => props.theme.colors['--primary-redp-variant']};
`;

const StyledNickName = styled.div`
  font: ${props => props.theme.font['--normal-login-font']};
  color: white;
  padding-top: 5%;
`;

const StyledInput = styled.input`
  font: ${props => props.theme.font['--normal-nickname-input-font']};
  margin-top: 5%;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;

  &::placeholder {
    color: ${props => props.theme.colors['--sub-text']};
  }

  &:focus {
    outline: none;
  }
`;

const StyledWarnText = styled.div`
  font: ${props => props.theme.font['--normal-nickname-font']};
  font-size: 1.5rem;
  color: ${props => props.theme.colors['--blue-blue-dark-10']};
  text-align: center;
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5%;
`;

const Nickname = () => {
  const navigate = useNav();
  const [nickname, setNickname] = useState(false);
  const [error, setError] = useState(false);
  const [lenWarning, setLenWarning] = useState(false);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const [cookie] = useCookies(['loggedin']);
  const logout = useLogout();
  const [{ userData }, setSnowballData] = useRecoilState(SnowBallRecoil);

  const putNickname = async (nicknameValue: string) => {
    try {
      await axios.put(
        '/api/user/nickname',
        { nickname: nicknameValue },
        { withCredentials: true }
      );
      setSnowballData(prev => ({
        ...prev,
        userData: { ...prev.userData, nickname: nicknameValue }
      }));
      navigate('/make/snowball');
    } catch (err) {
      console.log(err);
      logout();
    }
  };

  // 브라우저 뒤로가기시 main으로 이동시켜주기위한 로직
  // 여기서 문제가 발생
  // window.history.pushState({}, '', '/main');
  // window.history.pushState({}, '', '/make');

  useEffect(() => {
    if (!cookie.loggedin) {
      logout();
      navigate('/');
      return;
    }

    if (userData.nickname !== null) navigate('/main');
  }, []);

  useEffect(() => {
    if (!nickname && nicknameRef.current?.value) setNickname(true);
    if (!nickname || !nicknameRef.current?.value) return;

    if (nicknameRef.current.value.length <= 16) {
      setLenWarning(false);
      putNickname(nicknameRef.current.value);
    } else {
      setError(false);
      setLenWarning(true);
    }
  }, [nickname]);

  return (
    <StyledWrap>
      <StyledExplain>
        사용하실
        <br />
        <StyledPink>닉네임</StyledPink>을 입력해주세요.
      </StyledExplain>

      <div>
        <StyledNickName>닉네임</StyledNickName>
        <StyledInput ref={nicknameRef} placeholder="ex) 라온이" />
      </div>

      <StyledWarnText>
        {error
          ? '다시 시도해주십시오.'
          : lenWarning
            ? '8글자 이하로 설정 가능합니다.'
            : ' '}
      </StyledWarnText>

      <StyledButtonBox>
        <Button
          text={'시작하기'}
          color={theme.colors['--primary-red-primary']}
          view={[nickname, setNickname]}
          disabled={false}
        />
      </StyledButtonBox>
    </StyledWrap>
  );
};

export default Nickname;

import React, { useState } from 'react';
import theme from '../../utils/theme';
import styled from 'styled-components';

interface LoginProps {
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

interface SocialLogin {
  social: '카카오' | '네이버' | '구글';
}

const StyledBody = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(217, 217, 217, 0.2);
`;

const StyledLoginBox = styled.div`
  background-color: ${theme.colors['--primary-black']};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 35%;
  padding: 5%;
  padding-bottom: 10%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
`;

const StyledLogin = styled.button`
  position: relative;
  height: 20%;
  margin: 1% 0;
  border-radius: 12px;
`;

const StyledLogo = styled.img`
  width: 100%;
`;

const validLogin = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  props: SocialLogin
) => {
  event.stopPropagation();
  console.log(props.social);
};

const LoginUI = (props: SocialLogin) => {
  return (
    <StyledLogin onClick={event => validLogin(event, props)}>
      {props.social === '카카오' ? (
        <StyledLogo src={'/socialLogin/kakao.svg'} />
      ) : props.social === '네이버' ? (
        <StyledLogo src={'/socialLogin/naver.svg'} />
      ) : (
        <StyledLogo src={'/socialLogin/google.svg'} />
      )}
    </StyledLogin>
  );
};

const LoginBox = (props: LoginProps) => {
  const [isFocus, setIsFocus] = useState(true);

  return (
    <StyledBody
      onClick={() => {
        setIsFocus(false);
        props.view[1](!props.view[0]);
      }}
    >
      {isFocus ? (
        <StyledLoginBox>
          <LoginUI social={'카카오'} />
          <LoginUI social={'네이버'} />
          <LoginUI social={'구글'} />
        </StyledLoginBox>
      ) : null}
    </StyledBody>
  );
};

export default LoginBox;

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BlurBody } from '@utils';
import { theme } from '@utils';

interface LoginProps {
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

interface SocialLogin {
  social: 'kakao' | 'naver' | 'google';
}

const StyledLoginBox = styled.div`
  background-color: ${props => props.theme.colors['--primary-black']};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  height: 18rem;
  padding: 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  animation: fadeInUp 0.5s forwards;
  pointer-events: all;
  z-index: 1;
`;

const StyledLogin = styled.button<SocialLogin>`
  font: ${props => props.theme.font['--normal-login-font']};
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.social === 'kakao'
      ? '#FEE500'
      : props.social === 'naver'
      ? '#00C73C'
      : 'white'};
`;

const StyledLogo = styled.img`
  height: 100%;
`;

const StyledSocial = styled.span`
  font-weight: 700;
`;

const closeLogin = (
  props: LoginProps,
  closeRef: React.RefObject<HTMLDivElement>,
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const onAnimationEnd = () => {
    if (closeRef.current) {
      setIsFocus(false);
      props.view[1](!props.view[0]);
      closeRef.current.removeEventListener('animationend', onAnimationEnd);
    }
  };

  if (closeRef.current) {
    closeRef.current.addEventListener('animationend', onAnimationEnd);
    closeRef.current.style.setProperty(
      'animation',
      'fadeOutDown 0.5s forwards'
    );
  }
};

const validLogin = (props: SocialLogin) => {
  window.open(`/api/auth/${props.social}`, '_self');
};

const LoginUI = (props: SocialLogin) => {
  return (
    <StyledLogin social={props.social} onClick={() => validLogin(props)}>
      <StyledLogo src={`/socialLogin/${props.social}.svg`} />
      {props.social === 'kakao' ? (
        <StyledSocial>카카오</StyledSocial>
      ) : props.social === 'naver' ? (
        <StyledSocial>네이버</StyledSocial>
      ) : (
        <StyledSocial>구글</StyledSocial>
      )}
      로 시작하기
    </StyledLogin>
  );
};

const StyledLoginText = styled.p`
  font: ${theme.font['--normal-login-font']};
  color: ${theme.colors['--white-primary']};
  text-align: center;
`;

const LoginBox = (props: LoginProps) => {
  const [isFocus, setIsFocus] = useState(true);
  const closeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <BlurBody onClick={() => closeLogin(props, closeRef, setIsFocus)} />
      {isFocus ? (
        <StyledLoginBox ref={closeRef}>
          <StyledLoginText>
            크롬 및 삼성브라우저 사용을 권장합니다.
          </StyledLoginText>
          <LoginUI social={'kakao'} />
          <LoginUI social={'naver'} />
          <LoginUI social={'google'} />
        </StyledLoginBox>
      ) : null}
    </>
  );
};

export default LoginBox;

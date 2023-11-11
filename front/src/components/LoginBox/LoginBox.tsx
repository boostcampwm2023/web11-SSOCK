import React, { useState, useRef } from 'react';
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
  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 35%;
  padding: 2% 5%;
  padding-bottom: 5%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  animation: fadeInUp 0.5s forwards;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(-50%, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-50%, 100%, 0);
    }
  }
`;

const StyledLogin = styled.button<SocialLogin>`
  height: 20%;
  margin: 1% 0;
  border-radius: 12px;
  font: ${theme.font['--normal-login-font']};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${props =>
    props.social === '카카오'
      ? '#FEE500'
      : props.social === '네이버'
      ? '#00C73C'
      : 'white'};
`;

const StyledLogo = styled.img`
  position: absolute;
  left: 0;
  height: 100%;
  width: auto;
  margin-left: 2%;
`;

const StyledSocial = styled.span`
  font-weight: 700;
  margin-left: 5%;
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

const validLogin = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  props: SocialLogin
) => {
  event.stopPropagation();
  console.log(props.social);
};

const LoginUI = (props: SocialLogin) => {
  return (
    <StyledLogin
      social={props.social}
      onClick={event => validLogin(event, props)}
    >
      {props.social === '카카오' ? (
        <StyledLogo src={'/socialLogin/kakao.svg'} />
      ) : props.social === '네이버' ? (
        <StyledLogo src={'/socialLogin/naver.svg'} />
      ) : (
        <StyledLogo src={'/socialLogin/google.svg'} />
      )}
      <StyledSocial>{props.social}</StyledSocial>로 시작하기
    </StyledLogin>
  );
};

const LoginBox = (props: LoginProps) => {
  const [isFocus, setIsFocus] = useState(true);
  const closeRef = useRef<HTMLDivElement>(null);

  return (
    <StyledBody onClick={() => closeLogin(props, closeRef, setIsFocus)}>
      {isFocus ? (
        <StyledLoginBox ref={closeRef}>
          <LoginUI social={'카카오'} />
          <LoginUI social={'네이버'} />
          <LoginUI social={'구글'} />
        </StyledLoginBox>
      ) : null}
    </StyledBody>
  );
};

export default LoginBox;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme';

interface LoginProps {
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

interface SocialLogin {
  social: '카카오' | '네이버' | '구글';
}

const StyledBody = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 0.1);
  pointer-events: all;
`;

const StyledLoginBox = styled.div`
  background-color: ${theme.colors['--primary-black']};
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  height: 18rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  animation: fadeInUp 0.5s forwards;
  pointer-events: all;
  z-index: 1;


  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(0, 100%);
    }
    to {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, 100%);
    }
  }
`;

const StyledLogin = styled.button<SocialLogin>`
  font: ${theme.font['--normal-login-font']};
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.social === '카카오'
      ? '#FEE500'
      : props.social === '네이버'
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

const validLogin = (
  props: SocialLogin,
  setValid: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setValid(true);
};

const LoginUI = (props: SocialLogin) => {
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    valid ? navigate('/make') : null;
  }, [valid, navigate]);

  return (
    <StyledLogin
      social={props.social}
      onClick={() => validLogin(props, setValid)}
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
    <>
      <StyledBody onClick={() => closeLogin(props, closeRef, setIsFocus)} />
      {isFocus ? (
        <StyledLoginBox ref={closeRef}>
          <LoginUI social={'카카오'} />
          <LoginUI social={'네이버'} />
          <LoginUI social={'구글'} />
        </StyledLoginBox>
      ) : null}
    </>
  );
};

export default LoginBox;

import React, { useState, useRef } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../utils/theme';

interface LoginProps {
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledBody = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(217, 217, 217, 0.2);
  pointer-events: all;
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

const CloseLogin = (
  props: LoginProps,
  closeRef: React.RefObject<HTMLDivElement>,
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  user: string | undefined
) => {
  const onAnimationEnd = () => {
    if (closeRef.current) {
      setIsFocus(false);
      props.view[1](!props.view[0]);
      closeRef.current.removeEventListener('animationend', onAnimationEnd);
      navigate(`/visit/${user}`);
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

const DecoEnroll = (props: LoginProps) => {
  const [isFocus, setIsFocus] = useState(true);
  const closeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useParams();
  return (
    <StyledBody
      onClick={() => CloseLogin(props, closeRef, setIsFocus, navigate, user)}
    >
      {isFocus ? <StyledLoginBox ref={closeRef}></StyledLoginBox> : null}
    </StyledBody>
  );
};

export default DecoEnroll;

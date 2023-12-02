import React, { useState, useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme, BlurBody } from '../../../utils';

interface NaviProps {
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledNaviBox = styled.div`
  background-color: ${props => props.theme.colors['--primary-black']};
  position: absolute;
  bottom: 0;
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

  pointer-events: all;
  z-index: 1;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledNavButton = styled.button`
  width: 100%;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors['--white-primary']};
  background-color: ${props => props.color};
  border: 1px solid ${props => props.theme.colors['--white-primary']};
`;

const StyeldButtonText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font: ${props => props.theme.font['--normal-button-font']};
  justify-content: center;
`;

const StyledImgIcon = styled.img`
  width: 3rem;
`;

const EmptyDiv = styled.div`
  width: 1rem;
`;

const CloseNav = (
  props: NaviProps,
  closeRef: React.RefObject<HTMLDivElement>,
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  flag: 'close' | 'root'
) => {
  const onAnimationEnd = () => {
    if (closeRef.current) {
      setIsFocus(false);
      props.view[1](!props.view[0]);
      closeRef.current.removeEventListener('animationend', onAnimationEnd);
      if (flag === 'root') {
        navigate('/main');
        return;
      }
      navigate(`/main`);
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

const DecoEnroll = (props: NaviProps) => {
  const navigate = useNavigate();
  const [isFocus, setIsFocus] = useState(true);
  const closeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <BlurBody
        onClick={() => CloseNav(props, closeRef, setIsFocus, navigate, 'close')}
      />

      {isFocus ? (
        <StyledNaviBox ref={closeRef}>
          <ButtonWrap>
            <StyledNavButton
              color={theme.colors['--primary-red-primary']}
              onClick={() =>
                CloseNav(props, closeRef, setIsFocus, navigate, 'root')
              }
            >
              <StyeldButtonText>
                <StyledImgIcon
                  src="/icons/snowGlobeButton.png"
                  alt="snowGlobe"
                />
                링크 공유하기
              </StyeldButtonText>
              <EmptyDiv />
            </StyledNavButton>
          </ButtonWrap>

          <ButtonWrap>
            <StyledNavButton
              color={theme.colors['--primary-green-primary']}
              onClick={() =>
                CloseNav(props, closeRef, setIsFocus, navigate, 'close')
              }
            >
              <StyeldButtonText>내 스노우볼 보러가기</StyeldButtonText>
            </StyledNavButton>
          </ButtonWrap>
        </StyledNaviBox>
      ) : null}
    </>
  );
};

export default DecoEnroll;

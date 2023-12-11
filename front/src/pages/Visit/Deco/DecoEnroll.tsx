import React, { useState, useRef, useContext } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme, BlurBody } from '@utils';
import { DecoContext } from './DecoProvider';

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
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
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
  justify-content: center;
  font: ${props => props.theme.font['--normal-button-font']};
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
  user: string | undefined,
  flag: 'close' | 'root',
  callback: () => void
) => {
  const onAnimationEnd = () => {
    if (closeRef.current) {
      setIsFocus(false);
      props.view[1](!props.view[0]);
      closeRef.current.removeEventListener('animationend', onAnimationEnd);
      if (flag === 'root') {
        navigate('/');
        return;
      }
      callback();
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

const DecoEnroll = (props: NaviProps) => {
  const navigate = useNavigate();
  const { user } = useParams();
  const [isFocus, setIsFocus] = useState(true);
  const closeRef = useRef<HTMLDivElement>(null);
  const { resetDecoContext } = useContext(DecoContext);
  return (
    <>
      <BlurBody
        onClick={() =>
          CloseNav(
            props,
            closeRef,
            setIsFocus,
            navigate,
            user,
            'close',
            resetDecoContext
          )
        }
      />

      {isFocus ? (
        <StyledNaviBox ref={closeRef}>
          <ButtonWrap>
            <StyledNavButton
              color={theme.colors['--primary-red-primary']}
              onClick={() =>
                CloseNav(
                  props,
                  closeRef,
                  setIsFocus,
                  navigate,
                  user,
                  'root',
                  resetDecoContext
                )
              }
            >
              <StyeldButtonText>
                <StyledImgIcon
                  src="/icons/snowGlobeButton.png"
                  alt="snowGlobe"
                />
                내 스노우볼 만들러 가기
              </StyeldButtonText>
              <EmptyDiv />
            </StyledNavButton>
          </ButtonWrap>

          <ButtonWrap>
            <StyledNavButton
              color={theme.colors['--primary-green-primary']}
              onClick={() =>
                CloseNav(
                  props,
                  closeRef,
                  setIsFocus,
                  navigate,
                  user,
                  'close',
                  resetDecoContext
                )
              }
            >
              <StyeldButtonText>전송한 선물 확인하기</StyeldButtonText>
            </StyledNavButton>
          </ButtonWrap>
        </StyledNaviBox>
      ) : null}
    </>
  );
};

export default DecoEnroll;

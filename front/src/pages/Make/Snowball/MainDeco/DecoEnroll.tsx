import React, { useState, useRef } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import axios from '@utils/axios';
import styled from 'styled-components';
import { theme, BlurBody } from '@utils';
import { useLogout } from '@hooks';

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
  font: ${props => props.theme.font['--normal-button-font']};
  justify-content: center;
`;

const StyledImgIcon = styled.img`
  width: 3rem;
`;

const EmptyDiv = styled.div`
  width: 1rem;
`;

const ToastMsg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${props => props.theme.font['--normal-button-font']};
  background-color: ${props => props.theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
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
      navigate('/main');
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
  const BlurBodyRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState(false);
  const logout = useLogout();

  const shareLink = () => {
    axios
      .get('/api/user', { withCredentials: true })
      .then(res => {
        const user = res.data.user.auth_id;

        closeRef.current?.style.setProperty('pointer-events', 'none');
        closeRef.current?.style.setProperty('opacity', '0.5');
        BlurBodyRef.current?.style.setProperty('pointer-events', 'none');

        const url = `https://www.mysnowball.kr/visit/${user}`;
        if (navigator.share === undefined) {
          navigator.clipboard.writeText(url);
          setToast(true);
          setTimeout(() => {
            CloseNav(props, closeRef, setIsFocus, navigate, 'root');
          }, 1500);
          return;
        } else {
          navigator.clipboard.writeText(url);
          navigator
            .share({
              url: url
            })
            .then(() => {})
            .catch(() => {
              setToast(true);
              setTimeout(() => {
                CloseNav(props, closeRef, setIsFocus, navigate, 'root');
              }, 1500);
            });
        }
      })
      .catch(() => logout());
  };

  return (
    <>
      {toast ? <ToastMsg>링크가 복사되었습니다.</ToastMsg> : null}
      <BlurBody
        ref={BlurBodyRef}
        onClick={() => CloseNav(props, closeRef, setIsFocus, navigate, 'close')}
      />

      {isFocus ? (
        <StyledNaviBox ref={closeRef}>
          <ButtonWrap>
            <StyledNavButton
              color={theme.colors['--primary-red-primary']}
              onClick={shareLink}
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

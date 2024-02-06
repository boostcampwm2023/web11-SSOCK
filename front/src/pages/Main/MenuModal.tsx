import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useLogout, useNav } from '@hooks';
import { SnowBallRecoil } from '@states';

interface ModalProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
  list: React.Dispatch<React.SetStateAction<boolean>>;
  intro: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledModal = styled.div`
  pointer-events: auto;
  position: absolute;
  top: 4%;
  right: 0;
  width: 40%;
  background-color: #161616;
  border-radius: 0.625rem 0 0 0.625rem;
  box-shadow:
    0 0.625rem 1.25rem rgba(255, 255, 255, 0.25),
    0 0.625rem 1.25rem rgba(255, 255, 255, 0.25);
  font: ${props => props.theme.font['--normal-main-header-font']};
  color: white;
`;

const StyledSection = styled.div`
  padding: 5%;
  white-space: normal;
  word-break: keep-all;
  cursor: pointer;
`;

const StyledUser = styled(StyledSection)`
  font-size: 1.125rem;
`;

const StyledLogout = styled(StyledSection)`
  color: ${props => props.theme.colors['--primary-red-primary']};

  font-weight: bold;
`;

const StyledClosed = styled(StyledSection)`
  text-align: center;
`;

const ToastMsg = styled.div`
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${props => props.theme.font['--normal-button-font']};
  background-color: ${props => props.theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
`;

const MenuModal = (props: ModalProps) => {
  const navigate = useNav();
  const logout = useLogout();
  const { userData } = useRecoilValue(SnowBallRecoil);

  const [toast, setToast] = useState(false);
  const timer = useRef<number | null>(null);

  const makeNewSnowBall = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (userData.snowball_count >= 5) {
      setToast(true);
      timer.current = window.setTimeout(() => {
        setToast(false);
      }, 1500);
      return;
    }
    navigate('/make/snowball');
  };

  const showIntro = () => {
    props.set(false);
    props.intro[1](true);
  };

  return (
    <>
      {toast ? (
        <ToastMsg>스노우볼은 최대 5개까지 만들 수 있습니다.</ToastMsg>
      ) : null}

      <StyledModal>
        <StyledUser>{userData.nickname}님</StyledUser>
        <hr />

        <StyledSection
          onClick={() => {
            props.set(false);
            props.list(true);
          }}
        >
          편지 리스트로 보기
        </StyledSection>

        <StyledSection onClick={makeNewSnowBall}>
          새로운 스노우볼 만들러 가기
        </StyledSection>

        <StyledSection onClick={showIntro}>소개글 보기</StyledSection>

        <StyledLogout onClick={() => logout()}>로그아웃</StyledLogout>
        <hr />

        <StyledClosed onClick={() => props.set(false)}>닫기</StyledClosed>
      </StyledModal>
    </>
  );
};

export default MenuModal;

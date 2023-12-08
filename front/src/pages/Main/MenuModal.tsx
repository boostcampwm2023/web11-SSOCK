import { useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';

interface ModalProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
  list: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledModal = styled.div`
  pointer-events: auto;
  position: absolute;
  top: 4%;
  right: 0;
  width: 40%;
  background-color: #161616;
  border-radius: 0.625rem 0 0 0.625rem;
  box-shadow: 0 0.625rem 1.25rem rgba(255, 255, 255, 0.25),
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

const Logout = (navigate: NavigateFunction) => {
  // 현재 가지고 있는 쿠키값 모두 지우기
  // logout api 호출
  navigate('/');
};

const MenuModal = (props: ModalProps) => {
  const { userData } = useContext(SnowBallContext);
  const navigate = useNavigate();

  const makeNewSnowBall = () => {
    navigate('/make/snowball');
  };

  return (
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

      <StyledLogout onClick={() => Logout(navigate)}>로그아웃</StyledLogout>
      <hr />

      <StyledClosed onClick={() => props.set(false)}>닫기</StyledClosed>
    </StyledModal>
  );
};

export default MenuModal;

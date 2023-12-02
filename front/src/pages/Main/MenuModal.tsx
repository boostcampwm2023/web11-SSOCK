import { useNavigate, NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import mock from '../../mockdata.json'; // temporary

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
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0.625rem 1.25rem rgba(255, 255, 255, 0.25),
    0 0.625rem 1.25rem rgba(255, 255, 255, 0.25);
  font: ${props => props.theme.font['--normal-main-header-font']};
  color: white;
`;

const StyledSection = styled.div`
  padding: 5%;
  word-break: break-all;
  cursor: pointer;
`;

const StyledUser = styled(StyledSection)`
  font-size: 1.125rem;
`;

const StyledLogout = styled(StyledSection)`
  color: ${props => props.theme.colors['--primary-red-primary']};
  font-family: 'Pretendard-Regular';
  font-weight: bold;
`;

const StyledClosed = styled(StyledSection)`
  text-align: center;
`;

const Logout = (navigate: NavigateFunction) => {
  // sessionStorage 등 정리, 로그아웃 절차 진행

  navigate('/');
};

const MenuModal = (props: ModalProps) => {
  const userName = mock.user_data.nickname;
  const navigate = useNavigate();

  return (
    <StyledModal>
      <StyledUser>{userName}님</StyledUser>
      <hr />

      <StyledSection
        onClick={() => {
          props.set(false);
          props.list(true);
        }}
      >
        편지 리스트로 보기
      </StyledSection>

      <StyledLogout onClick={() => Logout(navigate)}>로그아웃</StyledLogout>
      <hr />

      <StyledClosed onClick={() => props.set(false)}>닫기</StyledClosed>
    </StyledModal>
  );
};

export default MenuModal;

import { useNavigate, NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme';
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
  background-color: ${theme.colors['--sub-text']};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 10px 10px rgba(255, 255, 255, 0.22);
  font: ${theme.font['--normal-main-header-font']};
  color: white;
`;

const StyledSection = styled.div`
  padding: 5%;
  word-break: break-all;
  cursor: pointer;
`;

const StyledUser = styled(StyledSection)`
  font-size: 18px;
`;

const StyledLogout = styled(StyledSection)`
  color: ${theme.colors['--primary-red-primary']};
`;

const StyledClosed = styled(StyledSection)`
  text-align: center;
`;

const Logout = (navigate: NavigateFunction) => {
  // sessionStorage 등 정리, 로그아웃 절차 진행

  navigate('/');
};

const MenuModal = (props: ModalProps) => {
  const userName = mock.user_name;
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

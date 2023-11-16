import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary

interface HeaderProps {
  Ref: React.RefObject<HTMLDivElement> | null;
}

const StyledHeader = styled.div`
  font: ${theme.font['--normal-main-header-font']};
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
  position: absolute;
  top: 5%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, 0);
  color: white;

  @keyframes fadeInUp1 {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
  }
`;

const StyledUser = styled.span`
  color: ${theme.colors['--nick-name']};
  font-size: 20px;
`;

const HeaderText = (props: HeaderProps) => {
  const userName = mock.user_name;

  return (
    <StyledHeader ref={props ? props.Ref : null}>
      <StyledUser>{userName}</StyledUser>님의 스노우볼
    </StyledHeader>
  );
};

export default HeaderText;

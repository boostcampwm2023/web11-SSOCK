import styled from 'styled-components';

interface HeaderProps {
  Ref: React.RefObject<HTMLDivElement> | null;
  userName: string;
}

const StyledHeader = styled.div`
  font: ${props => props.theme.font['--normal-main-header-font']};
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;

  white-space: nowrap;
  color: white;

  display: flex;
  justify-content: center;
  text-align: center;

  @keyframes fadeInUp1 {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, -100%);
    }
  }
`;

const StyledUser = styled.span`
  color: ${props => props.theme.colors['--nick-name']};
  font-size: 1.5rem;
`;

const HeaderText = (props: HeaderProps) => {
  return (
    <StyledHeader ref={props ? props.Ref : null}>
      <StyledUser>{props.userName}</StyledUser> 님의 스노우볼
    </StyledHeader>
  );
};

export default HeaderText;

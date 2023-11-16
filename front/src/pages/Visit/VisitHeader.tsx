import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary

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

const StyledLetter = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const StyledLetterImg = styled.img`
  margin-right: 8px;
`;

const VisitHeader = () => {
  const userName = mock.user_name;
  const letterNum = 30;

  return (
    <StyledHeader>
      <StyledUser>{userName}</StyledUser>님의 스노우볼
      <StyledLetter>
        <StyledLetterImg src={'/icons/letter.svg'} />
        {letterNum}개의 편지
      </StyledLetter>
    </StyledHeader>
  );
};

export default VisitHeader;

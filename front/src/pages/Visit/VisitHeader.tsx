import styled from 'styled-components';
import theme from '../../utils/theme';
import { HeaderText } from '../../components';

const StyledLetter = styled.div`
  font: ${theme.font['--normal-main-header-font']};
  font-size: 20px;
  position: absolute;
  top: 10%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  color: white;
`;

const StyledLetterImg = styled.img`
  margin-right: 8px;
`;

const VisitHeader = () => {
  const letterNum = 30;

  return (
    <>
      <HeaderText Ref={null} />
      <StyledLetter>
        <StyledLetterImg src={'/icons/letter.svg'} />
        {letterNum}개의 편지
      </StyledLetter>
    </>
  );
};

export default VisitHeader;

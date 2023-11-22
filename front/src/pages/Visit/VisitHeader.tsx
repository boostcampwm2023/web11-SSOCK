import styled from 'styled-components';
import theme from '../../utils/theme';
import { HeaderText } from '../../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const StyledLetter = styled.div`
  font: ${theme.font['--normal-main-header-font']};
  font-size: 1.25rem;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  color: white;
`;

const StyledLetterImg = styled.img`
  height: 100%;
`;

const VisitHeader = () => {
  const letterNum = 30;

  return (
    <Container>
      <HeaderText Ref={null} />
      <StyledLetter>
        <StyledLetterImg src={'/icons/letter.svg'} />
        {letterNum}개의 편지
      </StyledLetter>
    </Container>
  );
};

export default VisitHeader;

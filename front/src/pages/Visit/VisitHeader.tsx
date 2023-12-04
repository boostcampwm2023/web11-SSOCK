import { useContext } from 'react';
import styled from 'styled-components';
import { Container } from '@utils';
import { HeaderText } from '@components';
import { SnowBallContext } from './SnowBallProvider';

const StyledLetter = styled.div`
  font: ${props => props.theme.font['--normal-main-header-font']};
  font-size: 1.25rem;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  color: white;
  white-space: nowrap;
`;

const StyledLetterImg = styled.img`
  height: 100%;
`;

const VisitHeader = () => {
  const { userData } = useContext(SnowBallContext);

  return (
    <Container>
      <HeaderText Ref={null} userName={userData.nickname} />
      <StyledLetter>
        <StyledLetterImg src={'/icons/letter.svg'} />총 {userData.message_count}
        개의 편지
      </StyledLetter>
    </Container>
  );
};

export default VisitHeader;

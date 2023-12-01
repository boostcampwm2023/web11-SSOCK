import { useContext } from 'react';
import styled from 'styled-components';
import { HeaderText } from '../../components';
import { SnowBallContext } from './SnowBallProvider';

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
        <StyledLetterImg src={'/icons/letter.svg'} />
        {userData.message_count}개의 편지
      </StyledLetter>
    </Container>
  );
};

export default VisitHeader;

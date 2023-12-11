import { useContext } from 'react';
import styled from 'styled-components';
import { Container } from '@utils';
import { HeaderText } from '@components';
import { SnowBallContext } from './SnowBallProvider';
import { MessageListContext } from './MessageListProvider';

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
  const { messageList } = useContext(MessageListContext);

  return (
    <Container>
      <HeaderText Ref={null} userName={userData.nickname} />
      <StyledLetter>
        <StyledLetterImg src={'/icons/letter.svg'} />
        {messageList.length}/30
      </StyledLetter>
    </Container>
  );
};

export default VisitHeader;

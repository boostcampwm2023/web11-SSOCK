import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Container } from '@utils';
import { MessageListRecoil, SnowBallRecoil } from '@states';
import { HeaderText } from '@components';

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

const HomeBtn = styled.img`
  position: fixed;
  z-index: 99;
  top: 1rem;
  left: 0.2rem;
  width: 2.5rem;
  height: 2.5rem;
  filter: invert(1);
`;

const VisitHeader = () => {
  const navigate = useNavigate();
  const messageList = useRecoilValue(MessageListRecoil);
  const { userData } = useRecoilValue(SnowBallRecoil);

  return (
    <Container>
      <HomeBtn onClick={() => navigate('/')} src="/icons/home.svg" />
      <HeaderText Ref={null} userName={userData.nickname} />
      <StyledLetter>
        <StyledLetterImg src={'/icons/letter.svg'} />
        {messageList.length}/30
      </StyledLetter>
    </Container>
  );
};

export default VisitHeader;

import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';
import { HeaderText } from '@components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  gap: 1rem;
`;

const MessageCount = styled.span`
  font: ${props => props.theme.font['--normal-main-header-font']};
  color: white;
  display: flex;
  gap: 0.5rem;
`;

const PrivateButton = styled.img`
  display: inline;
  pointer-events: all;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  animation: fadeIn 1s forwards;
`;



const MainHeader = (): JSX.Element => {
  const { userData, snowBallData } = useContext(SnowBallContext);
  const headerRef = useRef<HTMLDivElement>(null);
  const [modalToast, setModalToast] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);



  const privateClick = () => {
    setIsModalOpened(true);
  };

  return (
    <>
      <Container ref={headerRef}>
        <HeaderText Ref={null} userName={userData.nickname} />
        <MessageCount>
          <img style={{ pointerEvents: 'none' }} src="/icons/letter.svg" />총{' '}
          {userData.message_count}개의 메시지
        </MessageCount>

        {modalToast ? (
          <div style={{ width: '2rem', height: '2rem' }} />
        ) : (
          <>
            {snowBallData.is_message_private ? (
              <PrivateButton
                id="lock"
                onClick={privateClick}
                src="/icons/lock.svg"
              />
            ) : (
              <PrivateButton
                id="lock"
                onClick={privateClick}
                src="/icons/unlock.svg"
              />
            )}
          </>
        )}
        
      </Container>
    </>
  );
};

export default MainHeader;

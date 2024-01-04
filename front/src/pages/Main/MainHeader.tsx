import { useContext } from 'react';
import styled from 'styled-components';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';
import { HeaderText } from '@components';

interface MainHeaderProps {
  set: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  gap: 1rem;
  animation: fadeIn 2s forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  animation: fadeIn 2s forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MainHeader = (props: MainHeaderProps): JSX.Element => {
  const { userData, snowBallData } = useContext(SnowBallContext);

  const privateClick = () => {
    props.set[1](true);
  };

  return (
    <>
      <Container key="MainHeader">
        <HeaderText Ref={null} userName={userData.nickname} />
        <MessageCount>
          <img style={{ pointerEvents: 'none' }} src="/icons/letter.svg" />총{' '}
          {userData.message_count}개의 메시지
        </MessageCount>

        {snowBallData.is_message_private ? (
          <PrivateButton
            key="lock"
            onClick={privateClick}
            src="/icons/lock.svg"
          />
        ) : (
          <PrivateButton
            key="unlock"
            onClick={privateClick}
            src="/icons/unlock.svg"
          />
        )}
      </Container>
    </>
  );
};

export default MainHeader;

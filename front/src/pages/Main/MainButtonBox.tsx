import { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { Container } from '@utils';
import { HeaderText } from '@components';
import MenuModal from './MenuModal';
import ListMsgs from './ListMsgs';
import LockModal from './LockModal';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';
import Introduce from '@pages/Intro/Introduce';
interface MainButtonBoxProps {
  leftArrow: React.RefObject<HTMLImageElement>;
  rightArrow: React.RefObject<HTMLImageElement>;
}

const StyledMenu = styled.img`
  position: fixed;
  top: 3.5rem;
  right: 0.8rem;
  width: 2rem;
  height: 2rem;
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

const StyledScreen = styled.img`
  width: 2rem;
  height: 2rem;
  position: absolute;
  bottom: 2rem;
  margin-left: 0.8rem;
`;

const StyledShareLink = styled.img`
  width: 2rem;
  height: 2rem;
  position: absolute;
  bottom: 2rem;
  right: 0.8rem;
`;

const ToastMsg = styled.div`
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${props => props.theme.font['--normal-button-font']};
  background-color: ${props => props.theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
`;

const EmptyDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: all;
`;

const screenTime = (
  setScreen: React.Dispatch<React.SetStateAction<boolean>>,
  refs: Array<React.RefObject<HTMLDivElement>>
) => {
  const bottoms = 2;

  refs.forEach((ref, idx) => {
    if (ref.current) {
      ref.current.style.setProperty(
        'animation',
        `${idx >= bottoms ? 'fadeOutDown' : 'fadeOutUp'} 1s forwards`
      );
    }
  });

  const music = document.getElementById('musicController');
  music ? (music.style.display = 'none') : null;

  const prev = document.getElementById('prevBtn');
  prev ? (prev.style.display = 'none') : null;

  setTimeout(() => {
    setScreen(true);
  }, 1000);
};

const uiOn = (
  setScreen: React.Dispatch<React.SetStateAction<boolean>>,
  refs: Array<React.RefObject<HTMLDivElement>>
) => {
  const music = document.getElementById('musicController');
  music ? (music.style.display = 'block') : null;

  const prev = document.getElementById('prevBtn');
  prev ? (prev.style.display = 'block') : null;
  refs.forEach(ref => {
    if (ref.current) {
      ref.current.style.setProperty('animation', `fadeInUp 0s forwards`);
    }
  });
  setScreen(false);
};

const MainButtonBox = (props: MainButtonBoxProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLImageElement>(null);
  const shareLinkRef = useRef<HTMLImageElement>(null);

  const [menuModal, setMenuModal] = useState(false);
  const [list, setList] = useState(false);
  const [screen, setScreen] = useState(false);
  const [toast, setToast] = useState(false);
  const [modalToast, setModalToast] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [setIntro, setShowIntro] = useState(false);

  const { snowBallData } = useContext(SnowBallContext);
  const { userData } = useContext(SnowBallContext);

  const shareLink = () => {
    const userID = userData.auth_id;
    const url = `https://www.mysnowball.kr/visit/${userID}`;

    if (navigator.share === undefined) {
      navigator.clipboard.writeText(url);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
    } else {
      navigator.clipboard.writeText(url);
      navigator
        .share({
          url: url
        })
        .then(() => {
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 1000);
        })
        .catch(() => {
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 1000);
        });
    }
  };

  const privateClick = () => {
    setIsModalOpened(true);
  };

  return (
    <>
      {!screen ? (
        <>
          {isModalOpened ? (
            <LockModal
              toast={modalToast}
              setToast={setModalToast}
              flag={isModalOpened}
              set={setIsModalOpened}
            />
          ) : null}

          <Container ref={headerRef}>
            <HeaderText Ref={null} userName={userData.nickname} />
            <MessageCount>
              <img style={{ pointerEvents: 'none' }} src="/icons/letter.svg" />
              총 {userData.message_count}개의 메시지
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

          {list ? null : (
            <StyledMenu
              ref={menuRef}
              src={'/icons/menu.svg'}
              onClick={() => setMenuModal(true)}
            />
          )}

          {menuModal ? (
            <MenuModal
              intro={[setIntro, setShowIntro]}
              set={setMenuModal}
              list={setList}
            />
          ) : null}

          {setIntro ? (
            <>
              <Introduce view={[setIntro, setShowIntro]} />
            </>
          ) : null}

          <StyledScreen
            ref={screenRef}
            src={'/icons/screen.svg'}
            onClick={() =>
              screenTime(setScreen, [
                headerRef,
                menuRef,
                screenRef,
                shareLinkRef,
                props.leftArrow,
                props.rightArrow
              ])
            }
          />

          <StyledShareLink
            ref={shareLinkRef}
            src={'/icons/shareLink.svg'}
            onClick={shareLink}
          />

          {list ? <ListMsgs set={setList} /> : null}
          {toast ? <ToastMsg>링크가 복사되었습니다.</ToastMsg> : null}
          {modalToast ? (
            <ToastMsg>
              {snowBallData.is_message_private
                ? '메세지가 비공개 되었습니다.'
                : '메세지가 공개 되었습니다.'}
            </ToastMsg>
          ) : null}
        </>
      ) : (
        <EmptyDiv
          onClick={() => uiOn(setScreen, [props.leftArrow, props.rightArrow])}
        />
      )}
    </>
  );
};

export default MainButtonBox;

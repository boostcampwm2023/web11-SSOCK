import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from '@utils';
import { HeaderText } from '@components';
import MenuModal from './MenuModal';
import ListMsgs from './ListMsgs';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';
import { theme } from '@utils';

interface MainButtonBoxProps {
  leftArrow: React.RefObject<HTMLImageElement>;
  rightArrow: React.RefObject<HTMLImageElement>;
}

const StyledMenu = styled.img`
  position: fixed;
  top: 3.5rem;
  right: 0.8rem;
`;

const StyledScreen = styled.img`
  position: absolute;
  bottom: 2rem;
  margin-left: 0.8rem;
`;

const StyledShareLink = styled.img`
  position: absolute;
  bottom: 2rem;
  right: 0.8rem;
`;

const ToastMsg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${theme.font['--normal-button-font']};
  background-color: ${theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
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
  const a = document.getElementById('musicController');
  if (a) {
    a.style.display = 'none';
  }

  setTimeout(() => {
    setScreen(true);
  }, 1000);

  setTimeout(() => {
    setScreen(false);
    if (a) {
      a.style.display = 'block';
    }
    refs.forEach(ref => {
      if (ref.current) {
        ref.current.style.setProperty('animation', 'none');
      }
    });
  }, 5000);
};

const MainButtonBox = (props: MainButtonBoxProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLImageElement>(null);
  const shareLinkRef = useRef<HTMLImageElement>(null);
  const { userData } = useContext(SnowBallContext);
  const [menuModal, setMenuModal] = useState(false);
  const [list, setList] = useState(false);
  const [screen, setScreen] = useState(false);

  const [toast, setToast] = useState(false);

  const shareLink = () => {
    axios.get('/api/user', { withCredentials: true }).then(res => {
      const user = res.data.user.auth_id;

      const url = `https://www.mysnowball.kr/visit/${user}`;
      if (navigator.share === undefined) {
        navigator.clipboard.writeText(url);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 1000);
      } else {
        navigator.share({
          url: url
        });
      }
    });
  };

  return (
    <>
      {!screen ? (
        <>
          <Container>
            <HeaderText Ref={headerRef} userName={userData.nickname} />
          </Container>

          {list ? null : (
            <StyledMenu
              ref={menuRef}
              src={'/icons/menu.svg'}
              onClick={() => setMenuModal(true)}
            />
          )}

          {menuModal ? <MenuModal set={setMenuModal} list={setList} /> : null}

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
        </>
      ) : null}
    </>
  );
};

export default MainButtonBox;

import { useState, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import MenuModal from './MenuModal';
import ListMsg from './ListMsg';
import mock from '../../mockdata.json'; // temporary

const StyledHeader = styled.div`
  font: ${theme.font['--normal-main-header-font']};
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
  position: absolute;
  top: 5%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, 0);
  color: white;

  @keyframes fadeInUp {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-50%, -100%, 0);
    }
  }
`;

const StyledUser = styled.span`
  color: ${theme.colors['--nick-name']};
  font-size: 20px;
`;

const StyledMenu = styled.img`
  position: absolute;
  top: 4%;
  right: 4%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    left: 50%;
    margin-left: 450px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-50%, -100%, 0);
    }
  }
`;

const StyledScreen = styled.img`
  position: absolute;
  bottom: 5%;
  margin-left: 4%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    margin-left: 0;
    right: 50%;
    margin-right: 450px;
  }

  @keyframes fadeInDown {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-50%, 100%, 0);
    }
  }
`;

const StyledShareLink = styled.img`
  position: absolute;
  bottom: 5%;
  right: 4%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    left: 50%;
    margin-left: 450px;
  }

  @keyframes fadeInDown {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-50%, 100%, 0);
    }
  }
`;

const screenTime = (
  setScreen: React.Dispatch<React.SetStateAction<boolean>>,
  headerRef: React.RefObject<HTMLDivElement>,
  menuRef: React.RefObject<HTMLImageElement>,
  screenRef: React.RefObject<HTMLImageElement>,
  shareLinkRef: React.RefObject<HTMLImageElement>
) => {
  if (headerRef.current) {
    headerRef.current.style.setProperty('animation', 'fadeInUp 1s forwards');
  }
  if (menuRef.current) {
    menuRef.current.style.setProperty('animation', 'fadeInUp 1s forwards');
  }
  if (screenRef.current) {
    screenRef.current.style.setProperty('animation', 'fadeInDown 1s forwards');
  }
  if (shareLinkRef.current) {
    shareLinkRef.current.style.setProperty(
      'animation',
      'fadeInDown 1s forwards'
    );
  }

  setTimeout(() => {
    setScreen(true);
  }, 1000);

  setTimeout(() => {
    setScreen(false);

    if (headerRef.current) {
      headerRef.current.style.setProperty('animation', 'none');
    }
    if (menuRef.current) {
      menuRef.current.style.setProperty('animation', 'none');
    }
    if (screenRef.current) {
      screenRef.current.style.setProperty('animation', 'none');
    }
    if (shareLinkRef.current) {
      shareLinkRef.current.style.setProperty('animation', 'none');
    }
  }, 5000);
};

const MainButtonBox = () => {
  const userName = mock.user_name;

  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLImageElement>(null);
  const shareLinkRef = useRef<HTMLImageElement>(null);

  const [menuModal, setMenuModal] = useState(false);
  const [list, setList] = useState(false);
  const [screen, setScreen] = useState(false);
  const [shareLink, setShareLink] = useState(false);

  return (
    <>
      {!screen ? (
        <>
          <StyledHeader ref={headerRef}>
            <StyledUser>{userName}</StyledUser>님의 스노우볼
          </StyledHeader>

          <StyledMenu
            ref={menuRef}
            src={'/buttons/menu.svg'}
            onClick={() => setMenuModal(true)}
          />
          {menuModal ? <MenuModal set={setMenuModal} list={setList} /> : null}

          <StyledScreen
            ref={screenRef}
            src={'/buttons/screen.svg'}
            onClick={() =>
              screenTime(setScreen, headerRef, menuRef, screenRef, shareLinkRef)
            }
          />

          <StyledShareLink
            ref={shareLinkRef}
            src={'/buttons/shareLink.svg'}
            onClick={() => setShareLink(true)}
          />
          {shareLink ? <div>shareLink</div> : null}

          {list ? <ListMsg /> : null}
        </>
      ) : null}
    </>
  );
};

export default MainButtonBox;

import { useState, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import MenuModal from './MenuModal';
import ListMsg from './ListMsg';
import { HeaderText } from '../../components';

const StyledMenu = styled.img`
  position: absolute;
  top: 4%;
  right: 4%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    left: 50%;
    margin-left: 450px;
  }

  @keyframes fadeInUp2 {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, -60%);
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
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, 5%);
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
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, 5%);
    }
  }
`;

const screenTime = (
  setScreen: React.Dispatch<React.SetStateAction<boolean>>,
  refs: Array<React.RefObject<HTMLDivElement>>
) => {
  const bottoms = 2;
  const topFirst = 0;

  refs.forEach((ref, idx) => {
    if (ref.current) {
      ref.current.style.setProperty(
        'animation',
        `${
          idx >= bottoms
            ? 'fadeInDown'
            : idx === topFirst
            ? 'fadeInUp1'
            : 'fadeInUp2'
        } 1s forwards`
      );
    }
  });

  setTimeout(() => {
    setScreen(true);
  }, 1000);

  setTimeout(() => {
    setScreen(false);

    refs.forEach(ref => {
      if (ref.current) {
        ref.current.style.setProperty('animation', 'none');
      }
    });
  }, 5000);
};

const MainButtonBox = () => {
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
          <HeaderText Ref={headerRef} />

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
              screenTime(setScreen, [
                headerRef,
                menuRef,
                screenRef,
                shareLinkRef
              ])
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

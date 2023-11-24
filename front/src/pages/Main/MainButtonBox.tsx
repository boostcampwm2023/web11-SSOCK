import { useState, useRef } from 'react';
import styled from 'styled-components';
import MenuModal from './MenuModal';
import ListMsg from './ListMsg';
import { HeaderText } from '../../components';

const StyledMenu = styled.img`
  position: fixed;
  top: 3.5rem;
  right: 0.8rem;

  @keyframes fadeInUp1 {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, -100%);
    }
  }
`;

const StyledScreen = styled.img`
  position: absolute;
  bottom: 2rem;
  margin-left: 0.8rem;

  @keyframes fadeInDown {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, 2rem);
    }
  }
`;

const StyledShareLink = styled.img`
  position: absolute;
  bottom: 2rem;
  right: 0.8rem;

  @keyframes fadeInDown {
    from {
      opacity: 1;
      transform: translate(0, 0);
    }
    to {
      opacity: 0;
      transform: translate(0, 2rem);
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
            : 'fadeInUp1'
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

interface MainButtonBoxProps {
  leftArrow: React.RefObject<HTMLImageElement>;
  rightArrow: React.RefObject<HTMLImageElement>;
}

const MainButtonBox = (props: MainButtonBoxProps) => {
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
            src={'/icons/menu.svg'}
            onClick={() => setMenuModal(true)}
          />
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
            onClick={() => setShareLink(true)}
          />
          {shareLink ? <div>shareLink</div> : null}

          {list ? <ListMsg set={setList} /> : null}
        </>
      ) : null}
    </>
  );
};

export default MainButtonBox;

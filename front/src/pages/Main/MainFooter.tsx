import styled from 'styled-components';
import { useContext, useRef, useEffect } from 'react';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';

interface MainFooterProps {
  set: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  toast: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  animation: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  hamburger: React.MutableRefObject<HTMLImageElement | null>;
}

const StyledFooter = styled.footer`
  width: 100%;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  animation: fadeIn 1s forwards;
`;

const StyledScreen = styled.img`
  width: 2rem;
  height: 2rem;
`;

const StyledShareLink = styled.img`
  width: 2rem;
  height: 2rem;
`;

const MainFooter = (props: MainFooterProps): JSX.Element => {
  const { userData } = useContext(SnowBallContext);
  const FooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.animation[0]) {
      FooterRef.current?.setAttribute('style', 'animation: fadeOut 1s forwards');
    }
  }, [props.animation]);

  const shareLink = () => {
    const userID = userData.auth_id;
    const url = `https://www.mysnowball.kr/visit/${userID}`;

    if (navigator.share === undefined) {
      navigator.clipboard.writeText(url);
      props.toast[1](true);
      setTimeout(() => {
        props.toast[1](false);
      }, 1000);
    } else {
      navigator.clipboard.writeText(url);
      navigator
        .share({
          url: url
        })
        .then(() => {
          props.toast[1](true);
          setTimeout(() => {
            props.toast[1](false);
          }, 1000);
        })
        .catch(() => {
          props.toast[1](true);
          setTimeout(() => {
            props.toast[1](false);
          }, 1000);
        });
    }
  };

  const setScreen = (
    setBool: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const music = document.getElementById('musicController');
    const prev = document.getElementById('prevBtn');

    //music display none fadeout
    music?.setAttribute('style', 'animation: fadeOut 1s forwards');
    prev?.setAttribute('style', 'animation: fadeOut 1s forwards');

    const hamburger = props.hamburger.current;
    hamburger?.setAttribute('style', 'animation: fadeOut 1s forwards');
    props.animation[1](true);
    setTimeout(() => {
      setBool(false);
      props.animation[1](false);
    }, 1000);
  };

  return (
    <>
      <StyledFooter key="MainFooter" ref={FooterRef} >
        <StyledScreen
          src={'/icons/screen.svg'}
          onClick={() => {
            setScreen(props.set[1]);
          }}
        />

        <StyledShareLink src={'/icons/shareLink.svg'} onClick={shareLink} />
      </StyledFooter>
    </>
  );
};

export default MainFooter;

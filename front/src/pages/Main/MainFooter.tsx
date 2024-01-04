import styled from 'styled-components';
import { useContext } from 'react';
import { SnowBallContext } from '@pages/Visit/SnowBallProvider';

interface MainFooterProps {
  set: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  toast: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledFooter = styled.footer`
  width: 100%;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
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

    music?.setAttribute('style', 'display: none');
    prev?.setAttribute('style', 'display: none');
    setBool(false);
  };

  return (
    <>
      <StyledFooter key="MainFooter">
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

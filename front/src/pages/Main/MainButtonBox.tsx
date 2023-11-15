import { useState } from 'react';
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
`;

const StyledZoom = styled.img`
  position: absolute;
  bottom: 5%;
  margin-left: 4%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    margin-left: 0;
    right: 50%;
    margin-right: 450px;
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
`;

const zoomTime = (setZoom: React.Dispatch<React.SetStateAction<boolean>>) => {
  setZoom(true);
  setTimeout(() => {
    setZoom(false);
  }, 5000);
};

const MainButtonBox = () => {
  const userName = mock.user_name;

  const [menuModal, setMenuModal] = useState(false);
  const [list, setList] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [shareLink, setShareLink] = useState(false);

  return (
    <>
      {!zoom ? (
        <>
          <StyledHeader>
            <StyledUser>{userName}</StyledUser>님의 스노우볼
          </StyledHeader>

          <StyledMenu
            src={'/buttons/menu.svg'}
            onClick={() => setMenuModal(true)}
          />
          {menuModal ? <MenuModal set={setMenuModal} list={setList} /> : null}

          <StyledZoom
            src={'/buttons/zoom.svg'}
            onClick={() => zoomTime(setZoom)}
          />

          <StyledShareLink
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

import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import MenuModal from './MenuModal';
import ListMsg from './ListMsg';

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

const MainButtonBox = () => {
  const [menuModal, setMenuModal] = useState(false);
  const [list, setList] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [shareLink, setShareLink] = useState(false);

  return (
    <>
      <StyledMenu
        src={'./buttons/menu.svg'}
        onClick={() => setMenuModal(true)}
      />
      {menuModal ? <MenuModal set={setMenuModal} list={setList} /> : null}

      <StyledZoom src={'./buttons/zoom.svg'} onClick={() => setZoom(true)} />
      {zoom ? <div>clear</div> : null}

      <StyledShareLink
        src={'./buttons/shareLink.svg'}
        onClick={() => setShareLink(true)}
      />
      {shareLink ? <div>shareLink</div> : null}

      {list ? <ListMsg /> : null}
    </>
  );
};

export default MainButtonBox;

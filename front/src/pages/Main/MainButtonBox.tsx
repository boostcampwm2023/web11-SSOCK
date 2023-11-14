import { useState } from 'react';
import styled from 'styled-components';
import MenuModal from './MenuModal';

const StyledMenu = styled.img`
  position: absolute;
  top: 4%;
  right: 2%;
  transform: translate(-50%, 0);
`;

const MainButtonBox = () => {
  const [menuModal, setMenuModal] = useState(false);

  return (
    <>
      <StyledMenu
        src={'./buttons/menu.svg'}
        onClick={() => setMenuModal(true)}
      />
      {menuModal ? <MenuModal set={setMenuModal} /> : null}
    </>
  );
};

export default MainButtonBox;

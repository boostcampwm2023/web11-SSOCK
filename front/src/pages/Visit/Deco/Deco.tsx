import { useContext, useEffect } from 'react';
import { Prev, UIContainer } from '@components';
import Steps from './Steps';
import DecoCavnas from './DecoCanvas/DecoCanvas';
const Deco = () => {
  return (
    <>
      <DecoCavnas />
      <UIContainer>
        <Steps />
      </UIContainer>
      <Prev set={null} />
    </>
  );
};

export default Deco;

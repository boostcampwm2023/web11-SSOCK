import { Prev, UIContainer } from '@components';
import Steps from './Steps';
import DecoCavnas from './DecoCanvas/DecoCanvas';
import { useContext, useEffect } from 'react';
import { DecoContext } from './DecoProvider';

const Deco = () => {
  const { setDecoID, setColor, setLetterID, setContent, setSender } =
    useContext(DecoContext);

  useEffect(() => {
    setDecoID(1);
    setColor('#ff0000');
    setLetterID(1);
    setContent('');
    setSender('');
  }, []);

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

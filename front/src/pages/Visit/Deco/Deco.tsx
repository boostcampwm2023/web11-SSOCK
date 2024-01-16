import { Prev, UIContainer } from '@components';
import DecoCavnas from './DecoCanvas/DecoCanvas';
import Steps from './Steps';

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

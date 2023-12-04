import { Prev, UIContainer } from '../../../components';
import { DecoProvider } from './DecoProvider';
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

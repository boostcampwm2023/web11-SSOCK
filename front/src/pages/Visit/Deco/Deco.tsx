import { Prev } from '../../../components';
import { DecoProvider } from './DecoProvider';
import Steps from './Steps';
import DecoCavnas from './DecoCanvas/DecoCanvas';
import { UIContainer } from '../../../components/UIContainer';

const Deco = () => {
  return (
    <>
    <DecoProvider>
      <DecoCavnas />


      <UIContainer>
      <Steps />
      </UIContainer>
      <Prev set={null} />
      </DecoProvider>
    </>
  );
};

export default Deco;

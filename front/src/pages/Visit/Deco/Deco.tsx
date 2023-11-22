import { HeaderText, Prev } from '../../../components';
import { DecoProvider } from './DecoProvider';
import Steps from './Steps';
import DecoCavnas from './DecoCanvas/DecoCanvas';
import TestBtn from './TestBtn';

const Deco = () => {
  return (
    <DecoProvider>
      <DecoCavnas />
      <Prev set={null} />
      <HeaderText Ref={null} />
      <Steps />
      <TestBtn />
    </DecoProvider>
  );
};

export default Deco;

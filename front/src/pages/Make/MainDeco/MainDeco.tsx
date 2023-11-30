import { Prev, UIContainer } from '../../../components';
import Steps from './Steps';
import { DecoProvider } from './DecoProvider';
import MakeSnowballCanvas from './MakeSnowballCanvas';

const MainDeco = () => {
  return (
    <DecoProvider>
      <MakeSnowballCanvas />
      <UIContainer>
        <Steps />
      </UIContainer>
      <Prev set={null} />
    </DecoProvider>
  );
};

export default MainDeco;

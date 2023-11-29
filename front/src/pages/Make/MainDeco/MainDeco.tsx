import { UIContainer } from '../../../components';
import Steps from './Steps';
import { SnowballNameProvider } from './SnowballNameProvider';

const MainDeco = () => {
  return (
    <SnowballNameProvider>
      <UIContainer>
        <Steps />
      </UIContainer>
    </SnowballNameProvider>
  );
};

export default MainDeco;

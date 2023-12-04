import { Prev, UIContainer } from '@components';
import Steps from './Steps';
import { DecoProvider } from './DecoProvider';
import MakeSnowballCanvas from './MakeSnowballCanvas';

interface MainDecoProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainDeco = (props: MainDecoProps) => {
  return (
    <DecoProvider>
      <MakeSnowballCanvas />
      <UIContainer>
        <Steps />
      </UIContainer>
      <Prev set={props.set} />
    </DecoProvider>
  );
};

export default MainDeco;

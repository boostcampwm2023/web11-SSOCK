import { Prev, UIContainer } from '@components';
import Steps from './Steps';
import MakeSnowballCanvas from './MakeSnowballCanvas';
import { DecoProvider } from './DecoProvider';

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

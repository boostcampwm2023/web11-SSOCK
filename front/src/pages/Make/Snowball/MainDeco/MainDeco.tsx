import { Prev, UIContainer } from '@components';
import Steps from './Steps';
import MakeSnowballCanvas from './MakeSnowballCanvas';

interface MainDecoProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainDeco = (props: MainDecoProps) => {
  return (
    <>
      <MakeSnowballCanvas />
      <UIContainer>
        <Steps />
      </UIContainer>
      <Prev set={props.set} />
    </>
  );
};

export default MainDeco;

import { Prev, UIContainer } from '@components';
import MakeSnowballCanvas from './MakeSnowballCanvas';
import Steps from './Steps';

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

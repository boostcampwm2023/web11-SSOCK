import { Prev } from '../../../components';
import { DecoProvider } from './DecoProvider';
import Steps from './Steps';
import DecoCavnas from './DecoCanvas/DecoCanvas';
import { UIContainer } from '../../../components/UIContainer';
import { SnowBallProvider } from '../SnowBallProvider';

const Deco = () => {
  return (
    <>
      <DecoProvider>
        <SnowBallProvider>
          <DecoCavnas />

          <UIContainer>
            <Steps />
          </UIContainer>
          <Prev set={null} />
        </SnowBallProvider>
      </DecoProvider>
    </>
  );
};

export default Deco;

import { SnowGlobeCanvas, HeaderText, Prev } from '../../../components';
import Steps from './Steps';

const Deco = () => {
  return (
    <>
      <SnowGlobeCanvas />
      <Prev set={null} />
      <HeaderText Ref={null} />
      <Steps />
    </>
  );
};

export default Deco;

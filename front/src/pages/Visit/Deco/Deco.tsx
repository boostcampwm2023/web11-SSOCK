// import styled from 'styled-components';
// import theme from '../../../utils/theme';
import { SnowGlobeCanvas, HeaderText, Prev } from '../../../components';
import Steps from './Steps';

const Deco = () => {
  return (
    <>
      <SnowGlobeCanvas />
      <Prev />
      <HeaderText Ref={null} />
      <Steps />
      {/* steps 추후 구현 */}
    </>
  );
};

export default Deco;

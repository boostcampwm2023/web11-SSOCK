import { SnowGlobeCanvas, UIContainer } from '../../components';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import VisitBottom from './VisitBottom';

const Visit = () => {
  return (
    <>
      <SnowGlobeCanvas />
      <UIContainer>
        <VisitHeader />
        <VisitBody />
        <VisitBottom />
      </UIContainer>
    </>
  );
};

export default Visit;

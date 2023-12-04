import { SnowGlobeCanvas, UIContainer } from '../../components';
import VisitBottom from './VisitBottom';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';

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

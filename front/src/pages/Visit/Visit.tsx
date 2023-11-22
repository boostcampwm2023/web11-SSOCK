import { SnowGlobeCanvas } from '../../components';
import VisitBottom from './VisitBottom';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import { MessageProvider } from './MessageProvider';
import { UIContainer } from '../../components/UIContainer';

const Visit = () => {
  return (
    <MessageProvider>
      <SnowGlobeCanvas />
      <UIContainer>
        <VisitHeader />
        <VisitBody />
        <VisitBottom />
      </UIContainer>
    </MessageProvider>
  );
};

export default Visit;

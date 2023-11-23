import { SnowGlobeCanvas } from '../../components';
import VisitBottom from './VisitBottom';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import { MessageProvider } from './MessageProvider';
import { UIContainer } from '../../components/UIContainer';
import { SnowBallProvider } from './SnowBallProvider';

const Visit = () => {
  return (
    <MessageProvider>
      <SnowBallProvider>
        <SnowGlobeCanvas />
        <UIContainer>
          <VisitHeader />
          <VisitBody />
          <VisitBottom />
        </UIContainer>
      </SnowBallProvider>
    </MessageProvider>
  );
};

export default Visit;

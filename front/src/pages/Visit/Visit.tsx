import { SnowGlobeCanvas } from '../../components';
import VisitButton from './VisitButton';
import VisitHeader from './VisitHeader';
import { MessageProvider } from './MessageProvider';

const Visit = () => {
  return (
    <MessageProvider>
      <SnowGlobeCanvas />
      <VisitHeader />
      <VisitButton />
    </MessageProvider>
  );
};

export default Visit;

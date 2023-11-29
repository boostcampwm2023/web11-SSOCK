import { SnowGlobeCanvas } from '../../components';
import VisitBottom from './VisitBottom';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import { MessageProvider } from './MessageProvider';
import { UIContainer } from '../../components/UIContainer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { SnowBallContext } from './SnowBallProvider';
import { SnowBallData } from './SnowBallProvider';

const Visit = () => {
  const { user } = useParams();
  const { setSnowBallData } = useContext(SnowBallContext);
  axios(`/api/user/${user}`)
    .then(res => {
      console.log(res);
      setSnowBallData(res.data.main_snowball as SnowBallData);
    })
    .catch(e => console.log(e));

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

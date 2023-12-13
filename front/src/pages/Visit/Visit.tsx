import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loading, axios } from '@utils';
import { SnowGlobeCanvas, UIContainer } from '@components';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import VisitBottom from './VisitBottom';
import { MessageListContext } from '@pages/Visit/MessageListProvider';
import { SnowBallContext, SnowBallData, UserData } from './SnowBallProvider';

const Visit = () => {
  const navigate = useNavigate();
  const { user } = useParams();
  const { setSnowBallData, setUserData, snowBallData } =
    useContext(SnowBallContext);
  const { setMessageList } = useContext(MessageListContext);

  const [isLoading, setIsLoading] = useState(false);

  const getVisitData = async () => {
    try {
      const res = await axios(`/api/user/${user}`)
      setMessageList(res.data.main_snowball.message_list);
      setSnowBallData(res.data.main_snowball as SnowBallData);
      setUserData(res.data.user as UserData);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
      navigate('*');
    }
  };

  useEffect(() => {
     getVisitData();
  }, [navigate, user]);

  return (
    <>
      {isLoading ? (
        <>
          <SnowGlobeCanvas snowBallData={snowBallData} />
          <UIContainer>
            <VisitHeader />
            <VisitBody />
            <VisitBottom />
          </UIContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Visit;

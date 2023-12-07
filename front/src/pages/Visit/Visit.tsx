import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '@utils';
import { SnowGlobeCanvas, UIContainer } from '@components';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import VisitBottom from './VisitBottom';
import { MessageListContext } from '@pages/Visit/MessageListProvider';
import { SnowBallContext, SnowBallData, UserData } from './SnowBallProvider';

const Visit = () => {
  const navigate = useNavigate();
  const { setSnowBallData, setUserData, snowBallData } =
    useContext(SnowBallContext);
  const { setMessageList } = useContext(MessageListContext);
  const { user } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios(`/api/user/${user}`)
      .then(res => {
        setMessageList(res.data.main_snowball.message_list);
        setSnowBallData(res.data.main_snowball as SnowBallData);
        setUserData(res.data.user as UserData);
        setIsLoading(true);
      })
      .catch(e => {
        //없는 유저 조회시 wrong page로 보내버리기
        console.error(e);
        navigate('*');
      });
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

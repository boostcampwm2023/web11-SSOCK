import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '@utils';
import { SnowGlobeCanvas, UIContainer } from '@components';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import VisitBottom from './VisitBottom';
import { SnowBallContext, SnowBallData, UserData } from './SnowBallProvider';

const Visit = () => {
  const navigate = useNavigate();
  const { setSnowBallData, setUserData } = useContext(SnowBallContext);
  const { user } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios(`/api/user/${user}`)
      .then(res => {
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
          <SnowGlobeCanvas />
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

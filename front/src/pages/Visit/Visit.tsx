import { SnowGlobeCanvas, UIContainer } from '@components';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import VisitBottom from './VisitBottom';
import { useContext, useEffect } from 'react';
import { SnowBallContext, SnowBallData, UserData } from './SnowBallProvider';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Visit = () => {
  const navigate = useNavigate();
  const { setSnowBallData, setUserData } = useContext(SnowBallContext);
  const { user } = useParams();
  useEffect(() => {
    axios(`/api/user/${user}`)
      .then(res => {
        setSnowBallData(res.data.main_snowball as SnowBallData);
        setUserData(res.data.user as UserData);
      })
      .catch(e => {
        //없는 유저 조회시 wrong page로 보내버리기
        console.error(e);
        navigate('*');
      });
  }, []);
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

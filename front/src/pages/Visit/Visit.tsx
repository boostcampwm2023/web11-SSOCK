import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loading, axios } from '@utils';
import { SnowGlobeCanvas, UIContainer } from '@components';
import VisitHeader from './VisitHeader';
import VisitBody from './VisitBody';
import VisitBottom from './VisitBottom';
import { MessageListContext, Message } from '@pages/Visit/MessageListProvider';
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
      const res = await axios(`/api/user/${user}`);

      if (res.data.main_snowball.is_message_private === true) {
        const messageList = res.data.main_snowball
          .message_list as Array<Message>;
        const privateMessageList = messageList.map(message => {
          const privateMessage = {
            ...message
          };
          privateMessage.content = '비공개 메시지 입니다.';
          privateMessage.sender = '비공개';
          return privateMessage;
        });
        setMessageList(privateMessageList);
      } else {
        setMessageList(res.data.main_snowball.message_list);
      }

      setSnowBallData(res.data.main_snowball as SnowBallData);
      setUserData(res.data.user as UserData);
      setIsLoading(true);
    } catch {
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

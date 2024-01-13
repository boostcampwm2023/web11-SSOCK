import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { axios } from '@utils';
import { SnowBallRecoil } from '@states';

const useChangePrivate = () => {
  const navigate = useNavigate();
  const [{ snowBallData }, setSnowBallBox] = useRecoilState(SnowBallRecoil);

  const newData = {
    title: snowBallData.title,
    is_message_private: !snowBallData.is_message_private
  };

  const changePrivate = async () => {
    try {
      const res = await axios.put(`/api/snowball/${snowBallData.id}`, newData);
      const resData = Object.assign({}, snowBallData);
      resData.is_message_private = res.data.is_message_private;
      setSnowBallBox(prev => ({ ...prev, snowBallData: resData }));
    } catch (err) {
      console.log(err);
      navigate('*');
    }
  };

  return changePrivate;
};

export default useChangePrivate;

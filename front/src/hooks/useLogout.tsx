import axios from 'axios';
import cookie from 'react-cookies';

const useLogout = () => {
  axios
    .get('/api/auth/logout')
    .then(res => (res.status === 200 ? window.location.replace('/') : null))
    .catch(e => {
      console.error(e);
      cookie.remove('access_token');
      window.location.replace('/');
      alert('로그아웃을 다시 시도해주세요.');
    });
};

export default useLogout;

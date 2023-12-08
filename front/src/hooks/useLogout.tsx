import axios from 'axios';
import cookie from 'react-cookies';

const useLogout = () => {
  axios
    .get('/api/auth/logout')
    .then(res => (res.status === 200 ? window.location.replace('/') : null))
    .catch(e => {
      console.error(e);
      cookie.remove('access_token');
      cookie.remove('refresh_token');
      cookie.remove('loggedin');
      window.location.replace('/');
    });
};

export default useLogout;

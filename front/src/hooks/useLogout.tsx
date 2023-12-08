import cookie from 'react-cookies';

const useLogout = () => {
  window.open(`/api/auth/logout`, '_self');
  cookie.remove('access_token');
  cookie.remove('refresh_token');
  cookie.remove('loggedin');
  window.location.replace('/');
};

export default useLogout;

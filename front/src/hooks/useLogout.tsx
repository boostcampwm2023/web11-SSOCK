import cookie from 'react-cookies';

const useLogout = () => {
  window.open(`/api/auth/logout`, '_self');
  cookie.remove('loggedin');
  window.location.replace('/');
};

export default useLogout;

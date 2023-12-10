import { useCookies } from 'react-cookie';

const useLogout = () => {
  const [, , removeCookie] = useCookies(['loggedin']);
  const logout = () => {
    window.open(`/api/auth/logout`, '_self');
    removeCookie('loggedin', { path: '/' });
    window.location.replace('/');
  };

  return logout;
};

export default useLogout;

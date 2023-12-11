import { useCookies } from 'react-cookie';

const useLogout = () => {
  const [, , removeCookie] = useCookies(['loggedin']);
  const logout = () => {
    window.open(`/api/auth/logout`, '_self');
    removeCookie('loggedin', { path: '/' });
  };

  return logout;
};

export default useLogout;

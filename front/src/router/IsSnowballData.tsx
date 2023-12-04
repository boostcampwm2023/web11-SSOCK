import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const saveCookie = () => {
//   const cookieToken = import.meta.env.VITE_APP_COOKIE_TOKEN;
//   const cookieName = 'access_token';
//   const cookieValue = cookieToken;
//   const today = new Date();
//   const expire = new Date();
//   const secure = true;
//   expire.setDate(today.getDate() + 1);
//   document.cookie = `${cookieName}=${cookieValue}; expires=${expire.toUTCString()}; secure=${secure}; path=/`;
// };

const IsSnowballData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [url, setUrl] = React.useState<string>('');
  const maxSnowball = 5;

  useEffect(() => {
    //saveCookie();
    if (url === '') {
      axios
        .get('/api/user', {
          withCredentials: true // axios 쿠키 값 전달
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            if (data.user.nickname === null) {
              setUrl('/make');
            } else if (
              data.user.nickname !== null &&
              data.main_snowball === null
            ) {
              setUrl('/make/snowball');
            } else if (data.user.snowball_count >= maxSnowball) {
              setUrl('/main');
            } else {
              setUrl('/make/snowball');
            }
          }
        })
        .catch(err => {
          console.log(err);
          navigate('*');
        });
    }
    navigate(url);
  }, [url, navigate]);

  return <>{children}</>;
};

export default IsSnowballData;

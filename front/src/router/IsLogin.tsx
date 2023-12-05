import React, { ReactNode, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  SnowBallContext,
  UserData,
  SnowBallData
} from '@pages/Visit/SnowBallProvider';

const saveCookie = () => {
  const cookieToken = import.meta.env.VITE_APP_COOKIE_TOKEN;
  const cookieName = 'access_token';
  const cookieValue = cookieToken;
  const today = new Date();
  const expire = new Date();
  const secure = true;
  expire.setDate(today.getDate() + 1);
  document.cookie = `${cookieName}=${cookieValue}; expires=${expire.toUTCString()}; secure=${secure}; path=/`;
};

const IsLogin: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [url, setUrl] = React.useState<string>('');
  const { snowBallData, setSnowBallData, setUserData } =
    useContext(SnowBallContext);
  console.log('1.', snowBallData);
  useEffect(() => {
    saveCookie();
    if (url === '') {
      axios
        .get('/api/user', {
          withCredentials: true // axios 쿠키 값 전달
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            setSnowBallData(data.main_snowball as SnowBallData);
            setUserData(data.user as UserData);
            console.log(data);

            if (data.user.nickname === null) {
              setUrl('/make');
              navigate(url);
            } else if (
              data.user.nickname !== null &&
              data.main_snowball === null
            ) {
              setUrl('/make/snowball');
              navigate(url);
            }
          }
        })
        .catch(err => {
          console.error(err);
          navigate('*');
        });
    }
  }, [url, navigate]);

  return <>{children}</>;
};

export default IsLogin;

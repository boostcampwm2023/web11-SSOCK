import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IsLogin: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [url, setUrl] = React.useState<string>('');

  // const cookieToken = import.meta.env.VITE_APP_COOKIE_TOKEN;

  useEffect(() => {
    if (url === '') {
      axios
        .get('/api/user', {
          withCredentials: true // axios 쿠키 값 전달
          // headers: {
          //   Authorization: `Bearer ${cookieToken}` // temporary
          // }
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            console.log(data);
            if (data.user.nickname === null) setUrl('/make');
            else if (data.main_snowball === null) setUrl('/make/snowball');
            else navigate('/main');
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

export default IsLogin;

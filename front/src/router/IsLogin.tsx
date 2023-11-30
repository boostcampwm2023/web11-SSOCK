import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IsLogin: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [url, setUrl] = React.useState<string>('');

  useEffect(() => {
    if (url === '') {
      axios
        .get('/api/user')
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            console.log(data);
            if (data.user.nickname === null) setUrl('/make/nickname');
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

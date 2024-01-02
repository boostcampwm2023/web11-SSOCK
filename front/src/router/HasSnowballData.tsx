import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '@utils';

const HasSnowballData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [url, setUrl] = React.useState<string>('');
  const maxSnowball = 5;

  useEffect(() => {

    if (url === '' || url === '/make' || url === 'main') {
      axios
        .get('/api/user', {
          withCredentials: true
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            if (data.user.nickname === null) {
              setUrl('/make/nickname');
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
        .catch(() => navigate('*'));
    }
    navigate(url);
  }, [url]);

  return <>{children}</>;
};

export default HasSnowballData;

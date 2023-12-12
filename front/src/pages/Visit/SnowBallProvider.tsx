import React, { useState, createContext } from 'react';
import { axios } from '@utils';
import mockData from '@mock';

interface SnowBallData {
  id: number;
  title: string;
  main_decoration_id: number;
  main_decoration_color: string;
  bottom_decoration_id: number;
  bottom_decoration_color: string;
  is_message_private: boolean;
}

interface UserData {
  id: number;
  username: string;
  nickname: string;
  auth_id: string;
  snowball_count: number;
  main_snowball_id: number;
  snowball_list: Array<number>;
  message_count: number;
}

interface SnowBallContextType {
  snowBallData: SnowBallData;
  setSnowBallData: React.Dispatch<React.SetStateAction<SnowBallData>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  changePrivate: () => Promise<void>;
}

const SnowBallContext = createContext<SnowBallContextType>({
  snowBallData: mockData.snowball_data as SnowBallData,
  setSnowBallData: () => {},
  userData: mockData.user_data,
  setUserData: () => {},
  changePrivate: () => Promise.resolve()
});

const SnowBallProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [snowBallData, setSnowBallData] = useState<SnowBallData>(
    mockData.snowball_data as SnowBallData
  );
  const [userData, setUserData] = useState<UserData>(mockData.user_data);

  const changePrivate = async () => {
    const newData = {
      title: snowBallData.title,
      is_message_private: !snowBallData.is_message_private
    };

    const res = await axios.put(`/api/snowball/${snowBallData.id}`, newData);
    const resData = Object.assign({}, snowBallData);
    resData.is_message_private = res.data.is_message_private;
    setSnowBallData(resData);
  };

  return (
    <SnowBallContext.Provider
      value={{
        snowBallData,
        setSnowBallData,
        userData,
        setUserData,
        changePrivate
      }}
    >
      {children}
    </SnowBallContext.Provider>
  );
};

export { SnowBallContext, SnowBallProvider };
export type { SnowBallData, UserData };

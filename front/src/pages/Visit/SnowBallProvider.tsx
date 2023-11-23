import React, { useState, createContext } from 'react';
import mockData from '../../mockdata.json';

interface SnowBallContextType {
  data: SnowBallData;
  setData: React.Dispatch<React.SetStateAction<SnowBallData>>;
}

interface SnowBallData {
  user_id: string;
  user_name: string;
  provider: string;
  created_at: string;
  snowball: Array<SnowBall>;
}

interface SnowBall {
  title: string;
  private: boolean;
  main_deco_id: number;
  created_at: string;
  message: Array<Message>;
}

interface Message {
  message_id: number;
  deco_id: number;
  deco_color: string;
  letter_id: number;
  content: string;
  sender: string;
  created_at: string;
}

const SnowBallContext = createContext<SnowBallContextType>({
  data: mockData,
  setData: () => {}
});

const SnowBallProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = useState<SnowBallData>(mockData);
  return (
    <SnowBallContext.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </SnowBallContext.Provider>
  );
};

export { SnowBallContext, SnowBallProvider };

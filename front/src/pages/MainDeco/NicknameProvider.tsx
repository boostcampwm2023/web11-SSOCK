import React, { useState, createContext } from 'react';

interface NicknameContextType {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

const NicknameContext = createContext<NicknameContextType>({
  nickname: '',
  setNickname: () => {}
});

const NicknameProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [nickname, setNickname] = useState<string>('');
  return (
    <NicknameContext.Provider value={{ nickname, setNickname }}>
      {children}
    </NicknameContext.Provider>
  );
};

export { NicknameProvider, NicknameContext };
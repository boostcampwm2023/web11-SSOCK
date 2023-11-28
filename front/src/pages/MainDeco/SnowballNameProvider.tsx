import React, { useState, createContext } from 'react';

interface NicknameContextType {
  snowballName: string;
  setSnowballName: React.Dispatch<React.SetStateAction<string>>;
}

const SnowballNameContext = createContext<NicknameContextType>({
  snowballName: '',
  setSnowballName: () => {}
});

const SnowballNameProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [snowballName, setSnowballName] = useState<string>('');
  return (
    <SnowballNameContext.Provider value={{ snowballName, setSnowballName }}>
      {children}
    </SnowballNameContext.Provider>
  );
};

export { SnowballNameProvider, SnowballNameContext };
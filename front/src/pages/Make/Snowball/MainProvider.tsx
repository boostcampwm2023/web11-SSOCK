import React, { useState, createContext } from 'react';

interface MainContextType {
  mainID: number;
  setMainID: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = createContext<MainContextType>({
  mainID: 0,
  setMainID: () => {},
  color: '#ff0000',
  setColor: () => {}
});

const MainProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [mainID, setMainID] = useState<number>(0);
  const [color, setColor] = useState<string>('#ff0000');
  return (
    <MainContext.Provider
      value={{
        mainID,
        setMainID,
        color,
        setColor
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainProvider, MainContext };

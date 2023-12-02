import React, { useState, createContext } from 'react';

interface DecoContextType {
  snowballName: string;
  setSnowballName: React.Dispatch<React.SetStateAction<string>>;
  mainDecoID: number;
  setMainDecoID: React.Dispatch<React.SetStateAction<number>>;
  mainColor: string;
  setMainColor: React.Dispatch<React.SetStateAction<string>>;
  bottomID: number;
  setBottomID: React.Dispatch<React.SetStateAction<number>>;
  bottomColor: string;
  setBottomColor: React.Dispatch<React.SetStateAction<string>>;
  letterID: number;
  setLetterID: React.Dispatch<React.SetStateAction<number>>;
}

const DecoContext = createContext<DecoContextType>({
  snowballName: '',
  setSnowballName: () => {},
  mainDecoID: 1,
  setMainDecoID: () => {},
  mainColor: '#ff0000',
  setMainColor: () => {},
  bottomID: 1,
  setBottomID: () => {},
  bottomColor: '#ff0000',
  setBottomColor: () => {},
  letterID: 1,
  setLetterID: () => {}
});

const DecoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [snowballName, setSnowballName] = useState<string>('default');
  const [mainDecoID, setMainDecoID] = useState<number>(1);
  const [mainColor, setMainColor] = useState<string>('#ff0000');
  const [bottomID, setBottomID] = useState<number>(1);
  const [bottomColor, setBottomColor] = useState<string>('#ff0000');
  const [letterID, setLetterID] = useState<number>(1);

  return (
    <DecoContext.Provider
      value={{
        snowballName,
        setSnowballName,
        mainDecoID,
        setMainDecoID,
        mainColor,
        setMainColor,
        bottomID,
        setBottomID,
        bottomColor,
        setBottomColor,
        letterID,
        setLetterID
      }}
    >
      {children}
    </DecoContext.Provider>
  );
};

export { DecoProvider, DecoContext };

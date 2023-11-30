import React, { useState, createContext } from 'react';

interface DecoContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
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
  step: 0,
  setStep: () => {},
  snowballName: '',
  setSnowballName: () => {},
  mainDecoID: 0,
  setMainDecoID: () => {},
  mainColor: '#ff0000',
  setMainColor: () => {},
  bottomID: 0,
  setBottomID: () => {},
  bottomColor: '',
  setBottomColor: () => {},
  letterID: 0,
  setLetterID: () => {}
});

const DecoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [step, setStep] = useState<number>(0);
  const [snowballName, setSnowballName] = useState<string>('');
  const [mainDecoID, setMainDecoID] = useState<number>(0);
  const [mainColor, setMainColor] = useState<string>('#ff0000');
  const [bottomID, setBottomID] = useState<number>(0);
  const [bottomColor, setBottomColor] = useState<string>('');
  const [letterID, setLetterID] = useState<number>(0);

  return (
    <DecoContext.Provider
      value={{
        step,
        setStep,
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

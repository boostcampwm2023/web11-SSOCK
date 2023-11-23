import React, { useState, createContext } from 'react';

interface DecoContextType {
  decoID: number;
  setDecoID: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  letterID: number;
  setLetterID: React.Dispatch<React.SetStateAction<number>>;
}

const DecoContext = createContext<DecoContextType>({
  decoID: 0,
  setDecoID: () => {},
  color: '#ff0000',
  setColor: () => {},
  letterID: 0,
  setLetterID: () => {}
});

const DecoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [decoID, setDecoID] = useState<number>(0);
  const [color, setColor] = useState<string>('#ff0000');
  const [letterID, setLetterID] = useState<number>(0);
  return (
    <DecoContext.Provider
      value={{ decoID, setDecoID, color, setColor, letterID, setLetterID }}
    >
      {children}
    </DecoContext.Provider>
  );
};

export { DecoProvider, DecoContext };

import React, { useState, createContext } from 'react';

interface DecoContextType {
  decoID: number;
  setDecoID: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  letterID: number;
  setLetterID: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sender: string;
  setSender: React.Dispatch<React.SetStateAction<string>>;
  resetDecoContext: () => void;
}

const DecoContext = createContext<DecoContextType>({
  decoID: 1,
  setDecoID: () => {},
  color: '#ff0000',
  setColor: () => {},
  letterID: 1,
  setLetterID: () => {},
  content: '',
  setContent: () => {},
  sender: '',
  setSender: () => {},
  resetDecoContext: () => {}
});

const DecoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [decoID, setDecoID] = useState<number>(1);
  const [color, setColor] = useState<string>('#ff0000');
  const [letterID, setLetterID] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [sender, setSender] = useState<string>('');

  const resetDecoContext = () => {
    setDecoID(1);
    setColor('#ff0000');
    setLetterID(1);
    setContent('');
    setSender('');
  };
  return (
    <DecoContext.Provider
      value={{
        decoID,
        setDecoID,
        color,
        setColor,
        letterID,
        setLetterID,
        content,
        setContent,
        sender,
        setSender,
        resetDecoContext
      }}
    >
      {children}
    </DecoContext.Provider>
  );
};

export { DecoProvider, DecoContext };

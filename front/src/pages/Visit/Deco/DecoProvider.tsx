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
}

const DecoContext = createContext<DecoContextType>({
  decoID: 0,
  setDecoID: () => {},
  color: '#ff0000',
  setColor: () => {},
  letterID: 0,
  setLetterID: () => {},
  content: '',
  setContent: () => {},
  sender: '',
  setSender: () => {}
});

const DecoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [decoID, setDecoID] = useState<number>(0);
  const [color, setColor] = useState<string>('#ff0000');
  const [letterID, setLetterID] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [sender, setSender] = useState<string>('');
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
        setSender
      }}
    >
      {children}
    </DecoContext.Provider>
  );
};

export { DecoProvider, DecoContext };

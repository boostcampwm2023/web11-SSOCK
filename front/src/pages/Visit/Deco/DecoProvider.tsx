import React, { useState, createContext } from 'react';

interface DecoContextType {
  decoID: number;
  setDecoID: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const DecoContext = createContext<DecoContextType>({
  decoID: 0,
  setDecoID: () => {},
  color: '#ff0000',
  setColor: () => {}
});

const DecoProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [decoID, setDecoID] = useState<number>(0);
  const [color, setColor] = useState<string>('#ff0000');
  return (
    <DecoContext.Provider value={{ decoID, setDecoID, color, setColor }}>
      {children}
    </DecoContext.Provider>
  );
};

export { DecoProvider, DecoContext };

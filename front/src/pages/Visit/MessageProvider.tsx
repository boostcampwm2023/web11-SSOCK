import React, { useState, createContext } from 'react';

interface MyContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  sender: string;
  setSender: React.Dispatch<React.SetStateAction<string>>;
}

const MessageContext = createContext<MyContextType>({
  message: '',
  setMessage: () => {},
  color: '',
  setColor: () => {},
  sender: '',
  setSender: () => {}
});

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [message, setMessage] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        color,
        setColor,
        sender,
        setSender
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };

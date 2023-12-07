import React, { useState, createContext } from 'react';

interface MyContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  sender: string;
  setSender: React.Dispatch<React.SetStateAction<string>>;
  messageID: number;
  setMessageID: React.Dispatch<React.SetStateAction<number>>;
}

const MessageContext = createContext<MyContextType>({
  message: '',
  setMessage: () => {},
  color: '',
  setColor: () => {},
  sender: '',
  setSender: () => {},
  messageID: 0,
  setMessageID: () => {}
});

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [message, setMessage] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [messageID, setMessageID] = useState<number>(0);
  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        color,
        setColor,
        sender,
        setSender,
        messageID,
        setMessageID
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };

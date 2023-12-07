import React, { useState, createContext } from 'react';
import mockData from '@mock';

interface Message {
  content: string | undefined;
  created: string;
  decoration_color: string;
  decoration_id: number;
  id: number;
  is_deleted: boolean;
  letter_id: number | undefined;
  location: number;
  opened: string | null;
  sender: string | undefined;
  snowball_id: number;
  user_id: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
}

interface MessageListContextType {
  messageList: Array<Message>;
  setMessageList: React.Dispatch<React.SetStateAction<Array<Message>>>;
}

const MessageListContext = createContext<MessageListContextType>({
  messageList: mockData.snowball_data.message_list as Array<Message>,
  setMessageList: () => {}
});

const MessageListProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [messageList, setMessageList] = useState<Array<Message>>(
    mockData.snowball_data.message_list as Array<Message>
  );
  return (
    <MessageListContext.Provider
      value={{
        messageList,
        setMessageList
      }}
    >
      {children}
    </MessageListContext.Provider>
  );
};

export { MessageListProvider, MessageListContext };
export type { Message };

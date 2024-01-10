import { atom } from 'recoil';

interface MessageType {
  message: string;
  color: string;
  sender: string;
  messageID: number;
}

const MessageRecoil = atom<MessageType>({
  key: 'Message',
  default: {
    message: '',
    color: '',
    sender: '',
    messageID: 0
  }
});

export { MessageRecoil };

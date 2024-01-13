import { atom } from 'recoil';

interface MakeMessage {
  message: string;
  color: string;
  sender: string;
  messageID: number;
}

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

interface MakeDeco {
  snowballName: string;
  mainDecoID: number;
  mainColor: string;
  bottomID: number;
  bottomColor: string;
  letterID: number;
}

interface VisitDeco {
  decoID: number;
  color: string;
  letterID: number;
  content: string;
  sender: string;
}

interface Prev {
  view: boolean;
  isZoom: boolean;
}

const MessageRecoil = atom<MakeMessage>({
  key: 'Message',
  default: {
    message: '',
    color: '',
    sender: '',
    messageID: 0
  }
});

const MessageListRecoil = atom<Array<Message>>({
  key: 'MessageList',
  default: []
});

const MakeDecoRecoil = atom<MakeDeco>({
  key: 'MakeDeco',
  default: {
    snowballName: 'default',
    mainDecoID: 1,
    mainColor: '#ff0000',
    bottomID: 1,
    bottomColor: '#ff0000',
    letterID: 1
  }
});

const VisitDecoRecoil = atom<VisitDeco>({
  key: 'VisitDeco',
  default: {
    decoID: 1,
    color: '#ff0000',
    letterID: 1,
    content: '',
    sender: ''
  }
});

const PrevRecoil = atom<Prev>({
  key: 'Prev',
  default: {
    view: false,
    isZoom: false
  }
});

export type { Message };
export {
  MessageRecoil,
  MessageListRecoil,
  MakeDecoRecoil,
  VisitDecoRecoil,
  PrevRecoil
};

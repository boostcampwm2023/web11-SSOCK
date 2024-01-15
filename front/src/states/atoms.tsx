import { atom } from 'recoil';
import mockData from '@mock';

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

interface SnowBallData {
  id: number;
  title: string;
  main_decoration_id: number;
  main_decoration_color: string;
  bottom_decoration_id: number;
  bottom_decoration_color: string;
  is_message_private: boolean;
}

interface UserData {
  id: number;
  username: string;
  nickname: string;
  auth_id: string;
  snowball_count: number;
  main_snowball_id: number;
  snowball_list: Array<number>;
  message_count: number;
}

interface SnowBall {
  snowBallData: SnowBallData;
  userData: UserData;
}

const UserDataRecoil = atom<UserData>({
  key: 'User',
  default: {
    id: 0,
    username: '',
    nickname: '',
    auth_id: '',
    snowball_count: 0,
    main_snowball_id: 0,
    snowball_list: [],
    message_count: 0
  }
});

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

const SnowBallRecoil = atom<SnowBall>({
  key: 'SnowBall',
  default: {
    snowBallData: mockData.snowball_data as SnowBallData,
    userData: mockData.user_data
  }
});

export type { Message, SnowBallData, SnowBall };
export {
  MessageRecoil,
  MessageListRecoil,
  MakeDecoRecoil,
  VisitDecoRecoil,
  PrevRecoil,
  SnowBallRecoil,
  UserDataRecoil
};

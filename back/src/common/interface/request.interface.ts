import { Request } from 'express';

export interface JWTRequest extends Request {
  user: {
    id: number;
    name: string;
    user_id: string;
  };

  hasToken?: boolean;
}
// 분리

import { Request } from 'express';

export interface JWTRequest extends Request {
  user: {
    id: number;
    name: string;
    user_id: string;
  };
}

export interface hasTokenRequest extends Request {
  hasToken: boolean;
}

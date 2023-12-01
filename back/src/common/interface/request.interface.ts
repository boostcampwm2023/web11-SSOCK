import { Request } from 'express';

export interface JWTRequest extends Request {
  user: {
    id: number;
    name: string;
    auth_id: string;
  };

  hasToken?: boolean;
}

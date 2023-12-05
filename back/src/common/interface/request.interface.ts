import { Request } from 'express';
import { EntityManager } from 'typeorm';

export interface JWTRequest extends Request {
  user: {
    id: number;
    name: string;
    auth_id: string;
  };

  hasToken?: boolean;
  queryRunnerManager?: EntityManager;
}

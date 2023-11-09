import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtoTest';

@Injectable()
export class AppService {
  register(userData: CreateUserDTO): CreateUserDTO {
    return userData;
  }
}

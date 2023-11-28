import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

export interface payload {
  id: number;
  name: string;
  user_id: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>
  ) {}

  async getUserInfo(user: any): Promise<payload> {
    const exisitingUser = await this.UserRepository.findOne({
      where: { user_id: user.user_id }
    });
    if (exisitingUser) {
      return {
        id: exisitingUser.id,
        name: exisitingUser.username,
        user_id: exisitingUser.user_id
      };
    } else {
      return await this.signUp(user);
    }
  }

  async signUp(user: any): Promise<payload> {
    const newUser: UserEntity = this.UserRepository.create({
      user_id: user.user_id,
      username: user.name,
      nickname: null,
      provider: user.provider,
      created_at: new Date()
    });
    const saveduser = await this.UserRepository.insert(newUser);
    const id = saveduser.identifiers.pop().id;
    return { id: id, name: user.name, user_id: user.user_id };
  }

  generateJwtToken(payload: payload): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: parseInt(`${process.env.JWT_ACCESS_AGE}`),
      secret: `${process.env.JWT_ACCESS_SECRET}`
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: parseInt(`${process.env.JWT_REFRESH_AGE}`),
      secret: `${process.env.JWT_REFRESH_SECRET}`
    });
    return { accessToken, refreshToken };
  }
}

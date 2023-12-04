import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

export interface payload {
  id: number;
  name: string;
  auth_id: string;
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
      where: { auth_id: user.auth_id }
    });
    if (exisitingUser) {
      return {
        id: exisitingUser.id,
        name: exisitingUser.username,
        auth_id: exisitingUser.auth_id
      };
    } else {
      return await this.signUp(user);
    }
  }

  async signUp(user: any): Promise<payload> {
    const newUser: UserEntity = this.UserRepository.create({
      auth_id: user.auth_id,
      username: user.name,
      nickname: null,
      provider: user.provider,
      created_at: new Date()
    });
    const saveduser = await this.UserRepository.insert(newUser);
    const id = saveduser.identifiers.pop().id;
    return { id: id, name: user.name, auth_id: user.auth_id };
  }

  generateJwtToken(payload: payload): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: payload): string {
    return this.jwtService.sign(payload, {
      expiresIn: parseInt(`${process.env.JWT_ACCESS_AGE}`),
      secret: `${process.env.JWT_ACCESS_SECRET}`
    });
  }

  generateRefreshToken(payload: payload): string {
    return this.jwtService.sign(payload, {
      expiresIn: parseInt(`${process.env.JWT_REFRESH_AGE}`),
      secret: `${process.env.JWT_REFRESH_SECRET}`
    });
  }

  setCookies(res: any, accessToken: string, refreshToken?: string): boolean {
    try {
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: parseInt(`${process.env.JWT_ACCESS_AGE}`)
      });
      if (refreshToken) {
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: parseInt(`${process.env.JWT_REFRESH_AGE}`)
        });
      }
    } catch (error) {
      return false;
    }
  }

  async saveRefreshToken(user: any, refreshToken: string): Promise<boolean> {
    try {
      await this.UserRepository.update(
        { id: user.id },
        { refresh_token: refreshToken }
      );
    } catch (error) {
      throw new UnauthorizedException('Refresh Token 저장 실패');
    }

    return true;
  }

  //DB에서 조회하고 맞춰보기
  async isValidRefreshToken(user: any, refreshToken: string): Promise<boolean> {
    //PK 조회라 빠를듯
    const exisitingUser = await this.UserRepository.findOne({
      where: { id: user.id }
    });
    if (exisitingUser && exisitingUser.refresh_token === refreshToken) {
      return true;
    } else {
      throw new UnauthorizedException(
        'Refresh Token이 데이터 베이스에 없습니다.'
      );
    }
  }
}

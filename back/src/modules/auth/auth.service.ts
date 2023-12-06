import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { DataSource, Repository } from 'typeorm';

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
    private readonly UserRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource
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

  async generateJwtToken(
    payload: payload
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async generateAccessToken(payload: payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: parseInt(`${process.env.JWT_ACCESS_AGE}`),
      secret: `${process.env.JWT_ACCESS_SECRET}`
    });
  }

  async generateRefreshToken(payload: payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
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
        res.cookie('loggedin', true, {
          httpOnly: false,
          maxAge: parseInt(`${process.env.JWT_REFRESH_AGE}`)
        });
      }
    } catch (error) {
      return false;
    }
    return true;
  }

  async saveRefreshToken(user: any, refreshToken: string): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      const updateResult = await queryRunner.manager.update(
        UserEntity,
        { id: user.id },
        { refresh_token: refreshToken }
      );
      if (!updateResult.affected) {
        throw new UnauthorizedException('Refresh Token 저장 실패');
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new UnauthorizedException('Refresh Token 저장 실패');
    } finally {
      await queryRunner.release();
    }
    return true;
  }

  async isValidRefreshToken(user: any, refreshToken: string): Promise<boolean> {
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

  clearCookies(res: any): boolean {
    for (const cookie in res.cookies) {
      res.clearCookie(cookie);
    }
    return true;
  }
}

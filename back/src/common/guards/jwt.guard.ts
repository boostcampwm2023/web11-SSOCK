import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../../modules/auth/auth.service';

enum TokenType {
  REFRESH = 'refresh_token',
  ACCESS = 'access_token'
}

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = this.extractToken(request, TokenType.ACCESS);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET
      });

      request['user'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const refreshToken = this.extractToken(request, TokenType.REFRESH);
        if (!refreshToken) {
          throw new UnauthorizedException();
        }
        try {
          const payload = await this.jwtService.verify(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET
          });
          // 데베에 없으면 false 있으면 true
          const valid = await this.authService.isValidRefreshToken(
            payload,
            refreshToken
          );
          // 데베에 refresh token이 다르거나 없으면 쿠키지워주고 에러던짐
          if (!valid) {
            response.clearCookie('access_token');
            response.clearCookie('refresh_token');
            throw new UnauthorizedException(
              'Refresh Token이 데이터베이스의 것과 일치 하지 않습니다.'
            );
          }
          // refresh token이 만료되지 않았다면 access token을 재발급하고 cookie에 저장.
          const accessToken = this.authService.generateAccessToken(payload);
          this.authService.setCookies(response, accessToken);
          request['user'] = payload;
        } catch (error) {
          throw new UnauthorizedException();
        }
        return true;
      }
    }
    return true;
  }

  private extractToken(
    @Req() req: Request,
    type: TokenType
  ): string | undefined {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      throw new UnauthorizedException();
    }

    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const token = cookies.find(cookie => cookie.startsWith(`${type}=`));

    if (token) {
      return token.split('=')[1];
    } else {
      throw new UnauthorizedException();
    }
  }
}

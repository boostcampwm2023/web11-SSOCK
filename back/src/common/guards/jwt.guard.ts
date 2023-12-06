import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService, payload } from '../../modules/auth/auth.service';

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
    try {
      const token = this.extractToken(request, TokenType.ACCESS);
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET
      });

      request['user'] = payload;
    } catch (error) {
      const refreshToken = this.extractToken(request, TokenType.REFRESH);
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh Token이 없습니다.');
      }
      try {
        const payload: payload = await this.jwtService.verify(refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET
        });
        const valid = await this.authService.isValidRefreshToken(
          payload,
          refreshToken
        );
        if (!valid) {
          this.authService.clearCookies(response);
          throw new UnauthorizedException(
            'Refresh Token이 데이터베이스의 것과 일치 하지 않습니다.'
          );
        }
        // refresh token이 만료되지 않았다면 access token을 재발급하고 cookie에 저장.
        const accessToken = await this.authService.generateAccessToken({
          id: payload.id,
          name: payload.name,
          auth_id: payload.auth_id
        });
        this.authService.setCookies(response, accessToken);
        request['user'] = payload;
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
      }
      return true;
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

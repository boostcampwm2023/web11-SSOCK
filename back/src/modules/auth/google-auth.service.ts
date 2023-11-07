import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: 'http://localhost:3000/auth/google/redirect', // redirect_uri
      passReqToCallback: true,
      scope: ['profile'] // 가져올 정보들
    });
  }
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account'
    };
  }
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: any
  ) {
    try {
      console.log(profile);

      const jwt = 'placeholderJWT';
      const user = {
        jwt
      };
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
}

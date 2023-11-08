import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver-v2';

@Injectable()
export class NaverAuthStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: `${process.env.NAVER_CLIENT_ID}`,
      clientSecret: `${process.env.NAVER_SECRET}`,
      callbackURL: 'http://localhost:3000/auth/naver/redirect', // redirect_uri
      passReqToCallback: true,
      scope: ['profile']
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any
  ) {
    try {
      console.log(profile);
      const user = {
        profile
      };
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile as NaverProfile, Strategy } from 'passport-naver-v2';

@Injectable()
export class NaverAuthStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: `${process.env.NAVER_CLIENT_ID}`,
      clientSecret: `${process.env.NAVER_SECRET}`,
      callbackURL: `${process.env.NAVER_CALLBACK_URL}`,
      passReqToCallback: false,
      scope: ['profile']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: NaverProfile,
    done: any
  ) {
    try {
      console.log(profile);
      const user = {
        auth_id: profile.id,
        name: profile.name,
        provider: profile.provider,
        accessToken,
        refreshToken
      };
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
}

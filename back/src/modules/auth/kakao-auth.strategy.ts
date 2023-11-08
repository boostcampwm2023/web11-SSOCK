import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: `${process.env.KAKAO_CLIENT_ID}`,
      clientSecret: `${process.env.KAKAO_SECRET}`,
      callbackURL: 'http://localhost:3000/auth/kakao/redirect', // redirect_uri
      passReqToCallback: true,
      scope: ['profile_nickname']
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

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: `${process.env.KAKAO_CLIENT_ID}`,
      clientSecret: `${process.env.KAKAO_SECRET}`,
      callbackURL: 'http://www.mysnowball.kr/api/auth/kakao/redirect',
      //callbackURL: 'http://localhost:3000/api/auth/kakao/redirect',
      passReqToCallback: false,
      scope: ['profile_nickname']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any
  ) {
    try {
      console.log(profile);
      const user = {
        id: profile.id,
        name: profile.displayName,
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

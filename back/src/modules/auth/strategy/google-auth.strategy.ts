import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile']
    });
  }
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account'
    };
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any
  ) {
    try {
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

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
    console.log('GOOGLE_CLIENT_ID:', configService.get<string>('GOOGLE_CLIENT_ID'));
    console.log('GOOGLE_CLIENT_SECRET:', configService.get<string>('GOOGLE_CLIENT_SECRET'));
    console.log('GOOGLE_CALLBACK_URL:', configService.get<string>('GOOGLE_CALLBACK_URL'));
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { emails, displayName, id } = profile;
    const user = {
      email: emails[0].value,
      name: displayName,
      provider: 'google',
      googleId: id, // importante para identificar o usuário Google
      role: 'user', // ou outro valor padrão
    };
    done(null, user);
  }
}
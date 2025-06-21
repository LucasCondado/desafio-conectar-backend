import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sua_chave_secreta', // deve ser igual à usada no JwtModule
    });
  }

  async validate(payload: any) {
    // O payload.sub é o id do usuário autenticado
    return { sub: payload.sub, email: payload.email, role: payload.role, name: payload.name };
  }
}
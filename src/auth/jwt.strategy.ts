import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string, // <-- Use process.env direto para garantir string
    });
  }

  async validate(payload: JwtPayload) {
    this.logger.debug(`Validando payload JWT: ${JSON.stringify(payload)}`);

    // Verifica campos essenciais
    if (!payload || !payload.email || !payload.sub) {
      this.logger.warn('Token inválido ou incompleto');
      throw new UnauthorizedException('Token inválido.');
    }

    if (payload.role !== 'admin' && payload.role !== 'user') {
      this.logger.warn(`Role inválido: ${payload.role}`);
      throw new UnauthorizedException('Role inválido.');
    }

    // Busca usuário no banco
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      this.logger.warn(`Usuário não encontrado: ${payload.sub}`);
      throw new UnauthorizedException('Usuário não encontrado pelo token.');
    }

    // Log de sucesso
    this.logger.debug(`Usuário autenticado: ${user.email}`);

    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
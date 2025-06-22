import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    this.logger.debug(`Validando payload JWT: ${JSON.stringify(payload)}`);

    // Verifica se o token tem os campos essenciais
    if (!payload || !payload.email || !payload.sub) {
      this.logger.warn('Token inválido ou incompleto');
      throw new UnauthorizedException('Token inválido.');
    }

    if (payload.role !== 'admin' && payload.role !== 'user') {
      this.logger.warn(`Role inválido: ${payload.role}`);
      throw new UnauthorizedException('Role inválido.');
    }

    // Busca o usuário no banco para garantir que o token corresponde a um usuário válido
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      this.logger.warn(`Usuário não encontrado: ${payload.sub}`);
      throw new UnauthorizedException('Usuário não encontrado pelo token.');
    }

    // Se seu modelo tiver isActive, descomente abaixo:
    // if (user.isActive !== undefined && !user.isActive) {
    //   this.logger.warn(`Usuário desativado: ${user.email}`);
    //   throw new UnauthorizedException('Usuário desativado.');
    // }

    // Log de sucesso
    this.logger.debug(`Usuário autenticado: ${user.email}`);

    // Retorna os dados que ficarão disponíveis em req.user
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      // Adicione outros dados necessários
    };
  }
}
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Realiza login e retorna o token JWT' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Validação extra de entrada (anti-injection básica)
    if (
      !loginDto.email ||
      !loginDto.password ||
      typeof loginDto.email !== 'string' ||
      typeof loginDto.password !== 'string' ||
      loginDto.email.length < 5 ||
      loginDto.password.length < 3
    ) {
      this.logger.warn(`Tentativa de login com dados malformados: ${JSON.stringify(loginDto)}`);
      throw new BadRequestException('Dados de login inválidos.');
    }

    // (Opcional) Aqui você pode implementar limitação de tentativas por IP/email

    // Login seguro: nunca diga se foi email ou senha errada
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      this.logger.warn(`Login falhou para o email: ${loginDto.email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    this.logger.log(`Login efetuado: ${loginDto.email} (id: ${user.id})`);
    return this.authService.login(user);
  }
}
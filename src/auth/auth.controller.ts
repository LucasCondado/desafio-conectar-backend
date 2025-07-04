import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  Logger,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Realiza login e retorna o token JWT' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Validação básica de entrada
    if (
      !loginDto.email ||
      !loginDto.password ||
      typeof loginDto.email !== 'string' ||
      typeof loginDto.password !== 'string' ||
      loginDto.email.length < 5 ||
      loginDto.password.length < 6
    ) {
      this.logger.warn(`Tentativa de login com dados malformados: ${JSON.stringify(loginDto)}`);
      throw new BadRequestException('Dados de login inválidos.');
    }

    // Login seguro: nunca diga se foi email ou senha errada
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      this.logger.warn(`Login falhou para o email: ${loginDto.email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    this.logger.log(`Login efetuado: ${loginDto.email} (id: ${user.id})`);
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}
}
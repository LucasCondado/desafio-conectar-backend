import { Injectable, Get, UseGuards, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('Gerando token para:', user); // <-- Veja se tem id aqui!
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        role: user.role,
        sub: user.id, // ESSENCIAL!
      }),
    };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res({ passthrough: false }) res) {
    let user = await this.usersService.findByEmail(req.user.email);
    console.log('Usuário retornado do banco:', user); // <-- ADICIONE ESTA LINHA

    if (!user) {
      // Redireciona para completar cadastro
      return res.redirect(`http://localhost:3000/completar-cadastro?email=${encodeURIComponent(req.user.email)}`);
    }

    // Aqui, user PRECISA ter o campo id
    const token = await this.login(user); // <-- Corrigido aqui!
    res.redirect(`http://localhost:3000/profile?token=${token.access_token}`);
  }
}
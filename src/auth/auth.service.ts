import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    console.log('AUTH SERVICE - Dados recebidos para registro:', data);
    const userExists = await this.usersService.findByEmail(data.email);
    console.log('Usuário já existe?', !!userExists);
    
    if (userExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log('Password hash gerado');
    
    const newUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });
    
    console.log('Usuário criado:', newUser);
    return newUser;
  }

  async login(data: any) {
    console.log('Tentativa de login com:', data.email);

    const user = await this.usersService.findByEmail(data.email);
    console.log('Usuário retornado pelo findByEmail:', user);
    console.log('Usuário encontrado?', !!user);

    if (!user) {
      console.log('Usuário não encontrado');
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    
    console.log('Senha digitada:', data.password, '| typeof:', typeof data.password, '| length:', data.password.length);
    console.log('Hash salvo:', user.password);

    const passwordValid = await bcrypt.compare(data.password, user.password);
    console.log('Senha válida?', passwordValid);
    if (!passwordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    const passwordValid = await bcrypt.compare(currentPassword, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Senha atual incorreta');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await this.usersService.update(user.id, { password: user.password });
    return { message: 'Senha alterada com sucesso!' };
  }
}

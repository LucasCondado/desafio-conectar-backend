import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    // Atualiza o campo lastLoginAt ao fazer login
    await this.usersService.updateLastLogin(user.id);

    const payload = {
      email: user.email,
      role: user.role,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload, { expiresIn: '24h' });
    return {
      access_token: token,
    };
  }
}
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(data: any) {
    const userExists = await this.usersService.findByEmail(data.email);
    if (userExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.usersService.create({
      ...data,
      password: hashedPassword,
    });
  }

  async login(data: any) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    // Aqui você pode gerar um token JWT, se desejar.
    // Por enquanto, vamos retornar um token fictício.
    return { access_token: 'dummy_token', user };
  }
}

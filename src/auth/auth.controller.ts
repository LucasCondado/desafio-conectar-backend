import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: any) {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: any) {
    return this.authService.register(data);
  }
}
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service'; // importe o UsersService

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService // injete o UsersService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/debug/force-admin-password')
  async forceAdminPassword() {
    const hash = '$2b$10$b805ki.TmDZz3f3cjpkzq.KMXOuNAtfOL1LmpD7XQDC10boI9Mmim'; // hash gerado manualmente para 'adm123'
    return this.usersService.updateByEmail('Beto@Carreiro.com', { password: hash });
  }
}

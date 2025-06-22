import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { Role } from './users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const adminEmail = 'admin@admin.com';
  const adminName = 'Administrador';
  const adminPassword = 'adm123';

  const existing = await usersService.findByEmail(adminEmail);
  if (!existing) {
    await usersService['usersRepository'].save({
      email: adminEmail,
      name: adminName,
      password: await bcrypt.hash(adminPassword, 10),
      role: Role.ADMIN, // <--- aqui é o segredo!
    });
    console.log('Usuário admin criado!');
  } else {
    console.log('Usuário admin já existe!');
  }

  await app.close();
}
bootstrap();
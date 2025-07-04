import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller'; // Corrigido aqui
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), // <-- Use forwardRef aqui
  ],
  controllers: [UsersController], // Corrigido aqui
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
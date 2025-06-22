import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('DB_HOST:', config.get<string>('DB_HOST'));
        console.log('DB_PORT:', config.get<string>('DB_PORT'));
        console.log('DB_USERNAME:', config.get<string>('DB_USERNAME'));
        // Nunca logue senhas em produção!

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT')), // Convertendo para número
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [User],
          synchronize: true, // Não usar em produção!
          ssl: { rejectUnauthorized: false }, // <-- Adicione esta linha!
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
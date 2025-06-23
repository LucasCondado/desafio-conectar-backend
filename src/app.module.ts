import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Log para depuração da conexão (NÃO logar senha!)
        console.log('========== INICIANDO CONEXÃO ==========');
        console.log('DB_HOST:', config.get<string>('DB_HOST'));
        console.log('DB_PORT:', config.get<string>('DB_PORT'));
        console.log('DB_USERNAME:', config.get<string>('DB_USERNAME'));
        console.log('DB_DATABASE:', config.get<string>('DB_DATABASE'));
        console.log('DB_SSL:', config.get<string>('DB_SSL'));
        console.log('========================================');

        // Converte string do .env para boolean
        const sslEnabled = config.get<string>('DB_SSL') === 'true';

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: Number(config.get<string>('DB_PORT')),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [User],
          synchronize: true, // ATENÇÃO: Não usar em produção!
          ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
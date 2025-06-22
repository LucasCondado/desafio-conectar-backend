import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // CONFIGURAÇÃO DE CORS
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        // 'https://SEU_FRONTEND.vercel.app', // adicione aqui se tiver frontend online
      ],
      credentials: true,
    });

    // Configuração do Swagger
    const config = new DocumentBuilder()
      .setTitle('API Conectar')
      .setDescription('Documentação da API do desafio')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Insira apenas o token JWT. O prefixo "Bearer" será adicionado automaticamente.',
          in: 'header',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`API rodando em: http://localhost:${port}/api`);
  } catch (err) {
    console.error('Fatal error on bootstrap:', err);
    process.exit(1);
  }
}

bootstrap();
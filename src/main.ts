import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

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

    console.log(`Listening on http://localhost:${port}`);
  } catch (err) {
    console.error('Fatal error on bootstrap:', err);
    process.exit(1);
  }
}

bootstrap();
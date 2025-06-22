import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

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

    // Permite que o Heroku (ou outras plataformas) use qualquer porta definida na env
    const port = process.env.PORT || 3000;
    await app.listen(port);

    // Exibe a URL correta no console (útil para debug local)
    console.log(`API rodando em: http://localhost:${port}/api`);
  } catch (err) {
    console.error('Fatal error on bootstrap:', err);
    process.exit(1);
  }
}

bootstrap();
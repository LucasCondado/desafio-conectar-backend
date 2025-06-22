import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
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
        description: 'Insira apenas o token JWT. O prefixo \"Bearer\" será adicionado automaticamente.',
        in: 'header',
      },
      'access-token', // nome do esquema, use igual em @ApiBearerAuth('access-token')
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Use a porta do Heroku, ou 3000 localmente
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Listening on http://localhost:${port}`);
}

bootstrap();
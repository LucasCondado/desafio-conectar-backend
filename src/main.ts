import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

export async function createNestServer(expressInstance = express()) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

  // Configuração Swagger
  const config = new DocumentBuilder()
    .setTitle('API Conectar')
    .setDescription('Documentação da API do desafio')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();
  return expressInstance;
}

// Para rodar localmente:
if (require.main === module) {
  createNestServer().then(app => {
    app.listen(3000, () => {
      console.log('Listening on http://localhost:3000');
    });
  });
}
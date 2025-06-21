import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gerenciamento de Usuários')
    .setDescription('API para o sistema de gerenciamento de usuários da Conéctar')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Caminho correto para a pasta build do frontend
  // __dirname é dist/, então precisamos voltar 1 nível para chegar na raiz do backend
  // e mais um nível para chegar na pasta onde estão os projetos frontend e backend
  const frontendPath = join(__dirname, '..', '..', 'frontend', 'build');
  
  // Configure arquivos estáticos
  app.use(express.static(frontendPath));
  
  // Adicione um prefixo global para todas as rotas da API
  app.setGlobalPrefix('api');

  // Configure o fallback para SPA
  app.use(/^(?!\/api).*/, (req, res) => {
    res.sendFile(join(frontendPath, 'index.html'));
  });

  // Inicie o servidor após todas as configurações
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
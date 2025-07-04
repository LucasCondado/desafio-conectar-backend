import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('User Endpoints (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Faça login com o admin correto
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@admin.com',
        password: 'adm123',
      });
    adminToken = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) não retorna campo password', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    res.body.forEach((user: any) => {
      expect(user).not.toHaveProperty('password');
    });
  });

  it('/users/:id (GET) não retorna campo password', async () => {
    // Crie um usuário de teste só para esse teste!
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Teste GET',
        email: `testeget${Date.now()}@mail.com`,
        password: 'SenhaForte123!',
      });
    const userId = createRes.body.id;

    const res = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty('password');
  });

  it('/users/:id (PATCH) não retorna campo password', async () => {
    // Crie um usuário de teste só para esse teste!
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Teste PATCH',
        email: `testepatch${Date.now()}@mail.com`,
        password: 'SenhaForte123!',
      });
    const userId = createRes.body.id;

    const res = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Novo Nome Automatizado' });
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty('password');
  });

  it('/users/:id (DELETE) não retorna campo password', async () => {
    // Crie um usuário só para deletar
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Para Deletar',
        email: `delete${Date.now()}@email.com`,
        password: 'SenhaForte123',
      });
    const userId = createRes.body.id;
    const res = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty('password');
  });
});
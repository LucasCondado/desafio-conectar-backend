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

    // Login admin
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@admin.com', // ajuste para o email do seu admin
        password: 'adm123',       // ajuste para a senha do seu admin
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
    // Cria usuário para o teste
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Teste GET',
        email: `testget${Date.now()}@mail.com`,
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
    // Cria usuário para o teste
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Teste PATCH',
        email: `testpatch${Date.now()}@mail.com`,
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
    // Cria usuário para deletar
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
    expect([200, 204]).toContain(res.status); // Aceita 200 ou 204
    if (res.body) {
      expect(res.body).not.toHaveProperty('password');
    }
  });
});
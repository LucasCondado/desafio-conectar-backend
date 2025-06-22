# Backend - Desafio Conéctar

## Descrição do Projeto

API desenvolvida em NestJS + TypeScript para o desafio Conéctar, atendendo requisitos de autenticação, gerenciamento de usuários (admin/user), filtros, ordenação, notificações de usuários inativos, segurança e testes automatizados.

---

## Funcionalidades Atendidas

- **Autenticação JWT:** Registro e login de usuários, geração de token seguro.
- **Gerenciamento de Usuários:** CRUD completo, roles (`admin`/`user`), controle de acesso por papel.
- **Filtros e Ordenação:** Filtragem por papel (`role`), ordenação por nome ou data de criação.
- **Notificação de Inativos:** Endpoint para listar usuários sem login nos últimos 30 dias.
- **Testes Automatizados:** Testes de integração cobrindo principais fluxos e regras de negócio.
- **Documentação da API:** Swagger disponível.
- **Segurança:** Senhas criptografadas (bcrypt), proteção de endpoints, dados sensíveis não expostos nas respostas.

---

## Tecnologias Utilizadas

- **Framework:** [NestJS](https://nestjs.com/) + TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM
- **Autenticação:** JWT, bcrypt
- **Testes:** Jest, Supertest
- **Documentação:** Swagger

---

## Como Rodar Localmente

1. **Pré-requisitos:**
   - Node.js >= 18
   - PostgreSQL (local ou na nuvem)
   - npm

2. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/seu-repo-backend.git
   cd seu-repo-backend
   ```

3. **Instale as dependências:**
   ```sh
   npm install
   ```

4. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env` e preencha com suas configurações:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=seu_usuario
     DB_PASSWORD=sua_senha
     DB_DATABASE=nome_do_banco
     JWT_SECRET=um-segredo-seguro
     ```
   - Se estiver usando o Render, adicione `DB_SSL=true`.

5. **Rode as migrations:**
   ```sh
   npm run typeorm migration:run
   ```

6. **(Opcional) Rode os seeds:**
   ```sh
   npm run seed
   ```

7. **Inicie o servidor:**
   ```sh
   npm run start:dev
   ```

---

## Rodando os Testes

- **Testes de integração/end-to-end:**
  ```sh
  npm run test:e2e
  ```
- **Testes unitários:**
  ```sh
  npm run test
  ```

---

## Documentação da API (Swagger)

Acesse a documentação interativa em:  
```
http://localhost:3000/api
```
*(ou em `/swagger`, conforme sua configuração)*

---

## Credenciais de Teste

Usuário admin padrão criado via seed/migration:

- **Email:** admin@admin.com
- **Senha:** adm123

*(Edite ou remova após avaliação!)*

---

## Link da Demonstração (Deploy)

- [Backend em produção (Render)](https://seu-backend.onrender.com)
- Documentação Swagger do deploy: [https://seu-backend.onrender.com/api](https://seu-backend.onrender.com/api)

---

## Decisões de Arquitetura

- **Role-based Access:** Implementação de controle de acesso por papel (`admin`/`user`) em guards e services.
- **Segurança:** Senha criptografada, JWT, DTOs para validação de dados, CORS habilitado.
- **Arquitetura modular:** Separação clara entre modules, services, controllers, entities e DTOs.
- **Testabilidade:** Cobertura de testes para fluxos principais (CRUD, autenticação, regras de acesso).
- **Pronto para produção:** Variáveis de ambiente, conexão segura (SSL), documentação.

---

## Principais Endpoints

- `POST   /auth/register`  → Cadastro de novo usuário
- `POST   /auth/login`     → Login (retorna JWT)
- `GET    /users`          → Listar usuários (apenas admin, suporta filtros ex: `?role=admin`)
- `GET    /users/:id`      → Detalhes do usuário (admin: qualquer, user: só o próprio)
- `PATCH  /users/:id`      → Atualizar dados (admin: qualquer, user: só o próprio)
- `DELETE /users/:id`      → Remover usuário (só admin)
- `GET    /users/inactive` → Listar usuários inativos (sem login nos últimos 30 dias)

Ver detalhes, payloads e exemplos no [Swagger](#documentação-da-api-swagger).

---

## Observações

- **Login Social (Google/Microsoft):** Não implementado neste MVP. Pode ser adicionado como melhoria.
- **Frontend:** Repositório separado ([link](https://github.com/seu-usuario/seu-repo-frontend)).

---

Qualquer dúvida, sugestão ou feedback, fique à vontade para abrir issues ou pull requests! 🚀
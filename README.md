# desafio-conectar-backend

Backend do desafio Conéctar, desenvolvido em [NestJS](https://nestjs.com/) com PostgreSQL e TypeORM.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/)

## 📦 Deploy

- **Heroku:** [https://teste-conectar-back-da3221d35049.herokuapp.com/](https://teste-conectar-back-da3221d35049.herokuapp.com/)
- **Swagger:** [https://teste-conectar-back-da3221d35049.herokuapp.com/api](https://teste-conectar-back-da3221d35049.herokuapp.com/api)

## 👤 Usuário de Teste

- **Admin:**  
  Email: `admin@admin.com`  
  Senha: `adm123`

## 🧑‍💻 Como rodar localmente

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/LucasCondado/desafio-conectar-backend.git
   cd desafio-conectar-backend
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=sua_senha
   DB_DATABASE=conectar
   JWT_SECRET=umsegredosecreto
   ```

4. **Suba o banco de dados** (exemplo usando Docker):
   ```sh
   docker run --name pg-conectar -e POSTGRES_PASSWORD=sua_senha -e POSTGRES_DB=conectar -p 5432:5432 -d postgres
   ```

5. **Inicie o servidor:**
   ```sh
   npm run start:dev
   ```

6. **Acesse a documentação Swagger:**  
   [http://localhost:3001/api](http://localhost:3001/api)

## 🔐 Variáveis de ambiente

| Nome         | Descrição                      | Exemplo           |
| ------------ | ----------------------------- | ----------------- |
| DB_HOST      | Host do banco de dados         | localhost         |
| DB_PORT      | Porta do banco                 | 5432              |
| DB_USERNAME  | Usuário do banco               | postgres          |
| DB_PASSWORD  | Senha do banco                 | sua_senha         |
| DB_DATABASE  | Nome do banco                  | conectar          |
| JWT_SECRET   | Segredo para autenticação JWT  | umsegredosecreto  |

## 🌐 Integração com o Frontend

O frontend consome a API deste backend.  
A URL base deve ser configurada na variável `REACT_APP_API_URL` do frontend.

## 📄 Documentação da API

Acesse o Swagger para ver todos os endpoints, exemplos de payload e respostas:

- [https://teste-conectar-back-da3221d35049.herokuapp.com/api](https://teste-conectar-back-da3221d35049.herokuapp.com/api)

## 🧪 Testes

Execute os testes automatizados:

```sh
npm run test:e2e
```

## 🤝 Contribuição

Sinta-se livre para abrir issues ou pull requests!

## 👨‍💻 Autor

- Lucas Condado

---
Lá você encontra todos os endpoints, exemplos de payload e respostas.

## 🤝 Contribuição

Sinta-se livre para abrir issues ou pull requests!

## 👨‍💻 Autor

- Lucas Condado

# Desafio Conectar - Backend

Este é o backend do desafio para desenvolvedor pleno, feito em [NestJS](https://nestjs.com/) utilizando banco de dados PostgreSQL e TypeORM.  
A API está pronta para integração com o frontend e já possui documentação automática pelo Swagger.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/)

## 📦 Deploy

- **Render:** [https://desafio-conectar-backend-bwg7.onrender.com/api](https://desafio-conectar-backend-bwg7.onrender.com/api)
- **Heroku:** [https://teste-conectar-e2517ff452cd.herokuapp.com/api](https://teste-conectar-e2517ff452cd.herokuapp.com/api)

## 🧑‍💻 Como rodar localmente

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repo>
   cd backend
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
   [http://localhost:3000/api](http://localhost:3000/api)

## 🌐 Integração com o Frontend

No frontend, utilize a URL base do backend para fazer requisições à API:

- **Render:**  
  ```
  https://desafio-conectar-backend-bwg7.onrender.com
  ```

- **Heroku:**  
  ```
  https://teste-conectar-e2517ff452cd.herokuapp.com
  ```

**Exemplo de requisição no frontend (axios):**
```javascript
const api = axios.create({
  baseURL: "https://desafio-conectar-backend-bwg7.onrender.com"
});

api.get("/api/users").then(res => {
  console.log(res.data);
});
```

> Lembre-se: para acessar a documentação e testar endpoints manualmente, acesse `/api` na URL base.

## 🔐 Variáveis de ambiente

| Nome         | Descrição                      | Exemplo           |
| ------------ | ----------------------------- | ----------------- |
| DB_HOST      | Host do banco de dados         | localhost         |
| DB_PORT      | Porta do banco                 | 5432              |
| DB_USERNAME  | Usuário do banco               | postgres          |
| DB_PASSWORD  | Senha do banco                 | sua_senha         |
| DB_DATABASE  | Nome do banco                  | conectar          |
| JWT_SECRET   | Segredo para autenticação JWT  | umsegredosecreto  |

## 📄 Documentação da API

Acesse o Swagger:

- **Render:** [https://desafio-conectar-backend-bwg7.onrender.com/api](https://desafio-conectar-backend-bwg7.onrender.com/api)
- **Heroku:** [https://teste-conectar-e2517ff452cd.herokuapp.com/api](https://teste-conectar-e2517ff452cd.herokuapp.com/api)

Lá você encontra todos os endpoints, exemplos de payload e respostas.

## 🤝 Contribuição

Sinta-se livre para abrir issues ou pull requests!

## 👨‍💻 Autor

- Lucas Condado

# desafio-conectar-backend

Este é o backend do desafio Conéctar, desenvolvido em NestJS com banco de dados PostgreSQL.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/) (autenticação)
- [Swagger](https://swagger.io/) (documentação da API)
- [Jest](https://jestjs.io/) (para testes)

## Código Fonte

- [Repositório Backend](https://github.com/LucasCondado/desafio-conectar-backend)
- [Repositório Frontend](https://github.com/LucasCondado/desafio-conectar-frontend)

## Como executar o projeto

### Pré-requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 12+

### Instalação

1. Clone este repositório:
    ```sh
    git clone https://github.com/LucasCondado/desafio-conectar-backend.git
    ```
2. Acesse a pasta do projeto:
    ```sh
    cd desafio-conectar-backend
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```

### Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL (exemplo: `conectar_db`).
2. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (ajuste conforme seu ambiente):

    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=conectar_db
    JWT_SECRET=sua_chave_secreta
    ```

### Execução

Para iniciar a aplicação em modo de desenvolvimento, execute:
```sh
npm run start:dev
```
Acesse a documentação da API em [http://localhost:3000/api](http://localhost:3000/api).

### Testes

Para rodar os testes automatizados:
```sh
npm run test
```

---

Desenvolvido para o desafio Conéctar.
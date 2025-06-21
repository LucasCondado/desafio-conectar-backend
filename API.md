# Minha API de Usuários

## Documentação da API

Esta API gerencia usuários, autenticação e autorização.  
A autenticação é feita via JWT (Bearer Token) enviado no header `Authorization`.  
**Base URL:** `http://localhost:3000`

---

## Endpoints

### 1. Cadastro de usuário (apenas admin)

- **POST** `/users`
- **Permissão:** Admin
- **Body:**
    ```json
    {
      "name": "Maria",
      "email": "maria@email.com",
      "password": "123456",
      "role": "user"
    }
    ```
- **Exemplo cURL:**
    ```bash
    curl -X POST -H "Authorization: Bearer {TOKEN_ADMIN}" \
      -H "Content-Type: application/json" \
      -d '{"name":"Maria","email":"maria@email.com","password":"123456","role":"user"}' \
      http://localhost:3000/users
    ```
- **Resposta Sucesso:**
    ```json
    {
      "id": "uuid-gerado",
      "name": "Maria",
      "email": "maria@email.com",
      "role": "user",
      "createdAt": "2025-06-21T18:00:00.000Z"
    }
    ```
- **Resposta Erro (faltando campo):**
    ```json
    {
      "message": "Campo obrigatório ausente",
      "statusCode": 400
    }
    ```

---

### 2. Login

- **POST** `/auth/login`
- **Permissão:** Público
- **Body:**
    ```json
    {
      "email": "maria@email.com",
      "password": "123456"
    }
    ```
- **Exemplo cURL:**
    ```bash
    curl -X POST -H "Content-Type: application/json" \
      -d '{"email":"maria@email.com","password":"123456"}' \
      http://localhost:3000/auth/login
    ```
- **Resposta Sucesso:**
    ```json
    {
      "access_token": "jwt.token.aqui"
    }
    ```
- **Resposta Erro (senha incorreta):**
    ```json
    {
      "message": "Credenciais inválidas",
      "statusCode": 401
    }
    ```

---

### 3. Listar usuários (apenas admin)

- **GET** `/users`
- **Permissão:** Admin
- **Query params:** `?page=1&limit=10` (opcional)
- **Exemplo cURL:**
    ```bash
    curl -H "Authorization: Bearer {TOKEN_ADMIN}" \
      "http://localhost:3000/users?page=1&limit=2"
    ```
- **Resposta Sucesso:**
    ```json
    [
      {
        "id": "uuid-1",
        "name": "Maria",
        "email": "maria@email.com",
        "role": "user"
      },
      {
        "id": "uuid-2",
        "name": "João",
        "email": "joao@email.com",
        "role": "user"
      }
    ]
    ```
- **Resposta Erro (usuário comum tentando acessar):**
    ```json
    {
      "message": "Forbidden resource",
      "error": "Forbidden",
      "statusCode": 403
    }
    ```

---

### 4. Buscar usuário por ID

- **GET** `/users/{id}`
- **Permissão:** Admin ou o próprio usuário
- **Exemplo cURL:**
    ```bash
    curl -H "Authorization: Bearer {TOKEN}" \
      http://localhost:3000/users/uuid-do-usuario
    ```
- **Resposta Sucesso:**
    ```json
    {
      "id": "uuid-do-usuario",
      "name": "Maria",
      "email": "maria@email.com",
      "role": "user"
    }
    ```
- **Resposta Erro (não autorizado):**
    ```json
    {
      "message": "Forbidden resource",
      "statusCode": 403
    }
    ```

---

### 5. Editar usuário (apenas admin)

- **PATCH** `/users/{id}`
- **Permissão:** Admin
- **Body (exemplo):**
    ```json
    {
      "name": "Maria Editada"
    }
    ```
- **Exemplo cURL:**
    ```bash
    curl -X PATCH -H "Authorization: Bearer {TOKEN_ADMIN}" \
      -H "Content-Type: application/json" \
      -d '{"name": "Maria Editada"}' \
      http://localhost:3000/users/uuid-do-usuario
    ```
- **Resposta Sucesso:**
    ```json
    {
      "id": "uuid-do-usuario",
      "name": "Maria Editada",
      "email": "maria@email.com",
      "role": "user"
    }
    ```
- **Resposta Erro (não autorizado):**
    ```json
    {
      "message": "Not allowed",
      "error": "Forbidden",
      "statusCode": 403
    }
    ```

---

### 6. Deletar usuário (apenas admin)

- **DELETE** `/users/{id}`
- **Permissão:** Admin
- **Exemplo cURL:**
    ```bash
    curl -X DELETE -H "Authorization: Bearer {TOKEN_ADMIN}" \
      http://localhost:3000/users/uuid-do-usuario
    ```
- **Resposta Sucesso:**
    ```json
    {
      "message": "Usuário removido com sucesso"
    }
    ```
- **Resposta Erro (não autorizado):**
    ```json
    {
      "message": "Not allowed",
      "error": "Forbidden",
      "statusCode": 403
    }
    ```

---

## Autenticação

- Todos os endpoints protegidos exigem o header:  
  `Authorization: Bearer {token}`

- O campo `role` pode ser `"admin"` ou `"user"`.

---

## Respostas de erro padrão

- **401 Unauthorized:** token ausente ou inválido
- **403 Forbidden:** acesso negado por falta de permissão
- **404 Not Found:** recurso não encontrado
- **400 Bad Request:** dados inválidos ou faltando

---

## Observações

- Altere a `BASE_URL` conforme seu ambiente (produção, staging, etc).
- Para dúvidas ou sugestões, abra uma issue neste repositório.

---
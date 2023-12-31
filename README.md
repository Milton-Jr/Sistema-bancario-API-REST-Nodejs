# Cubos Bank API

Bem-vindo ao repositório da API REST Cubos Bank! Este projeto foi desenvolvido como parte do meu aprendizado nos estudos de back-end.

Essa API permite gerenciar contas bancárias, realizar transações, consultar saldos e extratos. Ela segue o padrão REST e é construída com o framework Express, utilizando a biblioteca Date-fns para lidar com datas.

## Funcionalidades

A API oferece as seguintes funcionalidades:

- Listagem de contas bancárias
- Criação de conta bancária
- Atualização dos dados do usuário da conta bancária
- Exclusão de uma conta bancária
- Depósito em uma conta bancária
- Saque de uma conta bancária
- Transferência de valores entre contas bancárias
- Consulta de saldo da conta bancária
- Emissão de extrato bancário

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- `index.js`: Arquivo de entrada da aplicação.
- `servidor.js`: Configuração e inicialização do servidor.
- `rotas.js`: Definição das rotas da API.
- `middlewares`: Onde estão localizados os intermediarios de rotas.
- `controladores`: Pasta contendo os controladores das rotas.
- `bancodedados.js`: Arquivo de persistência dos dados em memória.

## Pré-requisitos

Antes de começar a utilizar a API, é necessário ter instalado o Node.js e as dependências do projeto. Você pode instalar as dependências utilizando o seguinte comando:

```bash
npm install
```
# Como Usar
Para iniciar o servidor da API, execute o seguinte comando:

```bash
npm start
```
A API estará disponível em http://localhost:3000.

# Endpoints
Listar contas bancárias
```bash
GET /contas?senha_banco=<senha_banco>
```
Esta rota lista todas as contas bancárias existentes.

Parâmetros:

senha_banco: Senha do banco para autenticação.
Exemplo de resposta:

```json
HTTP Status 200

[
    {
        "numero": "1",
        "saldo": 0,
        "usuario": {
            "nome": "Foo Bar",
            "cpf": "00011122233",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "foo@bar.com",
            "senha": "1234"
        }
    },
    {
        "numero": "2",
        "saldo": 1000,
        "usuario": {
            "nome": "Foo Bar 2",
            "cpf": "00011122234",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "foo@bar2.com",
            "senha": "12345"
        }
    }
]
```
# Criar conta bancária
```bash
POST /contas
```
Esta rota cria uma nova conta bancária.

Corpo da requisição:

```json

{
    "nome": "Foo Bar",
    "email": "foo@bar.com",
    "cpf": "00011122233",
    "data_nascimento": "15/03/2001",
    "telefone": "11999998888",
    "senha": "1234"
}
```
Exemplo de resposta:

```json

HTTP Status 200

{
    "numero":  "3",
    "saldo": 0,
    "usuario": {
        "nome": "Foo Bar",
        "cpf": "00011122233",
        "data_nascimento": "2001-03-15",
        "telefone": "11999998888",
        "email": "foo@bar.com",
        "senha": "1234"
    }
}
```

# Saque de uma conta bancária
```bash
POST /transacoes/sacar
```
Esta rota permite fazer um saque de uma conta bancária.

Corpo da requisição:

```json
{
    "numero_conta": "1",
    "valor": 100
}
```
Exemplo de resposta:

```json
HTTP Status 200

{
    "mensagem": "Saque realizado com sucesso."
}
```
# Transferência entre contas bancárias
```bash
POST /transacoes/transferir
```
Esta rota permite transferir valores entre duas contas bancárias.

Corpo da requisição:

```json
{
    "conta_origem": "1",
    "conta_destino": "2",
    "valor": 200
}
```
Exemplo de resposta:

```json
HTTP Status 200

{
    "mensagem": "Transferência realizada com sucesso."
}
```
# Depósito em uma conta bancária
```bash

POST /transacoes/depositar
```
Esta rota permite realizar um depósito em uma conta bancária.

Corpo da requisição:

```json

{
    "numero_conta": "1",
    "valor": 50
}
```
Exemplo de resposta:

```json

HTTP Status 200

{
    "mensagem": "Depósito realizado com sucesso."
}
```
# Emissão de extrato bancário
```bash
GET /contas/extrato?numero_conta=<numero_conta>&senha=<senha_conta>
```
Esta rota retorna o extrato bancário de uma determinada conta.

Parâmetros:

numero_conta: Número da conta bancária.
senha_conta: Senha da conta informada.

Exemplo de resposta:

```json

HTTP Status 200

[
    {
        "data": "2023-08-15 12:30:00",
        "descricao": "Depósito",
        "valor": 300
    },
    {
        "data": "2023-08-16 14:45:00",
        "descricao": "Saque",
        "valor": 50
    },
    {
        "data": "2023-08-17 10:00:00",
        "descricao": "Transferência para conta 2",
        "valor": 200
    }
]
```
# Status Code
- 200 (OK): Requisição bem sucedida
- 201 (Created): Requisição bem sucedida e algo foi criado
- 204 (No Content): Requisição bem sucedida, sem conteúdo no corpo da resposta
- 400 (Bad Request): O servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
- 401 (Unauthorized): O usuário não está autenticado (logado)
- 403 (Forbidden): O usuário não tem permissão de acessar o recurso solicitado
- 404 (Not Found): O servidor não pode encontrar o recurso solicitado
- 500 (Internal Server Error): Erro inesperado do servidor

# Considerações Finais
Este projeto foi desenvolvido como parte do meu aprendizado em back-end. Sua estrutura segue as melhores práticas de desenvolvimento, mantendo uma organização clara e modularizada do código. Se você tiver alguma dúvida ou feedback, sinta-se à vontade para entrar em contato.

Agradeço por visitar o meu repositório!

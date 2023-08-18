# Sistema-bancario-API-REST-Nodejs

Claro, vou converter o texto fornecido em um formato adequado para um arquivo README.md:


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
- `controladores/`: Pasta contendo os controladores das rotas.
- `bancodedados.js`: Arquivo de persistência dos dados em memória.

## Pré-requisitos

Antes de começar a utilizar a API, é necessário ter instalado o Node.js e as dependências do projeto. Você pode instalar as dependências utilizando o seguinte comando:

```bash
npm install
```

## Como Usar

Para iniciar o servidor da API, execute o seguinte comando:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

### Listar contas bancárias

```bash
GET /contas?senha_banco=<senha_banco>
```

Esta rota lista todas as contas bancárias existentes.

Parâmetros:

- `senha_banco`: Senha do banco para autenticação.

Exemplo de resposta:

```json
HTTP Status 200

[
    {
        "numero": "1",
        "saldo": 0,
        "usuario": {
            "nome": "Foo Bar",
            ...
        }
    },
    ...
]
```

### Criar conta bancária

```bash
POST /contas
```

Esta rota cria uma nova conta bancária.

Corpo da requisição:

```json
{
    "nome": "Foo Bar",
    ...
}
```

Exemplo de resposta:

```json
HTTP Status 200

{
    "numero":  "3",
    "saldo": 0,
    ...
}
```

## Documentação Completa

Para mais detalhes sobre todos os endpoints e suas funcionalidades, consulte a [documentação completa aqui](link_para_documentação_completa).

## Status Code

- 200 (OK): Requisição bem sucedida
- 201 (Created): Requisição bem sucedida e algo foi criado
- 204 (No Content): Requisição bem sucedida, sem conteúdo no corpo da resposta
- 400 (Bad Request): O servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
- 401 (Unauthorized): O usuário não está autenticado (logado)
- 403 (Forbidden): O usuário não tem permissão de acessar o recurso solicitado
- 404 (Not Found): O servidor não pode encontrar o recurso solicitado
- 500 (Internal Server Error): Erro inesperado do servidor

## Considerações Finais

Este projeto foi desenvolvido como parte do desafio do Back-end - Módulo 2 na Cubos. Sua estrutura segue as melhores práticas de desenvolvimento, mantendo uma organização clara e modularizada do código. Se você tiver alguma dúvida ou feedback, sinta-se à vontade para entrar em contato.

Agradecemos por visitar nosso repositório e esperamos que esta API seja útil para suas necessidades bancárias!
```

Lembre-se de substituir `link_para_documentação_completa` pelo link real para a documentação completa da API, caso você tenha uma. Certifique-se também de formatar corretamente as seções de código e citações.

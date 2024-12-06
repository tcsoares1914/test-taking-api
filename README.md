## TEST TAKING API

REST API usando NestJS e MongoDB.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- Conteúdo:
    - [Stack](#stack)
    - [Installation](#installation)
    - [Running](#running)
    - [Endpoints](#endpoints)
    - [Tests](#tests)

<!-- /TOC -->

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
## Stack <a name="stack"></a>
- Stack utilizada na aplicação:
  - [Node.js](https://nodejs.org/)
  - [NestJS](https://nestjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [Jest](https://jestjs.io/)

<!-- /TOC -->

## Installation <a name="installation"></a>

Clone o repositório GIT.

```bash
# Using SSL method.
$ git clone git@github.com:tcsoares1914/test-taking-api.git
```

Acesse o diretório do repositório clonado:

```bash
$ cd test-taking-api/
```

Faça uma cópia do arquivo .env.example ou renomeie para .env.

```bash
$ cp .env.example .env
```

## Running <a name="running"></a>

Instale o [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) para criar e rodar os containers.

Instale as dependências do projeto com [npm](https://www.npmjs.com/):

```bash
$ npm install
```

Para criar os containers rode o comando abaixo.

```bash
# Up and start all application containers.
$ docker compose up -d
```

Faça uma requisição GET para o /:

```bash
GET: http://localhost:3000/
```

Se tudo estiver OK:

```bash
{"healthy":true,"name":"API","version":"0.0.1"}
```

## Endpoints <a name="endpoints"></a>

```bash
# Listar todos os produtos.
GET: http://localhost:3000/products/
```

```bash
# Busca por string na listagem de produtos.
GET: http://localhost:3000/products/?keyword=test
```

```bash
# Paginacao na listagem de produtos.
GET: http://localhost:3000/products/?limit=10&page=1
```

```bash
# Criar novo produto.
POST: http://localhost:3000/products/

# Payload novo produto.
{
	"*title": (string),
	"*description" : (string),
	"*price": (number)
	"*photo": (string)
}

* campos obrigatórios
```

```bash
# Exibir um produto.
GET: http://localhost:3000/products/{produtctId}
```

```bash
# Atualizar um produto.
PATCH: http://localhost:3000/products/{produtctId}

# Payload update produto
{
	"title": (string),
	"description" : (string),
	"price": (number)
	"photo": (string)
}
```

```bash
# Deletar um produto.
DELETE: http://localhost:3000/products/{produtctId}
```

## Test <a name="tests"></a>

Para rodar os testes unitários do projeto:

```bash
# Running unit tests.
$ npm run test
```


Para gerar o coverage dos testes unitários:

```bash
# Running unit tests.
$ npm run test:cov
```
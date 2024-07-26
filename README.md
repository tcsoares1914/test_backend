## TESTE BACKEND

API para cadastro e manipulação de agendamentos.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- Conteúdo
    - [Instalação](#installation)
    - [Rodando os Containers](#running)
    - [Tests](#tests)

<!-- /TOC -->

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
## Stack <a name="stack"></a>
- Used in this project:
  - [NestJS](https://github.com/nestjs/nest)
  - [TypeScript](https://github.com/nestjs/nest)
  - [TypeORM](https://typeorm.io/)
  - [MySQL](https://www.mysql.com/)
  - [Jest](https://jestjs.io/)

<!-- /TOC -->

## Instalação <a name="installation"></a>

Clone o repositório.

```bash
# Using SSL method.
$ git clone git@github.com:tcsoares1914/test_backend.git
```

Acesse o diretório da aplicação:

```bash
$ cd test_backend/
```

Faça uma cópia do arquivo .env.example renomeando para .env

```bash
$ cp .env.example .env
```

## Rodando os Containers <a name="running"></a>

Tenha instalado o [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) para criar e executar os containers.

```bash
# Iniciando a criação dos containers.
$ docker compose up -d
```

Instale as dependências do projeto:

```bash
# Instaando as dependências do projeto.
$ npm install
```

```bash
# Acesse o endpoint:
http://localhost:3000/
```

## Test <a name="tests"></a>

```bash
# Rodandoos testes unitários.
$ npm run test

# Criando o coverage dos testes.
$ npm run test:cov
```

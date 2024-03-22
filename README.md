# Bem-vindo ao Projeto de ESS

Este projeto foi desenvolvido para a disciplina de ESS, no período 2023.2. 

## Grupo

Ana Sofia Lima (asosl),
Guilherme Maranhão (gmsmr),
João Victor Omena (jvrco),
João Vitor Mergulhão (jvlm2),
Luís Guilherme Nunes (lgmmn),
Maria Letícia Nascimento (mlmn3),
Pedro Vítor Monte (pvom),
Rebeca Menezes (ram3).

# Framework

MERN: NodeJS, React, Express e MongoDB.

## Rodando a primeira vez

Baixe NodeJS, React e MongoDB.

### No *backend*:

```sh
npm i bcrypt cors dotenv express mongoose multer nodemailer nodemon jsonwebtoken cookie-parser

```

No *.env* coloque a porta 3001 e um nome para o banco de dados. 

Após a configuração inicial,

```sh
npm run dev

```

No terminal, deverá aparecer:

Server started on port 3001
Connected to data base

#### Para rodar os testes:

Pela primeira vez:

```sh
npm i axios ts-jest jest-cucumber

```
Para rodar:


```sh
npm run test

```
### No *frontend*:

```sh
npm i react-scripts

```

Após a configuração inicial,

```sh
npm start

```

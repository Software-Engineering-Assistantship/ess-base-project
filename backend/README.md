# node-boilerplate

## Running the project

1. Assegure-se de ter o **docker/docker-compose**, bem como um gerenciador de pacotes como **pnpm**, **yarn** ou **npm**, instalados em sua máquina.

2. Clone o repositório:

```bash
git clone https://github.com/CITi-UFPE/node-boilerplate.git
```

3. Instale as dependências:

```bash
pnpm install
# or
yarn install
# or
npm install
```

4. Crie um arquivo **.env** na raiz do projeto, com as seguintes variáveis de ambiente:

```dotenv
# ###### GENERAL SETTINGS #######
PROJECT_NAME=boilerplate

# ###### SERVER SETTINGS #######
SERVER_PORT=3001
NODE_ENV=development

# ###### DATABASE SETTINGS #######
DATABASE_TYPE=postgres
DATABASE_HOST=${PROJECT_NAME}-db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=docker
DATABASE_DB=${PROJECT_NAME}

# ###### TEST DATABASE SETTINGS #######
DATABASE_TEST_HOST=localhost
DATABASE_TEST_PORT=5433
DATABASE_TEST_USER=postgres
DATABASE_TEST_PASSWORD=docker
DATABASE_TEST_DB=boilerplate-test

DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}

# ###### JWT SETTINGS FOR AUTHENTICATION #######
JWT_ACCESS_SECRET=0551c0ed-6389-46b1-839e-2e28fc191c89 # token for 30sec
JWT_REFRESH_SECRET=92fba49f6912d14733332bb9ebaac1562f51ee685594acf103d71f685f70868b # token for 7 days

# ###### S3 SETTINGS FOR FILE UPLOADS #######
S3_ENDPOINT=XXXXXX.digitaloceanspaces.com
S3_BUCKET=exemplo-bucket
S3_KEY=
S3_SECRET=
```

5. Para rodar o servidor, execute:

```bash
docker-compose up
```

_**NOTE**: existem diversas variações do comando docker-compose. Algumas usam hífen, algumas não. Alguma precisam de sudo, outras não. Verifique o que funciona no seu caso e tome de exemplo para as demais instruções._

6. Para rodar as migrations, execute com o servidor rodando em outro terminal:

```bash
yarn migration
```

7. Voilá! O servidor está rodando.

## Funcionalidades pré-implementadas:

- Autenticação com JWT;
- Upload de arquivos para o S3;
- Testes de integração com Jest e Supertest;
- Linting com Eslint, para garantir boas práticas;
- Formatação de código com Prettier;
- Documentação com Swagger em _`src/docs`_

## Workflows:

### `cd_main.yml`:

- Faz o deploy da branch `main` no Dokku a cada push;
- Requer duas variáveis de ambiente _no repositório_: `PRIVATE_KEY` e `HOST`.
- Para configurar o Dokku na Digital Ocean, siga [este tutorial](https://www.notion.so/citiufpe/Treinamento-Deploy-com-Dokku-9d65f4bd964149168875e77cf478a4cd).;

### `lint.yml`:

- Roda o ESLint, Typescript e o builder em todos os pull requests e em pushes na develop;

### `test.yml`:

- Roda os testes de integração em todos os pull requests e em pushes na develop;

## Erros comuns:

### Erro ao rodar `docker-compose up`:

- _Bind for 0.0.0.0:3001 failed: port is already allocated_:

  Você provavelmente já tem um servidor rodando na porta 3001. Pare a execução do outro servidor e tente novamente.

  ```bash
  # Para listar os containers rodando, bem como as portas em uso
  docker ps

  # Para parar a execução de um container
  docker stop ID_DO_CONTAINER
  ```

- _Cannot find module XXXXXXXXX_:

  Isso acontece porque o modo em que o docker-compose.yml está configurado monta um volume anônimo para impedir que a node_modules do seu computador sobrescreva a do container. Em outras palavras, o Docker não é capaz de entender que você adicionou uma dependência nova. Portanto, sempre que dependências novas forem instaladas, é necessário rodar:

  ```bash
      # Para parar o container e remover os volumes
      docker-compose down --volumes

      # Para subir o container novamente e reinstalar as dependências
      docker-compose up --build
  ```

  _PS: esse comando não é uma bala de prata, mas bem que poderia ser. Se você empacar com qualquer coisa no Docker, é altamente provável que ele resolva seu problema._

### Erro ao rodar `yarn migration`:

Em caso de erros ao rodar yarn migrations, siga o seguinte modelo mental:

1. **Verifique se o container está rodando.** Se não estiver, rode `docker-compose up` e tente novamente em outro terminal.
2. **Delete a pasta de migrations e tente novamente.** Isso é uma medida aparentemente extrema, mas não há nada de errado nela a não ser que o projeto já tenha sido deployado em produção. Nesse caso, siga as instruções um pouco mais avançadas [neste link](https://www.prisma.io/docs/guides/migrate/production-troubleshooting), preferencialmente acompanhado de alguém com um pouco mais de conhecimento em SQL.

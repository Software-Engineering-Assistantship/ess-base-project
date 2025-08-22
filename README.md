<img src="https://i.imgur.com/45KAhZK.png" alt="logo" width="200" />

# Hotel Trancinvânia

Hotel Trancinvânia é um projeto de sistema de gerenciamento de reservas de hotel, desenvolvido para a disciplina de Engenharia de Software e Sistemas (IF682) do CIn-UFPE, no curso de Engenharia da Computação. Este repositório contém tanto o backend quanto o frontend da aplicação.

## Índice

- [Visão Geral](#visão-geral)
- [Equipe](#equipe)
- [Tecnologias Utiizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração e Instalação](#configuração-e-instalação)
- [Comandos Úteis](#comandos-úteis)

## Visão Geral
Este projeto é um sistema completo de gerenciamento de hotel, permitindo as seguintes features:
- Cadastro e Login
  - Usuário Hoteleiro e Cliente
  - Login com autenticação local e JWT
  - Alteração de cadastro, podendo alterar e-mail, username e senha
  - Recuperação de senha através de token enviado por e-mail
- Publicar, Gerenciar e Realizar Reservas
- Salvar, Gostar, Compartilhar e Avaliar Reservas
- Busca de Reservas com Filtros
- Cadastro e Manutenção de Métodos de Pagamento
- Cadastro e Manutenção de Promoções
- Disparo de E-mails

### Tipos de Usuário
#### Cliente
O usuário cliente é aquele que pode realizar, salvar, gostar e compartilhar reservas. Reservas só podem ser avaliadas após ter passado o período de estadia.
#### Hoteleiro
O usuário hoteleiro é aquele que publica e gerencia reservas en seu hotel, podendo cadastrar e gerenciar promoções. 

## Equipe
As pessoas que compõem a equipe são:
- Amanda Cristina Fernandes Medeiros de Lima (acfml)
- Bianca Duarte Santos (bds)
- Maria Letícia do Nascimento Gaspar (mlng)
- Matheus Augusto Monte Silva (mams4)
- Mateus Galdino de Lima Guilherme (mglg)
- Victoria Barbosa Cesar Figueiredo (vbcf)

## Tecnologias Utilizadas

### Back-End
- Node.js, Express e TypeScript
- WSL, Docker, Prisma, PostgreSQL
- Zod
- Passport, JWT e bcrypt

### Front-End
- React e TypeScript
  - React Hook Form
- Chakra UI e Aceternity UI
- ViaCEP API 

### Deployment
- Render (back-end)
- Vercel (front-end)

### Testes
- Jest-Cucumber (back-end)
- Cypress (front-end)

### Outras Ferramentas
- **Gerenciamento de Projetos**: Notion
- **Design**: Figma, Canva e Calligraphr
- **Comunicação**: Discord e WhatsApp

## Estrutura do Projeto
Abaixo está a estrutura principal dos diretórios e arquivos do projeto:
- **backend**: Contém o código fonte do backend da aplicação.
  - **docker**: Configurações e dados do Docker.
  - **prisma**: Configurações e migrações do Prisma.
  - **src**: Código fonte do backend, incluindo controllers, services, repositories, entitites, enums, middleware, routes, utils, etc.
  - **tests**: Testes do backend.
- **config**: Scripts e configurações adicionais.
- **frontend**: Contém o código fonte do frontend da aplicação, que segue a estrutura abaixo:
![image](https://github.com/user-attachments/assets/109668d6-59a8-4ab0-a136-f9e3a025b534)


## Configuração e Instalação

### Pré-requisitos

- Node.js
- Docker
- Docker Compose
- React

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/duartebianca/hotel-trancinvania.git
   cd hotel-trancinvania
    ```
2. Configure e inicie o backend:
   ```bash
    cd backend
    npm install
    docker compose up
    npx prisma migrate dev
    npm run start
    ```
3. Configure e inicie o frontend:
```bash
    cd frontend
    npm install
    npm run dev
```
### Configuração do Banco de Dados
O banco de dados é configurado e gerenciado pelo Prisma. Certifique-se de que o Docker está em execução e que o serviço de banco de dados está ativo.

## Comandos Úteis
- npm run start: Inicia o servidor.
- npm run test: Executa os testes.
- npm run dev: Inicia o frontend.
- npx prisma migrate dev: Executa migrações de banco de dados.

# ESS Back-end Node.js

This is the Back-end base project in Node.js for the Software and Systems Engineering discipline, offered by the Informatics Center (CIn) of the Federal University of Pernambuco (UFPE).

## Table of Contents

1. [Getting Started](##getting-started)
2. [Scripts](#scripts)
3. [Dependencies](#dependencies)
4. [Architecture](#architecture)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project, you'll need to have the following software installed on your system:

- Node.js
- npm (Node Package Manager)

### Installing

Clone the repository and install the dependencies by running the following command in the project directory:

```
npm install
```

### First time running ?

Run the follow scripts

```
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

```
npm run
```

### Environment

This project uses `.env` files to manage environment variables. You can create a `.env.dev` file in the project directory and set the environment variables in the file (iou can create it from .`env.example`). The `env` script in the `package.json` file uses the `env-cmd` package to load the environment variables from the `.env.dev` file.

### Running the Server

To start the server, run the following command:

```
env=dev npm run start
```

This command will run the TypeScript compiler in watch mode and start the server using nodemon.

## Scripts

The following scripts are available in the `package.json` file:

- `start`: Runs the TypeScript compiler in watch mode and starts the server using nodemon.
- `build`: Compiles the TypeScript code.
- `test`: Runs the Jest tests for the project.
- `prettier`: Formats the code using Prettier.
- `lint`: Lints the code using ESLint.

## Dependencies

The following dependencies are used in the project:

- [env-cmd](https://github.com/toddbluhm/env-cmd): A simple way to manage your environment variables in npm scripts.
- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework for Node.js.
- [typescript](https://github.com/microsoft/TypeScript): A typed superset of JavaScript that compiles to plain JavaScript.
- [jest](https://github.com/microsoft/TypeScript): Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [pino](https://github.com/pinojs/pino): Very low overhead Node.js logger.

## Architecture

To understand and learn more details about the structure of the project, click [here](./docs/architecture-pattern.md) to be redirected to the README that contains this information.

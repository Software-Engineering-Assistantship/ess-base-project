# ESS Front-end Next.js

This is the Front-end base project in Next.js for the Software and Systems Engineering discipline, offered by the Informatics Center (CIn) of the Federal University of Pernambuco (UFPE).

## Table of Contents

1. [Getting Started](##getting-started)
2. [Running the tests](#running-the-tests)
3. [Scripts](#scripts)
4. [Dependencies](#dependencies)
5. [Architecture](#architecture)

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

### Running the App

To start the app, run the following command:

```
npm run dev
```

This command will run the Next app in development with Next.js script.
You can acess the app in the following URL: http://localhost:3000

## Running the tests

There is one type of test configured in the base project: E2E acceptance tests using Playwright with Cucumber.


To run E2E tests:

```
npx cucumber-js
```

## Scripts

The following scripts are available in the `package.json` file:

- `dev`: Runs the app in development mode.
- `build`: Compiles the TypeScript code.
- `start`: Starts the app in production mode.
- `lint`: Runs ESLint on your code.

## Dependencies

The following dependencies are used in the project:

- [Next.js](https://nextjs.org/docs): Used by some of the world's largest companies, Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.
- [React](https://github.com/facebook/react): React is a JavaScript library for building user interfaces.
- [Shadcn/ui](https://ui.shadcn.com/docs): Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
- [Lucide Icons](https://lucide.dev/): Beautiful & consistent icons Made by the community.
- [react-hook-form](https://github.com/react-hook-form/react-hook-form): React Hook Form is a library for React that simplifies form validation and input data handling.
- [zod](https://github.com/colinhacks/zod): Zod is a TypeScript-first schema declaration and validation library. I'm using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

## Architecture

To understand and learn more details about the structure of the project, click [here](./docs/architecture-pattern.md) to be redirected to the README that contains this information.

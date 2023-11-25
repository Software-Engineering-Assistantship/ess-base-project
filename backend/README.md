# ESS Back-end FastAPI ⚡️

This is the Back-end base project in Python with FastAPI for the Software and Systems Engineering discipline, offered by the Informatics Center (CIn) of the Federal University of Pernambuco (UFPE). This backend uses MongoDB for database manipulation.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running MongoDB with Docker](#running-mongodb-with-docker-🐳)
3. [Running the FastAPI server](#running-the-fastapi-server-🦄)
4. [Running the BDD tests](#running-the-bdd-tests)
5. [Dependencies](#dependencies)
6. [Architecture](#architecture)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project, you'll need to have the following software installed on your system:

- Python 3.10

### Installing

Clone the repository and install the dependencies by running the following command in the project directory:

```sh
pip install -r requirements.txt
```

## Running MongoDB with Docker 🐳

Docker is a tool that enables us to separate applications from their infrastructure, allowing us to deliver software quickly. It provides the ability to package and run an application in a loosely isolated environment called a container, facilitating work in standardized environments. To install Docker, it is recommended to follow the [Docker documentation](https://docs.docker.com/engine/install/) specific to your operating system. Additionally, installing [Docker Desktop](https://www.docker.com/products/docker-desktop/) is also recommended for a user-friendly graphical interface and streamlined management of Docker resources. The database is run using [Docker Compose](https://docs.docker.com/compose/install/), which is a container orchestrator. To install Docker Compose, follow the tutorial provided by Docker's official documentation. 

If you are running on Windows, please make sure to open the Docker Desktop application before proceeding. It is required to run the container.

### First time running?

To initialize Docker swarm mode, run the following command:
```sh
docker swarm init
```

This command will set up the necessary infrastructure for running Docker services. Once initialized, you can continue with the rest of the steps to run your application.

Run the follow scripts to build the images and run the containers:

```sh
docker-compose up --build
```

This command will build the necessary container images and start them. Once the containers are up and running, you will be able to use the database for your application.

### Running Database

To run the database container after the initial build, you can simply execute the following command:

```sh
docker-compose up
```

This command will start the database container without rebuilding it, unless you have made any changes to the Docker configuration that require a rebuild.

If you want to run the docker container without watch the logs, you can run 

```sh
docker-compose up -d
```

To stop the docker container, just run:

```sh
docker-compose down
```

### Environment

This project uses `.env` files to manage database environment variables (you can create it from .`env.example`).

## Running the FastAPI server 🦄

To start the server, run the following command:

```sh
uvicorn src.main:app --reload
```

This command will run the Uvicorn compiler in watch mode, so every time a modification occurs the server restarts.

### API documentation

FastAPI provides automatic API documentation that you can access by visiting the /docs endpoint of your application. This documentation is generated based on the code you have written, including route definitions, request and response models, and documentation comments. To view the API documentation, you can go to the URL http://localhost:8000/docs (assuming your FastAPI application is running on localhost and port 8000). This will display a user-friendly interface where you can explore the available endpoints, send requests, and view the corresponding responses. 

The API documentation includes detailed information about each endpoint, such as the expected request and response models, possible response codes, and any additional documentation you have provided in your code. It serves as a helpful reference for developers who want to understand how to interact with your API.

For more information on FastAPI's features and how to use them, you can refer to the [official documentation](https://fastapi.tiangolo.com/features/).

## Running the BDD tests

The base project is configured to perform service tests using Pytest and the Pytest-BDD library, which implements Behavior-Driven Development (BDD) with Cucumber and Gherkin syntax.

To run all the tests, simply navigate to the root directory of your project and run the following command:

```sh
pytest 
```

If you want to enable verbose output and print statements during the test execution, you can use the ```-sv``` option:
```sh
pytest -sv
```

The ```-s``` option allows printing of statements and the ```-v``` option provides more detailed information about the test execution, including the names of the tests being run. By running the tests with these options, you can get a more comprehensive view of the test execution process, including any print statements or debug information that you have included in your test code.

### Organizing the tests

The tests are located in the Tests folder, where we organize the test code for different components. Within each component folder, we have two main directories: features and step-definitions. This separation allows us to keep the feature files and step definitions organized and maintainable.

#### Features

This directory is intended to store all the .feature files, which are used to describe the features using scenarios with a Cucumber and Gherkin BDD approach. In the feature files, you will find the high-level description of the desired behavior in a human-readable format. The scenarios outline specific steps and expected outcomes, allowing stakeholders to understand and validate the expected behavior of the software.

#### Step Definitions

The second main directory in the Tests folder is the Step Definitions directory. This directory contains the step definition files, which define the behavior and implementation of each step in the feature scenarios, that is the actions, assertions, and interactions necessary to execute the scenarios. In the step definition files, you will find Python functions that are annotated with the corresponding Given, When, and Then steps from the feature files. These functions implement the actual logic and actions to be performed for each step in the scenario.

***Note:*** *To ensure that Pytest recognizes the files as tests, it's important to follow the naming convention by prefixing all test files with "test_". By using the "test_" prefix, Pytest can automatically discover and execute the test files during the test execution.*


## Dependencies

The following dependencies are used in the project:

- [python-dotenv](https://pypi.org/project/python-dotenv/): A simple way to manage your environment variables in python scripts.
- [FastAPI](https://fastapi.tiangolo.com/): A modern, fast (high-performance), web framework for building APIs with Python.
- [Uvicorn](https://www.uvicorn.org/): An ASGI web server implementation for Python.
- [Docker](https://docs.docker.com/get-started/overview/): Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.
- [Docker Compose](https://docs.docker.com/compose/): Docker Compose is a tool for defining and running multi-container Docker applications.
- [Pydantic](https://docs.pydantic.dev/latest/): The most widely used data validation library for Python.
- [Pymongo](https://pymongo.readthedocs.io/en/stable/tutorial.html): A Python distribution containing tools for working with MongoDB, and is the recommended way to work with MongoDB from Python.
- [Pytest](https://docs.pytest.org/en/7.4.x/): Framework that makes it easy to write small, readable tests, and can scale to support complex functional testing for applications and libraries.
- [Pytest-BDD](https://pypi.org/project/pytest-bdd/): Library for Pytest that implements a subset of the Gherkin language to enable automating project requirements testing and to facilitate behavioral driven development.
## Architecture

To understand and learn more details about the structure of the project, click [here](./docs/architecture-pattern.md) to be redirected to the README that contains this information.



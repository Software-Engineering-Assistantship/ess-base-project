# Architecture Pattern

The base project was created to give a quick "start" to the discipline's team projects. But, at the same time, we didn't want to give up a certain level of organization that helps to develop features safely and makes it easier to create tests.

## Table of Contents

1. [Layered architecture](#layered-architecture)
2. [Routes](#routes)
3. [Conclusion](#conclusion)

---

# Layered architecture

Layered architecture is a software design approach where the software is separated into different layers (functional areas), each with a specific role and responsibility. In a typical layered architecture, you will find the following layers:


## Database Layer

The database layer serves as a connection between the services, which represent the business data, and the actual database. Its main responsibility is to handle all the database operations, including create, read, update, and delete (CRUD) operations. It acts as an interface to interact with the underlying database or storage system.

The database layer receives the processed data from the service layer and performs the necessary queries and operations to interact with the database. It ensures that the data is properly stored and retrieved from the database. The database layer returns response objects, which are then passed back through the service layer and ultimately to the API layer.


This layer consists of several components:

### Schemas

The schemas folder contains the implementation of database-specific data structures. It defines the models and schema for the data that will be stored in the database. This ensures that the data is structured and conforms to the database requirements.

### Serializers

The serializers folder is responsible for transforming the data objects based on the database schemas. It provides functions and methods to serialize the data, which means converting the Pydantic data objects into dictionaries or formats suitable for storage in the database.

#### [EXTRA] Config

The config folder includes an example database and provides methods for setting up the necessary collections or tables required for the project's initial database configuration. This helps in creating a basic database setup that can be used at the beginning of the project.

## Service Layer

The service layer is responsible for implementing the business logic of your application. It interacts with the API layer to retrieve or store business data, performs any required processing, and then passes the data back to the API layer. By acting as an intermediate layer between the API and database layers, the service layer ensures that the data is prepared and processed before being sent to the database layer. This prevents direct queries to the database and ensures that the data is properly handled within the service layer.

## API Layer

This is the topmost layer in the backend architecture and one the user can directly interact with. So, this layer is responsible for handling user requests and controlling the flow of the application. It interacts with the service layer to perform business operations and sends back the responses to the client. In a web application, these are typically the endpoints of your API.


## Why use the Layered Architecture?

The layered architecture approach helps in separating concerns, making the software solution scalable, and also promotes high cohesion and low coupling. This design pattern is beneficial because it aligns with the Single Responsibility Principle (SRP), which is a key aspect of SOLID principles in software design and architecture. Each layer has a specific role and does not need to concern itself with the responsibilities of any other layer. This makes each layer independently modifiable and testable, leading to a software design that is easier to maintain and expand.

## What is the Schemas for?

The schemas folder in the main project is not considered a separate layer in the architecture. It serves a specific purpose of providing a final representation of the data that is returned from the application. One common scenario is when retrieving user data from the database. In this case, we may want to exclude sensitive information like the password. These models allow us to define the structure of the returned data, ensuring that only the necessary and appropriate fields are included. By using schemas, we can customize the data representation without impacting the underlying entities or database structure.

Feel free to explore alternatives for representing these data operations.

---

# Routes

It's worth mentioning the [router.py](../src/api/router.py) file, which is responsible for defining our backend routes and endpoints. The purpose of this file is straightforward: you can configure each new API by using the ```include_router``` method.

For example:
```sh
api_router.include_router(items.router, prefix="/items", tags=["items"])

```
When adding a new API route, make sure to initialize the router in the corresponding API file. An example is already provided in the [items.py](../src/api/items.py)  file, and the approach remains the same for all APIs. This ensures that the APIs and their endpoints are registered and recognized within the application.

---

# Conclusion

Certainly, there are more details about the functionalities that are used in the project. However, the **Test** example case already covers many aspects, including testing. The base project is designed to make it easy, not to limit your preferences. What needs to be emphasized is that the main idea is the architecture used, which clearly distributes code responsibilities, thus facilitating maintenance and testing.
# Architecture Pattern

The base project was created to give a quick "start" to the discipline's team projects. But, at the same time, we didn't want to give up a certain level of organization that helps to develop features safely and makes it easier to create tests.

## Table of Contents

1. [Layered architecture](#layered-architecture)
2. [What is the Model for?](#what-is-the-model-for)
3. [Dependency Injection](#dependency-injection)
4. [Database](#database)
5. [Routes](#routes)
6. [Conclusion](#conclusion)

---

# Layered architecture

Layered architecture is a software design approach where the software is separated into different layers (functional areas), each with a specific role and responsibility. In a typical layered architecture, you will find the following layers:

## Entities Layer

This layer represents the business data and the rules or logic that govern access to and updates of this data. These are typically the business objects (like Users, Products, Orders, etc.) and are independent of any specific technological choice (database, external services, etc.). They just contain data and methods to manipulate this data.

## Repository Layer

This layer acts as a bridge between the entities (business data) and the database. It is responsible for all database operations like create, read, update, and delete (CRUD). It basically interacts with your database or any other storage system.

## Service Layer

This layer contains the business logic of your application. It uses the repository layer to persist or retrieve the business data, performs necessary processing and passes the data to the controller. The service layer acts as an intermediary between the web layer (controllers) and the data access layer (repositories).

## Controller Layer

This layer is responsible for handling user requests and controlling the flow of the application. It interacts with the service layer to perform business operations and sends back the responses to the client. In a web application, these are typically the endpoints of your API.

The layered architecture approach helps in separating concerns, making the software solution scalable, and also promotes high cohesion and low coupling. This design pattern is beneficial because it aligns with the Single Responsibility Principle (SRP), which is a key aspect of SOLID principles in software design and architecture. Each layer has a specific role and does not need to concern itself with the responsibilities of any other layer. This makes each layer independently modifiable and testable, leading to a software design that is easier to maintain and expand.

---

# What is the Model for?

Models here are not absolutely essential, but are primarily used as a final representation of returned data. Unlike entities, which we can think of as a direct representation of a database table in code, we use models to represent what we could return in an endpoint.
For example, when retrieving a user from the database, we might not want to return its password. In this case, the model could represent a user excluding the password field.

But we can follow for example the idea of [​​DTOs](https://www.okta.com/identity-101/dto/), which would also be a good idea.
Feel free to explore alternatives for representing these data operations.

# Dependency Injection

Is a design pattern that allows a system to be more flexible, testable, and modular. It's a form of Inversion of Control (IoC) which means that the control is inverted - instead of an object controlling its own dependencies, it's controlled by an outside party.

In our case, we came up with a "homemade" solution that, overall, works very well. We use the Injector class, which is in charge of controlling our application's dependencies through its methods: registerService, getService, registerRepository and getRepository. The use of this class can be seen in the index.ts file, located in the **src/di folder**.

# Database

The idea of ​​a base project may seem complex when it proposes to cover many possibilities of use. Considering a practical and simple case, in this base project we are using the idea of ​​a "database" at runtime. In the **src/database/index.ts** file, we can observe the implementation of a simple interface for a database, where each "table" would be a set of key-values. Please don't see this as a limiter. If you prefer, you can choose to use a real database, be it SQL or NoSQL. By maintaining a similar level of project organization, the benefits will be the same.

To manipulate our database with base methods, we have a class called BaseRepository. This will be extended by other repositories, thus allowing the inheritance of these methods and the reuse of our code's logic.

# Routes

Worth mentioning is our backend routes/endpoints definition file located at **src/routes/index.ts**. Its idea is simple: for each new controller, you can configure it inside 'export default' using **'app.use'**.

```
export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new ExampleController(router, di.getService(ExampleService)).router
  );
};

```

There is already an example in the file and the approach would be the same for all controllers. Thus, the controllers and their endpoints are registered and recognized in the application.

# Conclusion

Certainly, there are more details about the functionalities that are used in the project. However, the **Test** example case already covers many aspects, including testing. The base project is designed to make it easy, not to limit your preferences. What needs to be emphasized is that the main idea is the architecture used, which clearly distributes code responsibilities, thus facilitating maintenance and testing.

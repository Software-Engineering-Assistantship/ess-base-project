# Architecture Pattern

The base project was created to give a quick "start" to the discipline's team projects. But, at the same time, we didn't want to give up a certain level of organization that helps to develop features safely and makes it easier to create tests.

## Table of Contents

1. [Separation into modules](#layered-architecture)
2. [Shared](#shared)
3. [Navigation](#navigation)
4. [Conclusion](#conclusion)

---

# Separation into modules

The idea here is that each flow or important part of the project is separated into modules. Let's imagine that you have an authentication section, where you can create an account, log in or even recover a password. We can consider this case as an authentication module.

## Components

The interface components that can be reused in other parts of the module in question would be created in the "components" folder. For example, a modal with terms of use that appears both in the login process and in account creation. Therefore, this modal would be located in the "autenticacao" module, inside the "components" folder.

## Pages

The pages would be where the "full screens" would go. For example, a login page would have inputs, buttons, and other components needed for that specific functionality.

## Context

The context is made up of a series of files that we will try to explain in parts. In general, this is where we concentrate our application's business logic, such as functions to make requests to the back-end and module state management, among other aspects.

To manage state, we will be using React's useReducer. Consequently, we will use actions logic to determine what changes should be made to the state.

### types.ts

As the name suggests, this is a type definition file. Here, we define the data types for the state, that is, the attributes that the state must have, and the types of actions, which basically define which actions can be used to manipulate the state.

### reducer.ts

In this file, we have the reducer function, which receives an action and the current state, and makes the necessary changes to the state based on that action.

### service.ts

The service file is where we concentrate the functions responsible for executing the business logic actions. These service functions are called from pages and components when needed.

### index.tsx

In this file, we create our provider (provider) using React Context. With it, we can share the state and services (services) throughout the application or in specific parts. If you have questions about Context, I recommend consulting the official React [documentation](https://react.dev/learn/passing-data-deeply-with-context).

# Shared

The "shared" folder is the representation of a module that contains information that can be reused in other modules. For example, it can include a generic button component that can be used in different parts of the application.

# Navigation

To navigate the application, we use the **react-router-dom** package, and its configuration is done in the **App.tsx** file. There's not much to explain here, it's simply the use of React in conjunction with the most popular navigation library.

# Conclusion

Certainly, there are more details about the functionalities that are used in the project. However, the **Home** module example case already covers many aspects, including testing. The base project is designed to make it easy, not to limit your preferences. What needs to be emphasized is that the main idea is the architecture used, which clearly distributes code responsibilities, thus facilitating maintenance and testing.

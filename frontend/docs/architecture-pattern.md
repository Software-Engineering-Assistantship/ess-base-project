# Architecture Pattern

The base project was created to give a quick "start" to the discipline's team projects. But, at the same time, we didn't want to give up a certain level of organization that helps to develop features safely and makes it easier to create tests.

## Table of Contents

1. [Separation into modules](#layered-architecture)
2. [Conclusion](#conclusion)

---

# Public

Next.js can serve static files, like images, under a folder called public in the root directory. Files inside public can then be referenced by your code starting from the base URL (/).

# App

The concept here is to break down the project into distinct modules based on functionality or workflow. For instance, consider an authentication feature that includes account creation, login, and password recovery. This can be encapsulated as an 'authentication' module.

In this project, we utilize the App Router for module creation. To create a module, you need to create a directory named after the module (e.g., 'auth'). Each subdirectory within this module directory is recognized as a separate router. For instance, the file located at src/app/auth/login/page.tsx will be treated as a distinct router within the 'auth' module.

This modular approach promotes separation of concerns, making the codebase more manageable and scalable.

## Components

Reusable interface components are stored in the "components" folder. For instance, a 'Terms of Use' modal that is used during both the login and account creation processes would be located in this folder.

It's recommended to leverage the Shadcn/ui components whenever possible to facilitate component creation. Shadcn will generate the base modules inside the src/components/ui folder. This approach promotes reusability and consistency across the application.

# Conclusion

Certainly, there are more details about the functionalities that are used in the project. However, the **Home** module example case already covers many aspects, including testing. The base project is designed to make it easy, not to limit your preferences. What needs to be emphasized is that the main idea is the architecture used, which clearly distributes code responsibilities, thus facilitating maintenance and testing.

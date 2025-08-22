import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { jwtDecode } from "jwt-decode"; // You may need to install this package

// Interface for login response
interface LoginResponse {
  token: string;
  // Add other properties if needed
}

// Function to log in as client using cy.request
const loginAsClient = (username: string, password: string) => {
  return cy
    .request<LoginResponse>({
      method: "POST",
      url: "http://localhost:5001/auth/client/login", // Replace with your actual login endpoint
      body: { username, password },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.exist;

      const token = response.body.token;
      const decodedToken = jwtDecode(token) as { id: string };
      Cypress.env("userId", decodedToken.id);
      Cypress.env("token", token);

      return token;
    });
};

// Function to delete user by ID
const deleteUserById = (userId: string) => {
  return cy
    .request({
      method: "DELETE",
      url: `http://localhost:5001/client/delete/${userId}`, // Replace with your actual API endpoint
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      failOnStatusCode: false, // This prevents the test from failing if the user doesn't exist
    })
    .then((response) => {
      if (response.status === 200) {
        cy.log(`User with ID ${userId} deleted successfully`);
      } else {
        cy.log(`User with ID ${userId} not found or couldn't be deleted`);
      }
    });
};

// Function to log out (you may need to adjust this based on your logout mechanism)
const logout = () => {
  // Clear token and userId from Cypress environment
  Cypress.env("token", null);
  Cypress.env("userId", null);

  // If you have a logout endpoint, you can make a request to it here
  // cy.request('POST', '/auth/logout');
};

// Before hook to run before scenarios tagged with @deleteUser
Before({ tags: "@deleteUser" }, function () {
  loginAsClient("bibi123", "fantasminhas")
    .then(() => {
      const userId = Cypress.env("userId");
      if (userId) {
        deleteUserById(userId);
      } else {
        cy.log("User ID not found in token");
      }
    })
    .then(() => {
      logout();
    });
});

Given("eu estou na página {string}", (page: string) => {
  cy.visit(page);
});

When(
  "eu preencho o campo {string} com {string}",
  (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).type(value);
  }
);

When("eu seleciono {string}", (button: string) => {
  cy.get(`[data-cy="${button}"]`).click();
});

Then(
  "eu vejo um toast de sucesso com a mensagem {string}",
  (message: string) => {
    cy.get(".Toastify__toast-body").should("contain.text", message);
  }
);

Then("eu vejo um toast de erro com a mensagem {string}", (message: string) => {
  cy.get(".Toastify__toast-body").should("contain.text", message);
});

Then("eu continuo na página {string}", (page: string) => {
  cy.url().should("include", page);
});

Then("eu sou redirecionado para a página {string}", (page: string) => {
  cy.url().should("include", page);
});

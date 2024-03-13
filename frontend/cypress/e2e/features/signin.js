import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given("o usuário está na página de cadastro", () => {
    cy.visit("http://localhost:3000/signup"); 
});

When("o usuário insere o nome {string}, o email {string} e a senha {string}", (nome, email, senha) => {
    cy.get('.namesignin').clear().type(nome);
    cy.get('.emailsignin').clear().type(email)
    cy.get('#password').clear().type(senha)
    cy.get('.signupbutton').click(); 
});

Then("eu tenho um cadastro", () => {
    cy.url().should('include', '/login');
    
});



Given("o usuário está na página de cadastro", () => {
    cy.visit("http://localhost:3000/signup"); 
});

When("o usuário insere o nome {string}, o email {string} e a senha {string}", (nome, email, senha) => {
    cy.get('.namesignin').clear().type(nome);
    cy.get('.emailsignin').clear().type(email)
    cy.get('#password').clear().type(senha)
    cy.get('.signupbutton').click(); 
});

Then("eu tenho um cadastro falho", () => {
    cy.url().should('include', '/signup');
    
});


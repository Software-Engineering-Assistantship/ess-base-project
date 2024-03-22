import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

Given("estou na página de login", () => {
    cy.visit("http://localhost:3000/login")
})

When("eu preencho o campo e-mail com {string} e senha com {string}", (email, senha) => {
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type(senha)
    cy.get('.loginbutton').click()
})

Then("eu tenho um login de sucesso", () => {
    cy.get('.profileInfo')
})






Given("usuário está na página login", () => {
    cy.visit("http://localhost:3000/login");
});

When("o usuário insere o email {string} e a senha {string}", (email, senha) => {
    cy.get('.input-field1').clear().type(email); 
    cy.get('.input-field2').clear().type(senha);
    cy.get('.loginbutton').click(); 
});

Then("eu tenho um login falhado", () => {
    cy.get('.loginfalha').should('be.visible'); 
});
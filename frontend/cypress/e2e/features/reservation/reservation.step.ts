import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('eu estou logado como cliente com o username {string} e a senha {string}', (username: string, password: string) => {
    cy.visit('/client/login');
    cy.get('[data-cy="username-c"]').type(username);
    cy.get('[data-cy="password-c"]').type(password);
    cy.get('[data-cy="login-button-c"]').click();
})

Given('eu estou na página {string} da reserva do {string} com capacidade de hóspedes igual a {string}', (page: string, hotelName: string, people: string) => {
    cy.get(`[data-cy="${hotelName}"]`).click();
    cy.get('[data-cy="realizar-reserva"]').click();
    cy.contains(people).should('be.visible');
    cy.url().should('include', page);  
})

Given('eu estou na página {string}', (page: string) => {
    cy.url().should('include', page);
})

When('eu seleciono a opcao {string}', (option: string) => {
    cy.get('[data-cy="menu-c-button"]').trigger('mouseover');
    cy.get('a').contains('Meu Perfil').should('be.visible').click();
})

When('eu preencho o campo {string} com {string}', (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).type(value);
})

When('eu preencho o campo data checkin com "2024-07-25"', () => {
    cy.get(`[data-cy="checkinn"]`).click();  
    cy.get(`[data-cy="checkinn"]`).click(); 
    cy.get('.react-datepicker__day--025').click();
});

When('eu preencho o campo data checkout com "2024-07-27"', () => {
    cy.get(`[data-cy="checkoutt"]`).click();  
    cy.get(`[data-cy="checkoutt"]`).click(); 
    cy.get('.react-datepicker__day--027').click();
});

When('eu preencho o campo data checkin com "2024-07-28"', () => {
    cy.get(`[data-cy="checkinn"]`).click();  
    cy.get(`[data-cy="checkinn"]`).click(); 
    cy.get('.react-datepicker__day--028').click(); 
});

When('eu seleciono {string}', (button: string) => {
    cy.get(`[data-cy="${button}"]`).click();
})

When('eu seleciono o pagamento {string}', (card: string) => {
    cy.get('.css-b62m3t-container').click();
    cy.contains('**** **** **** 1111').should('be.visible').click();
})

Then('eu vejo um toast de sucesso com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
})

Then('eu sou redirecionado para a página {string}', (page: string) => {
    cy.url().should('include', page);
})

Then('eu vejo a reserva do {string}', (hotelName: string) => {
    cy.contains(hotelName).should('be.visible');
})

Then('eu vejo um toast de erro com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
})

Then('eu continuo na página {string}', (page: string) => {
    cy.url().should('include', page);
})




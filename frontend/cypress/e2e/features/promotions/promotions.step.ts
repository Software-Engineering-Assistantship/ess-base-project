import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('eu estou logado como hoteleiro com o username {string} e a senha {string}', (username: string, password: string) => {
    cy.visit('/hotelier/login');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="login-button"]').click();
})

Given('eu estou na página {string}', (page: string) => {
    cy.url().should('include', page);
})

Given('eu estou na página {string} da reserva do {string}', (page: string, hotelName: string) => {
    cy.get(`[data-cy="${hotelName}"]`).click();
    cy.url().should('include', page);
})

Given('eu estou na página {string} da reserva do {string} com o valor da diária por {string}', (page: string, hotelName: string, price: string) => {
    cy.get(`[data-cy="${hotelName}"]`).click();
    cy.get('[data-cy="cadastrar-promocao"]').click();
    cy.contains(price).should('be.visible');
    cy.url().should('include', page);
})

Given('o {string} tem uma promoção de {string} cadastrada com o valor promocional de {string} a diária', (hotelName: string, discount: string, new_price: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(new_price).should('be.visible');
        cy.contains(discount).should('be.visible');
    });
})

Given('o {string} com o valor promocional de {string} a diária', (hotelName: string, new_price: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(new_price).should('be.visible');
    });
})

Given('o {string} não possui nenhuma promoção cadastrada', () => {
    cy.get('[data-cy="promotion"]').should('not.exist');
})

Given('o {string} está nas reservas publicadas com o valor de {string} a diária', (hotelName: string, price: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(price).should('be.visible');
    });
})

Given('não há nenhuma promoção cadastrada', () => {
    cy.get('[data-cy="promotion"]').should('not.exist');
})

When('eu preencho o campo {string} com {string}', (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).type(value);
})

When('eu seleciono a promoção {string}', (type: string) => {
    cy.get('[data-cy="type"]').select(type);
})

When('eu seleciono {string}', (button: string) => {
    cy.get(`[data-cy="${button}"]`).click();
})

When('eu tento deletar a promoção', () => {
    cy.get('[data-cy="deletar-promocao"]').click();
    cy.contains('Tem certeza?').should('be.visible');
    cy.contains('Esta ação não pode ser desfeita e a promoção será removida permanentemente do sistema.').should('be.visible');
    cy.get('[data-cy="yes-button"]').click();
})

When('eu tento deletar as promoções', () => {
    cy.get('[data-cy="deletar-promocoes"]').click();
    cy.contains('Tem certeza?').should('be.visible');
    cy.contains('Esta ação não pode ser desfeita e as promoções serão removidas permanentemente do sistema.').should('be.visible');
    cy.get('[data-cy="yes-button"]').click();
})

Then('eu vejo um toast de sucesso com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
})

Then('eu vejo um toast de erro com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
})

Then('eu sou redirecionado para a página {string}', (page: string) => {
    cy.url().should('include', page);
})

Then('eu continuo na página {string}', (page: string) => {
    cy.url().should('include', page);
})

Then('eu vejo o {string} com o valor de {string}', (hotelName: string, new_price: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(new_price).should('be.visible');
    });
})
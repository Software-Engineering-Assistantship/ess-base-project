const { Given, When, Then } = require("cypress-cucumber-preprocessor");

function addressSeparation(addr) {
    var regex = /(.+),\s*(\d+)\s*-\s*(.+),\s*(.+)/;
    
    var match = addr.match(regex);
    
    if (match) {
        return {
            street: match[1].trim(),
            number: match[2].trim(),
            neighborhood: match[3].trim(),
            city: match[4].trim()
        };
    } else {
        return null;
    }
}

Given('o usuário está na página {string}', (page) => {
    cy.visit('page');
});

Given('o usuário vê {string} como nome de um restaurante', (restaurantName) => {
    cy.contains('.restaurant-preview', restaurantName).should('be.visible');
});

Given('o usuário vê {string} como endereço do restaurante', (restaurantAddress) => {

    let endereco_sep = addressSeparation(endereco)

    cy.get('#number').should('contain',endereco_sep.number)
    cy.get('#neighborhood').should('contain',endereco_sep.neighborhood)
    cy.get('#city').should('contain',endereco_sep.city)
    cy.get('#street').should('contain',endereco_sep.street)
});

When('o usuário deleta {string}', (restaurantName) => {
    cy.get('.restaurant-preview').contains(restaurantName).parent().find('.delete-button').click();
});

Then('o usuário vê a mensagem {string}', (message) => {
    cy.contains('.modal-body', message).should('be.visible');
});

When('o usuário clica em {string}', (buttonLabel) => {
    cy.contains('.modal-button', buttonLabel).click();
});

And('o usuário está na página {string}', (page) => {
    cy.url().should('include', page);
});

And('o usuário não vê {string} com localização {string}', (restaurantName, restaurantAddress) => {
    cy.contains('.restaurant-preview', restaurantName).should('not.exist');
    cy.contains('.restaurant-preview', restaurantAddress).should('not.exist');
});
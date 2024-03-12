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

Given("o usuário está na página {string}", (page) => {
    cy.visit(page);
});

Given('o restaurante "{string}" não está cadastrado no site', (restaurantName) => {
    cy.request('GET', 'http://localhost:3001/restaurants')
        .then((response) => {
            const restaurants = response.body.find(restaurant => restaurant.name === restaurantName);
            expect(restaurants).to.be.undefined; 
        });
});

When("o usuário define o nome do restaurante como {string}", (nome) => {
  cy.get('#restaurantName').type(nome)
});

When("o usuário define o endereço como {string}", (endereco) => {

    let endereco_sep = addressSeparation(endereco)

    cy.get('#number').type(endereco_sep.number)
    cy.get('#neighborhood').type(endereco_sep.neighborhood)
    cy.get('#city').type(endereco_sep.city)
    cy.get('#street').type(endereco_sep.street)
});

When("o usuário define o tipo de comida como {string}", (tipoComida) => {
    cy.get('#typeOfFood').type(tipoComida)
});

When("o usuário salva o cadastro", () => {
    cy.get('#create-button').click();
});

Then('o usuário vê a mensagem "{string}"', (mensagem) => {
    cy.contains(mensagem).should('be.visible')
});

Then("o usuário clica em {string}", (botao) => {
    cy.get('#cancelBtn').click()
});

Then('o usuário vê "{string}" como nome do restaurante', (nomeRestaurante) => {
    cy.get('#restaurant-name').should('contain', nomeRestaurante)
});

Then('o usuário vê "{string}" como tipo de comida', (tipoComida) => {
    cy.get('#restaurant-name').should('contain', tipoComida)
});

Then('o usuário vê "{string}" como endereço', (endereco) => {
    let endereco_sep = addressSeparation(endereco)

    cy.get('#address').should('contain', endereco_sep.number)
    cy.get('#address').should('contain', endereco_sep.street)
    cy.get('#address').should('contain', endereco_sep.neighborhood)
    cy.get('#address').should('contain', endereco_sep.city)
});
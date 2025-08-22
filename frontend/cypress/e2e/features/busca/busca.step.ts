import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";


// cenário 1 - fazer uma busca de reservas sem login, encontrando reservas
Given('eu estou na página inicial', () => {
    cy.visit('/');
})

Given('eu não estou logado', () => {
    cy.get('[data-cy="usernameNavBar"]').should("contain.text", "Conta");
})

When('eu preencho o campo {string} com {string}', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})

// And eu preencho o campo "check-in" com "21/07/2024"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})

// And eu preencho o campo "checkout" com "2024-07-22"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})

// And eu clico no campo "detalhes"
When('eu clico no campo {string}', (campo: string) => {
    cy.get(`[data-cy="${campo}"]`).click();
})

// And eu clico no campo de "adultos" "2" vezes
When('eu clico no campo de {string} {string} vezes', (campo: string, vezes: string) => {
    for(let i = 0; i < parseInt(vezes); i++){
        cy.get(`[data-cy=increase_${campo}]`).click()
    }
})

// And eu clico no campo de "quartos" "1" vez
When('eu clico no campo de {string} {string} vez', (campo: string, vezes: string) => {
    for(let i = 0; i < parseInt(vezes); i++){
        cy.get(`[data-cy=increase_${campo}]`).click()
    }
})

// And eu clico em "pesquisar"
When('eu clico em {string}', (campo: string, vezes: string) => {
    cy.get(`[data-cy=${campo}]`).click();
})

// Then eu sou redirecionado para a página "/search"
Then('eu sou redirecionado para a página {string}', (url: string) => {
    cy.url().should("include", url);
})

// And eu vejo o "Quarto Outono" com o valor promocional de "1000"
Then('eu vejo o {string} com o valor promocional de {string}', (name: string, value: string) => {
    cy.get("[data-cy=reservation_name]").should("contain.text", name);
    cy.get("[data-cy=reservation_price]").should("contain.text", parseFloat(value).toLocaleString("pt-br", {style: "currency", currency: "BRL"}))
})

// -----------------------------
// cenario 2 - fazer uma busca de reservas sem login, sem encontrar reservas
// Given eu estou na página inicial 
// And eu não estou logado
// When eu preencho o campo "destino" com "Recife"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu preencho o campo "checkin" com "2024-07-23"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu preencho o campo "checkout" com "2024-07-28"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu clico no campo "popover-trigger-detalhes"
// And eu clico no campo de "adultos" "2" vezes
// And eu clico no campo de "quartos" "1" vez
// And eu clico em "pesquisar"
// Then eu sou redirecionado para a página "/search?city=Recife&checkin=2024-07-23&checkout=2024-07-28&num_adults=2&num_children=0&num_rooms=1"
// And eu vejo que "Nenhuma reserva foi encontrada"
Then('eu vejo que {string}', (notfound: string) => {
    cy.get("#reservenotfound").should("contain.text", notfound)
})

// -----------------------------
// Scenario: fazer uma busca de reservas sem login, colocando dados errados para quantidade de pessoas
// Given eu estou na página inicial 
// And eu não estou logado
// When eu preencho o campo "destino" com "Recife"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu preencho o campo "checkin" com "2024-07-23"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu preencho o campo "checkout" com "2024-07-28"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu clico no campo de "criancas" "2" vezes
// And eu clico no campo de "quartos" "1" vez
// And eu clico em "pesquisar"
// Then eu vejo um toast de erro com "a quantidade de pessoas está errada"
Then('eu vejo um toast de erro com {string}', (toastMessage: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', toastMessage);
})
// And eu continuo na página de busca de reservas
Then('eu continuo na página de busca de reservas', () => {
    cy.url().should("not.include", "search");
})


// -----------------------------
// Scenario: fazer uma busca de reservas com login, sem preencher todos os campos
// Given eu estou na página inicial
// And eu estou logado como hoteleiro com username "VICCESAR" e senha "VIC1234"
Given("eu estou logado como hoteleiro com username {string} e senha {string}", (username: string, password: string) => {
    cy.visit('/hotelier/login');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="login-button"]').click();
    cy.visit("/")
})
// When eu preencho o campo "checkin" com "2024-07-23"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu preencho o campo "checkout" com "2024-07-28"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})
// And eu clico no campo "detalhes"
// And eu clico no campo de "adultos" "2" vezes
// And eu clico no campo de "quartos" "1" vez
// And eu clico em "pesquisar"
// Then eu vejo uma mensagem dizendo que o "Local não foi especificado"
Then("eu vejo uma mensagem dizendo que o {string}", (toastMessage: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', toastMessage);
})
// And eu continuo na página de busca de reservas


// -----------------------------
// cenario - teste de data padrão em check-in
// Given eu estou na página inicial
// When eu vejo o campo "checkin"
let checkin;
When("eu vejo o campo {string}", (campo: string) => {
    checkin = cy.get(`[data-cy=${campo}]`)
})
// Then ele deve possuir a data de hoje
Then("ele deve possuir como {string} a data de hoje", () => {
    let dataDeHoje = new Date()
    checkin.should("contain.value", dataDeHoje.toISOString().split("T")[0]);
})



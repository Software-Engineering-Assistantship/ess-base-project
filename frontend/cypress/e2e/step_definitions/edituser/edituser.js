import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'

Given("estou na tela {string} logado como {string}", (url, email) => {
    
    cy.visit("http://localhost:3000/login")
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type("Aaaa123!")
    cy.get('.loginbutton').click()
    cy.get('.buttonedit').click()
    cy.get('.profileuseredit').click()
    cy.url().should('include', url)
    
})

And("eu vejo meu nome {string}", (nome) => {
    
    cy.get('.usernameuseredit').should('contain', nome)
    
})

When("eu preencho o campo Nome de Perfil com {string} e confirmo minha mudança", (required) => {
    
    cy.get('.nomeusuario').clear().type(required)
    cy.get('.botaoconfirmar').click()
    
})

Then("eu sou redirecionado minha para página de perfil", () => {
    
    cy.url().should('include', '/users')
    
})

And("eu vejo meu nome alterado {string}", (nome) => {
    
    cy.get('.nameuser').should('contain', nome)
    
})

Given("estou na tela {string} logado com {string} e senha {string}", (url, email, senha) => {
    
    cy.visit("http://localhost:3000/login")
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type(senha)
    cy.get('.loginbutton').click()
    cy.get('.buttonedit').click()
    cy.get('.passworduseredit').click()
    cy.url().should('include', url)
    
})

When("eu preencho o campo Senha atual com {string} e o campo Nova senha com {string} e o campo Confirmar nova senha com {string}", (cursenha, novasenha, confirm) => {
    
    cy.get('.inputfrasesenha').clear().type(cursenha)
    cy.get('.inputfrasenovasenha').clear().type(novasenha)
    cy.get('.inputconfirmarsenha').clear().type(confirm)
    cy.get('.confirmartroca').click()
    
})

Then("eu sou redirecionado página de login", () => {
    
    cy.url().should('include', '/login')
    
})

When("eu faço login com email {string} e senha {string}", (email, novasenha) => {
    
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type(novasenha)
    cy.get('.loginbutton').click()
    
})

Then("eu sou redirecionado para minha página de perfil", () => {
    
    cy.get('.profileInfo')
    
})


Given("estou na tela {string} e logado com {string} e senha {string}", (url, email, senha) => {
    
    cy.visit("http://localhost:3000/login")
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type(senha)
    cy.get('.loginbutton').click()
    cy.get('.buttonedit').click()
    cy.get('.passworduseredit').click()
    cy.url().should('include', url)
    
})

When("eu preencho os campos Senha atual com {string} e o campo Nova senha com {string} e o campo Confirmar nova senha com {string}", (cursenha, novasenha, confirm) =>{
    
    cy.get('.inputfrasesenha').clear().type(cursenha)
    cy.get('.inputfrasenovasenha').clear().type(novasenha)
    cy.get('.inputconfirmarsenha').clear().type(confirm)
    cy.get('.confirmartroca').click()
    
})

Then("eu recebo uma mensagem de erro", () =>{
    cy.get('.tudosenha')
})

And("permaneço na mesma página", () => {
    cy.get('.tudosenha')
})

When("eu faço login novamente com email {string} e senha {string}", (email, senha) => {
    
    cy.visit("http://localhost:3000/login")
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type(senha)
    cy.get('.loginbutton').click()
    
})

Then("não consigo entrar na minha página", () => {
    
    cy.url().should('include', '/login')
    
})

Given("estou na tela de {string} logado com {string} e meu nome é {string}", (url, email, nome) => {
    
    cy.visit("http://localhost:3000/login")
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type("aaaA123!")
    cy.get('.loginbutton').click()
    cy.get('.buttonedit').click()
    cy.get('.advanceduseredit').click()
    cy.get('.usernameuseredit').should('contain', nome)
    cy.url().should('include', url)
    
})

When("eu preencho os campos Digite sua senha com {string} e o campo Confirme sua senha com {string} e confirmo", (senha, senhaerrada) => {
    
    cy.get('.inputfrasesenha').clear().type(senha)
    cy.get('.inputconfirmarsenha').clear().type(senhaerrada)
    cy.get('.confirmardelete').click()
    
})

Then("eu recebo uma mensagem de erro", () => {
    cy.get('.tudosenha')
})

And("eu permaneço logado como {string}", (nome) => {
    cy.get('.usernameuseredit').should('contain', nome)
})

Given("estou na tela da {string} logado com {string}", (url, email) => {
    
    cy.visit("http://localhost:3000/login")
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type("aaaA123!")
    cy.get('.loginbutton').click()
    cy.get('.buttonedit').click()
    cy.get('.advanceduseredit').click()
    cy.url().should('include', url)
    
})

When("eu preencho o campo Digite sua senha com {string} e o campo Confirme sua senha com {string} e confirmo", (senha, cfsenha) => {
    
    cy.get('.inputfrasesenha').clear().type(senha)
    cy.get('.inputconfirmarsenha').clear().type(cfsenha)
    cy.get('.confirmardelete').click()
    
})

Then("eu sou redirecionado para página de login", () => {
    
    cy.url().should('include', '/login')
    
})

When("eu faço um login mais uma vez com email {string} e senha {string}", (email, senha) => {
    
    cy.get('.input-field1').clear().type(email)
    cy.get('.input-field2').clear().type(senha)
    cy.get('.loginbutton').click()
    cy.url().should('include', '/login')
    
})
const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const axios = require('axios');

const expect = chai.expect;
let response;
let baseUrl = "http://localhost:5001/api/search";

Given('o usuário realiza uma requisição de busca no sistema de streaming com o filtro {string}', async function (filtro) {
    try {
        const [rawKey, rawValue] = filtro.split(": ");
        const key = rawKey.toLowerCase().replace(/ /g, ""); 
        const value = rawValue.replace(/ /g, ""); 

        response = await axios.get(`${baseUrl}?${key}=${value}`);
        console.log("Resposta da requisição:", response.data);
    } catch (error) {
        throw new Error(`Falha na requisição: ${error.message}`);
    }
});

// Adicionando suporte para múltiplos filtros
Given('o usuário realiza uma requisição de busca no sistema de streaming com os filtros {string} e {string}', async function (filtro1, filtro2) {
    try {
        const processarFiltro = (filtro) => {
            const [rawKey, rawValue] = filtro.split(": ");
            return {
                key: rawKey.toLowerCase().replace(/ /g, ""),
                value: rawValue.replace(/ /g, "")
            };
        };

        const filtroA = processarFiltro(filtro1);
        const filtroB = processarFiltro(filtro2);

        response = await axios.get(
            `${baseUrl}?${filtroA.key}=${filtroA.value}&${filtroB.key}=${filtroB.value}`
        );
        console.log("Resposta da requisição:", response.data);
    } catch (error) {
        throw new Error(`Falha na requisição: ${error.message}`);
    }
});

When('o backend processa a requisição', function () {
    expect(response.status).to.equal(200); 
});



Then('a resposta contém a propriedade {string}', function (propriedade) {
    expect(response.data).to.have.property(propriedade); 
});

Then('o backend retorna uma lista de filmes do gênero {string}', function (generoEsperado) {
    expect(response.data.resultados).to.be.an('array').that.is.not.empty; 
    response.data.resultados.forEach(filme => {
        expect(filme.genero).to.equal(generoEsperado); 
    });
});

Then('o backend retorna apenas filmes do gênero {string} com avaliação maior ou igual a {float}', function (generoEsperado, avaliacaoMinima) {
    expect(response.data.resultados).to.be.an('array').that.is.not.empty; 
    response.data.resultados.forEach(filme => {
        expect(filme.genero).to.equal(generoEsperado); 
        expect(filme.avaliacao).to.be.at.least(avaliacaoMinima); 
    });
});

Then('o backend retorna apenas filmes lançados no ano {int}', function (anoEsperado) {
    expect(response.data.resultados).to.be.an('array').that.is.not.empty; 
    response.data.resultados.forEach(filme => {
        expect(filme.ano).to.equal(anoEsperado); 
    });
});

// Novo passo para verificar a busca por nome
Then('o backend retorna uma lista de filmes que contém {string} no título', function (tituloEsperado) {
    expect(response.data.resultados).to.be.an('array').that.is.not.empty; 
    response.data.resultados.forEach(filme => {
        expect(filme.titulo.toLowerCase()).to.include(tituloEsperado.toLowerCase());
    });
});

module.exports = {};

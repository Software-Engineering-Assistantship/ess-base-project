Feature: Busca com Filtros

  Scenario: Aplicar um único filtro de gênero
    Given o usuário realiza uma requisição de busca no sistema de streaming com o filtro "genero: Comédia"
    When o backend processa a requisição
    And a resposta contém a propriedade "resultados"
    And o backend retorna uma lista de filmes do gênero "Comédia"

  Scenario: Combinação de múltiplos filtros
    Given o usuário realiza uma requisição de busca no sistema de streaming com os filtros "genero: Ação" e "avaliacao: 7.0"
    When o backend processa a requisição
    And a resposta contém a propriedade "resultados"
    And o backend retorna apenas filmes do gênero "Ação" com avaliação maior ou igual a 7.0

  Scenario: Busca por um ano específico
    Given o usuário realiza uma requisição de busca no sistema de streaming com o filtro "ano: 2016"
    When o backend processa a requisição
    And a resposta contém a propriedade "resultados"
    And o backend retorna apenas filmes lançados no ano 2016

  Scenario: Busca por nome de filme
    Given o usuário realiza uma requisição de busca no sistema de streaming com o filtro "nome: Vingadores"
    When o backend processa a requisição
    And a resposta contém a propriedade "resultados"
    And o backend retorna uma lista de filmes que contém "Vingadores" no título

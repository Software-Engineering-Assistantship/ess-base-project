Feature: Tests

# API
Scenario: Create a test
    Given o TestRepository não tem um test com nome "test"
    When uma requisição POST for enviada para "/api/tests" com o corpo da requisição sendo um JSON com o nome "test"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter o nome "test" 
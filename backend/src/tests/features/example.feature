Feature: Exemplo

Scenario: Cenário de exemplo
  Given I don't have any user with email "a@example.com"
  When I insert a user with: name "Alice", email "a@example.com", cpf "00000000000", password "123456", phone "00000000000"
  Then I should have a user with email "a@example.com"
  And I should have this user with id "1"
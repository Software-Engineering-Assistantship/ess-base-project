Feature: Reviews

Scenario: Remoção de Review
        Given O restaurante de ID "65d2cfb1620894960053d364" contém um review feito pelo usuário de ID "05d29514713ed7cc6fcf3635" e título "Coxinha eh"
        When é feita uma requisição DELETE para "/reviews/65d2cfb1620894960053d364/05d29514713ed7cc6fcf3635/delete"
        Then O status da resposta deve ser "200"
        And O review "Coxinha eh" do restaurante de ID "65d2cfb1620894960053d364" e usuário de ID "05d29514713ed7cc6fcf3635" não deve constar no banco de dados
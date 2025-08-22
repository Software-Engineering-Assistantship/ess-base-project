Feature: Cadastro e manutenção de usuários
	As a usuário do sistema
	I want to criar, atualizar, e deletar minha informação pessoal
	so that eu possa gerenciar os detalhes da minha conta de forma segura e os manter atualizados

Scenario: Cadastro de usuário bem-sucedido
Given não há usuário cadastrado no sistema com usuário “LucasHenrique”
When Faço uma Requisição POST para a rota "/users" com os seguintes dados:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Senha               | X              |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
Then O status da resposta deve ser 201
And a resposta JSON deve conter os seguintes dados:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
And o usuário “LucasHenrique” foi devidamente armazenado no sistema.

Scenario: Cadastro de usuário malsucedido (email já cadastrado)
Given há um usuário cadastrado no sistema com usuário/email “LucasHenrique”
When faço uma Requisição POST para a rota "/users" com os seguintes dados:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Senha               | X              |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
Then O status da resposta deve ser 409
And a resposta JSON deve conter os seguintes dados:
| Campo   | Valor               |
| error   | Email já cadastrado |
| code    | 409                 |
And nenhum novo usuário foi cadastrado no sistema

Scenario: Exibição de usuário bem-sucedido
Given há um usuário cadastrado no sistema com id "2", nome completo "Lucas Henrique", usuário/email "LucasHenrique", data de nascimento "20/02/2004", gênero "Masculino" e foto "minha-foto.jpg"
When faço uma Requisição GET para a rota "/users/2" 
Then o status da resposta deve ser 200
And a resposta JSON deve conter os seguintes dados:
| Campo               | Valor          |
| Id                  | 2              |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |

Scenario: Exibição de todos os usuários cadastrados
Given que há os seguintes usuários cadastrados no sistema:
| Id | Nome completo   | Usuário/Email | Data de nascimento | Gênero    | Foto           |
| 1  | Ana Clara       | AnaClara      | 15/03/1995         | Feminino  | ana-foto.jpg   |
| 2  | Lucas Henrique  | LucasHenrique | 20/02/2004         | Masculino | minha-foto.jpg |
| 3  | João Pedro      | JoaoPedro     | 10/11/1987         | Masculino | joao-foto.jpg  |
When faço uma requisição GET para a rota "/users"
Then o status da resposta deve ser 200
And a resposta JSON deve conter a lista de usuários com os seguintes dados:
| Id | Nome completo   | Usuário/Email | Data de nascimento | Gênero    | Foto           |
| 1  | Ana Clara       | AnaClara      | 15/03/1995         | Feminino  | ana-foto.jpg   |
| 2  | Lucas Henrique  | LucasHenrique | 20/02/2004         | Masculino | minha-foto.jpg |
| 3  | João Pedro      | JoaoPedro     | 10/11/1987         | Masculino | joao-foto.jpg  |


Scenario: Exibição de usuário malsucedido
Given não há usuário no sistema com id "2"
When faço uma Requisição GET para a rota "/users/2" 
Then o status da resposta deve ser 404
And a resposta JSON deve conter os seguintes dados:
| Campo   | Valor                  |
| error   | Usuário não encontrado |
| code    | 404                    |

Scenario: Alteração cadastral bem-sucedida
Given há um usuário cadastrado no sistema com id "2", nome completo "Lucas Henrique", email "lucashenrique", senha "X", data de nascimento "20/02/2004", gênero "Masculino" e foto "minha-foto.jpg" 
When faço uma Requisição PUT para a rota "/users/2" com nome completo "Lucas Henrique Silva", email "lucashenrique@gmail.com", senha "X", data de nascimento "20/02/2004", gênero "Masculino", foto "minha-foto-nova.jpg" 
Then o status da resposta deve ser 200 And a resposta JSON deve conter os seguintes dados:
| Campo              | Valor                   |
| Nome completo      | Lucas Henrique Silva    |
| Usuário/Email      | lucashenrique@gmail.com |
| Senha              | X                       |
| Data de nascimento | 20/02/2004              |
| Gênero             | Masculino               |
| Foto               | minha-foto-nova.jpg     |

Scenario: Alteração cadastral malsucedida (senha errada)
Given há um usuário cadastrado no sistema com id "2", nome completo "Lucas Henrique", email "lucashenrique", senha "X", data de nascimento "20/02/2004", gênero "Masculino" e foto "minha-foto.jpg" 
When faço uma Requisição PUT para a rota "/users/2" com nome completo "Lucas Henrique Silva", email "lucashenrique@gmail.com", senha "X", data de nascimento "20/02/2004", gênero "Masculino", foto "minha-foto-nova.jpg" 
Then o status da resposta deve ser 401 And a resposta JSON deve conter os seguintes dados:
| Campo   | Valor               |
| error   | Senha incorreta     |
| code    | 401                 |

Scenario: Alteração cadastral malsucedida (email já cadastrado)
Given há um usuário cadastrado no sistema com id "2", nome completo "Lucas Henrique", email "lucashenrique", senha "X", data de nascimento "20/02/2004", gênero "Masculino" e foto "minha-foto.jpg" 
And há um outro usuário cadastrado no sistema com id "3", email "felipegomes" e nome completo "Felipe Gomes" 
When faço uma Requisição PUT para a rota "/users/2" com nome completo "Lucas Henrique Silva", email "felipegomes@gmail.com", senha "X", data de nascimento "20/02/2004", gênero "Masculino", foto "minha-foto-nova.jpg" 
Then o status da resposta deve ser 409 And a resposta JSON deve conter os seguintes dados:
| Campo   | Valor               |
| error   | Email já cadastrado |
| code    | 409                 |

Scenario: Exclusão de usuário bem-sucedido
Given há um usuário cadastrado no sistema com id "2", nome completo "Lucas Henrique", email "lucashenrique", data de nascimento "20/02/2004", gênero "Masculino" e foto "minha-foto.jpg" 
When faço uma Requisição DELETE para a rota "/users/2" com senha "X" Then o status da resposta deve ser 200 And a resposta JSON deve conter os seguintes dados: 
| Campo   | Valor            | 
| message | Usuário excluído |

Scenario: Exclusão de usuário malsucedido
Given não há usuário cadastrado no sistema com id "2"
When faço uma Requisição DELETE para a rota "/users/2" com senha "X" Then o status da resposta deve ser 404 
And a resposta JSON deve conter os seguintes dados: 
| Campo | Valor                  | 
| error | Usuário não encontrado |
| code  | 404                    |

Feature: Cadastro e manutenção de usuários
	As a usuário do sistema
	I want to criar, atualizar, e deletar minha informação pessoal
	so that eu possa gerenciar os detalhes da minha conta de forma segura e os manter atualizados

Scenario: Cadastro de usuário bem-sucedido
Given o usuário está na página de “Cadastro de usuários”
And o usuário “LucasHenrique” não fez cadastro
When o usuário preenche os seguintes dados: 
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Senha               | X              |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
Then o usuário recebe um aviso de cadastro bem-sucedido
And o usuário é redirecionado para a página de “Login”

Scenario:  Alteração de dados cadastrais bem-sucedido
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
And vê que os seus dados são:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
When o usuário altera sua “Data de nascimento”, de  “20/02/2004” por “20/02/1994”
And insere sua senha correta: “X”
Then ele recebe um aviso de alteração cadastral bem-sucedida
And o usuário pode ver que seus dados são:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/1994     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |

Scenario: Alteração de dados cadastrais malsucedido
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
And vê que seus dados são:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
When o usuário altera sua “Data de nascimento”, de  “20/02/2004” por “20/02/1994”
And insere sua senha incorreta: “Y”
Then ele recebe um aviso de alteração cadastral malsucedida
And o usuário pode ver que seus dados agora são:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |

Scenario: Remoção de usuário bem-sucedido
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
And vê que seus dados são:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
When seleciona em “deletar minha conta”
Then o sistema pede ao usuário para inserir sua senha
When insere sua senha correta: “X”
Then ele recebe um aviso de remoção cadastral bem-sucedido
And o usuário é redirecionado para página de “Autenticação”

Scenario: Remoção de usuário malsucedida
Given o usuário “LucasHenrique” está na página de “Dados cadastrais” 
And vê que seus dados são:
| Campo               | Valor          |
| Nome completo       | Lucas Henrique |
| Usuário/Email       | LucasHenrique  |
| Data de nascimento  | 20/02/2004     |
| Gênero              | Masculino      |
| Foto                | minha-foto.jpg |
When seleciona em “deletar minha conta”
Then o sistema pede ao usuário para inserir sua senha
When insere sua senha incorreta: “Y”
Then ele recebe um aviso de senha incorreta
And o usuário é solicitado para inserir a senha novamente  
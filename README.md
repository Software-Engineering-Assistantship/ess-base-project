# Bem-vindo ao ESS Base Project! 🗂  🛠

Este projeto serve como ponto de partida para o desenvolvimento de aplicações utilizando os *frameworks* de *backend* e *frontend* escolhidos pela equipe.

---

## Sobre o Projeto

O Projeto Base de ESS utiliza o conceito de ***[Subtrees]('https://www.atlassian.com/br/git/tutorials/git-subtree')*** do Git para integrar dois repositórios separados, um para o *backend* e outro para o *frontend*. Esses repositórios são clonados dentro deste projeto, em pastas separadas, permitindo o desenvolvimento simultâneo das camadas de *frontend* e *backend*.


## Passo a Passo 🚶

### Crie um *Fork* 

Se você ainda não tem, faça um *fork* **[deste repositório](https://github.com/Software-Engineering-Assistantship/ess-base-project)** para a sua conta do GitHub.

### Clone o seu *Fork* 

Clone o repositório forkado para o seu ambiente de desenvolvimento local.
### Instale o *Python 3* 🐍

Certifique-se de ter o *Python* instalado em seu sistema. Se necessário, faça o download e a instalação do *Python* em https://www.python.org/.

### Abra o seu projeto localmente 💻

Abra o terminal e navegue até o diretório do seu projeto base.

### Escolha os *Frameworks* 📝

Para prosseguir com a criação do projeto base, é importante que você e sua equipe tenham decidido previamente quais *frameworks* de *backend* e *frontend* serão utilizados. 

#### *Frameworks* Suportados:

- ***Frontend*:** React ⚛️, Angular 🅰️, Vue.js 🔥 e Next.js 🇳
- ***Backend*:** NodeJS 🚀 e FastAPI ⚡️

Certifique-se de que todos estejam alinhados na escolha dos *frameworks* antes de prosseguir com o processo de criação do projeto. Isso garantirá que você esteja utilizando as tecnologias desejadas e poderá aproveitar ao máximo o potencial oferecido por cada *framework* selecionado.

### Crie o Projeto Base 📁

Para criar o projeto, execute o comando abaixo:
```sh
pip install inquirer && python3 ./config/cli.py

```
ou, caso o comando ```python3``` não exista em sua máquina, execute:

```sh
pip install inquirer && python ./config/cli.py
```

Esse comando instalará a biblioteca [inquirer](https://python-inquirer.readthedocs.io/en/latest/) e executará o arquivo cli.py localizado na pasta config. A partir desse momento, você terá acesso a um processo interativo que irá guiá-lo durante a configuração do projeto.

### Comece a desenvolver! 🚀

Comece a desenvolver sua aplicação utilizando esse projeto base como ponto de partida!
Após a conclusão do processo de criação, o projeto já estará estruturado com os diretórios de *backend* e *frontend* separados. Cada um desses projetos é baseado nos *frameworks* que você escolheu, e eles contêm um arquivo README com instruções detalhadas sobre como configurar e executar cada um deles. Portanto, é altamente recomendado que você leia os respectivos READMEs para obter as informações necessárias. Não deixe essa etapa de lado, pois os READMEs fornecerão orientações valiosas para começar a trabalhar nos projetos de *backend* e *frontend* com facilidade.

*Que a força esteja com vocês! 🪐💪✨*

---
## Contribuindo 🤝

Se você tiver sugestões de melhorias ou encontrar problemas no projeto base, sinta-se à vontade para abrir uma issue neste repositório. Sua contribuição é valiosa para aprimorarmos continuamente o projeto.

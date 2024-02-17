class UserModel{
    id: string;
    nome: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    login: string;
    senha: string;
    logado: boolean;
  
    constructor(data: {
      nome: string;
      cpf: string;
      dataNascimento: string;
      email: string;
      login: string;
      senha: string;
      logado: boolean;
    }) {
      this.id = data.login;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.dataNascimento = data.dataNascimento;
      this.email = data.email;
      this.login = data.login;
      this.senha = data.senha;
      this.logado = data.logado;
    }

    preencherCampo(campo: string, valor: string) {
        switch (campo) {
            case 'nome':
                this.nome = valor;
            case 'cpf':
                this.cpf = valor;
            case 'data de nascimento':
                this.dataNascimento = valor;
            case 'e-mail':
                this.email = valor;
            case 'login':
                this.login = valor;
            case 'senha':
                this.senha = valor;
            case 'logado':
                this.logado = valor === 'true' ? true : false;
        }

    }
}
  
export default UserModel;
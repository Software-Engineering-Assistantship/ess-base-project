import fs from 'fs';

class UserModel{
    nome: string;
    cpf: string;
    dataNascimento: Date;
    email: string;
    login: string;
    senha: string;
  
    constructor(data: {
      nome: string;
      cpf: string;
      dataNascimento: Date;
      email: string;
      login: string;
      senha: string;
    }) {
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.dataNascimento = data.dataNascimento;
      this.email = data.email;
      this.login = data.login;
      this.senha = data.senha;
    }

    preencherCampo(campo: string, valor: string) {
        switch (campo) {
            case 'nome':
                this.nome = valor;
            case 'cpf':
                this.cpf = valor;
            case 'data de nascimento':
                this.dataNascimento = new Date(valor);
            case 'e-mail':
                this.email = valor;
            case 'login':
                this.login = valor;
            case 'senha':
                this.senha = valor;
        }
    }
}
  
export default UserModel;
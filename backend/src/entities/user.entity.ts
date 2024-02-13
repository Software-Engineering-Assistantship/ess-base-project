export default class UserEntity {
    id: string;
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
      this.id = data.login;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.dataNascimento = data.dataNascimento;
      this.email = data.email;
      this.login = data.login;
      this.senha = data.senha;
    }
  }
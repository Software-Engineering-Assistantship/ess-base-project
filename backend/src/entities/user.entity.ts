export default class UserEntity {
    id: string;
    nome: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    login: string;
    senha: string;
    logado: boolean;
  
    constructor(data: {
      id: string;
      nome: string;
      cpf: string;
      dataNascimento: string;
      email: string;
      login: string;
      senha: string;
      logado: boolean;
    }) {
      this.id = data.id;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.dataNascimento = data.dataNascimento;
      this.email = data.email;
      this.login = data.login;
      this.senha = data.senha;
      this.logado = data.logado;
    }
  }
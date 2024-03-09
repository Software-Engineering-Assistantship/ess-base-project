export default class LoginEntity {
    login: string;
    senha: string;
  
    constructor(data: {
      login: string;
      senha: string;
    }) {
      this.login = data.login;
      this.senha = data.senha;
    }
  }
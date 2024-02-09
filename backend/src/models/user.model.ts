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

    verificarLoginExistente(campo: string, valor: string): boolean {
        let usuariosJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));
    
        switch (campo) {
            case 'nome':
                if (usuariosJson && Array.isArray(usuariosJson)) {
                    for (const usuario of usuariosJson) {
                        if (usuario.nome === valor) {
                            return true;
                        }
                    }
                }
                break;
            case 'cpf':
                if (usuariosJson && Array.isArray(usuariosJson)) {
                    for (const usuario of usuariosJson) {
                        if (usuario.cpf === valor) {
                            return true;
                        }
                    }
                }
                break;
            case 'data de nascimento':
                if (usuariosJson && Array.isArray(usuariosJson)) {
                    for (const usuario of usuariosJson) {
                        if (usuario.dataNascimento === valor) {
                            return true;
                        }
                    }
                }
                break;
            case 'e-mail':
                if (usuariosJson && Array.isArray(usuariosJson)) {
                    for (const usuario of usuariosJson) {
                        if (usuario.email === valor) {
                            return true;
                        }
                    }
                }
                break;
            case 'login':
                if (usuariosJson && Array.isArray(usuariosJson)) {
                    for (const usuario of usuariosJson) {
                        if (usuario.login === valor) {
                            return true;
                        }
                    }
                }
                break;
            case 'senha':
                if (usuariosJson && Array.isArray(usuariosJson)) {
                    for (const usuario of usuariosJson) {
                        if (usuario.senha === valor) {
                            return true;
                        }
                    }
                }
                break;
         }

        return false;
    }
}
  
export default UserModel;
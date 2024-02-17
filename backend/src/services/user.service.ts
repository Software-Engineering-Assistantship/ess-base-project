import UserEntity from '../entities/user.entity'; // Importa a entidade de usuário
import UserModel from '../models/user.model'; // Importa o modelo de usuário
import UserRepository from '../repositories/user.repository'; // Importa o repositório de usuário
import fs from 'fs'; // Importa o módulo de manipulação de arquivos

class UserServiceMessageCode {
    public static readonly user_not_found = 'user_not_found';
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(data: UserEntity): Promise<UserModel> {
    const userEntity = await this.userRepository.createUser(data);
    const userModel = new UserModel(userEntity);

    return userModel;
  }

  public salvarUsuario(userData: UserModel){
    fs.writeFileSync('./src/models/users.json', JSON.stringify(userData));
  }

  private verificarExistente(campo: string, valor: string): boolean {
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
                    if (usuario.cpf == valor) {
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

  private verificaBranco(): boolean {
    let usuariosJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    switch (usuariosJson) {
        case 'nome':
            if (usuariosJson && Array.isArray(usuariosJson)) {
                for (const usuario of usuariosJson) {
                    if (usuario.nome === '') {
                        return true;
                    }
                }
            }
            break;
        case 'cpf':
            if (usuariosJson && Array.isArray(usuariosJson)) {
                for (const usuario of usuariosJson) {
                    if (usuario.cpf == '') {
                        return true;
                    }
                }
            }
            break;
        case 'data de nascimento':
            if (usuariosJson && Array.isArray(usuariosJson)) {
                for (const usuario of usuariosJson) {
                    if (usuario.dataNascimento === '') {
                        return true;
                    }
                }
            }
            break;
        case 'e-mail':
            if (usuariosJson && Array.isArray(usuariosJson)) {
                for (const usuario of usuariosJson) {
                    if (usuario.email === '') {
                        return true;
                    }
                }
            }
            break;
        case 'login':
            if (usuariosJson && Array.isArray(usuariosJson)) {
                for (const usuario of usuariosJson) {
                    if (usuario.login === '') {
                        return true;
                    }
                }
            }
            break;
        case 'senha':
            if (usuariosJson && Array.isArray(usuariosJson)) {
                for (const usuario of usuariosJson) {
                    if (usuario.senha === '') {
                        return true;
                    }
                }
            }
            break;
     }

    return false;
  }

  private verificaSenha(): boolean {  
    let usuariosJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    if (usuariosJson && Array.isArray(usuariosJson)) {
        for (const usuario of usuariosJson) {
            let nom = usuario.nome.replace(/\s/g, '');
            if (usuario.senha === nom) {
                return true;
            }

            nom = nom.toLowerCase();
            if (usuario.senha === nom) {
                return true;
            }

            nom = nom.toUpperCase();
            if (usuario.senha === nom) {
                return true;
            }

            const {dataAbreviada} = this.formatData(usuario.dataNascimento);
            const {dataCompleta} = this.formatData(usuario.dataNascimento);

            if (usuario.senha === dataAbreviada) {
                return true;
            }

            if (usuario.senha === dataCompleta) {
                return true;
            }
        }
    }

    return false;
  }

  private formatData(data: Date): {dataCompleta: string, dataAbreviada: string}{
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const anoCompleto = String(data.getFullYear());
    const ano = anoCompleto.slice(-2);

    const dataCompleta = dia + mes + anoCompleto;
    const dataAbreviada = dia + mes + ano;

    return {dataCompleta, dataAbreviada};
  }
  
  public validaSenha(userData: UserModel): boolean {
    const verifSenha = this.verificaSenha();
    const verifBranco = this.verificaBranco();
    if(!this.verificarExistente('login', userData.login)  || !this.verificarExistente('cpf', userData.cpf) || !this.verificarExistente('email', userData.email) || !verifBranco || !verifSenha) {
        return false;
    }
  
    return true;
  }
}

export default UserService;
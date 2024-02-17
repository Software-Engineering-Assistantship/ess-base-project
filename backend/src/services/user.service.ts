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

    public async getUserById(id: string): Promise<UserModel | null> {
        const userEntity = await this.userRepository.getUserById(id);
        const userModel = userEntity ? new UserModel(userEntity) : null;

        return userModel;
    }

    public verificarExistente(campo: string, valor: string): boolean {
        let usuarioJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        switch (campo) {
            case 'nome':
                if (usuarioJson.nome === valor) {
                    return true;
                }
                break;
            case 'cpf':
                if (usuarioJson.cpf === valor) {
                    return true;
                }
                break;
            case 'data de nascimento':
                if (usuarioJson.dataNascimento === valor) {
                    return true;
                }
                break;
            case 'e-mail':
                if (usuarioJson.email === valor) {
                    return true;
                }
                break;
            case 'login':
                if (usuarioJson.login === valor) {
                    return true;
                }
                break;
            case 'senha':
                if (usuarioJson.senha === valor) {
                    return true;
                }
                break;
        }

        return false;
    }

    private verificaBranco(): boolean {
        let usuarioJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        switch (usuarioJson) {
            case 'nome':
                if (usuarioJson.nome === '') {
                    return true;
                }
                break;
            case 'cpf':
                if (usuarioJson.cpf == '') {
                    return true;
                }
                break;
            case 'data de nascimento':
                if (usuarioJson.dataNascimento === '') {
                    return true;
                }
                break;
            case 'e-mail':
                if (usuarioJson.email === '') {
                    return true;
                }
                break;
            case 'login':
                if (usuarioJson.login === '') {
                    return true;
                }
                break;
            case 'senha':
                if (usuarioJson.senha === '') {
                    return true;
                }
                break;
        }

        return false;
    }

    private verificaSenha(): boolean {  
        let usuarioJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        let nom = usuarioJson.nome.replace(/\s/g, '');
        if (usuarioJson.senha === nom) {
            return true;
        }

        nom = nom.toLowerCase();
        if (usuarioJson.senha === nom) {
            return true;
        }

        nom = nom.toUpperCase();
        if (usuarioJson.senha === nom) {
            return true;
        }

        const {dataAbreviada} = this.formatData(usuarioJson.dataNascimento);
        const {dataCompleta} = this.formatData(usuarioJson.dataNascimento);

        if (usuarioJson.senha === dataAbreviada) {
            return true;
        }

        if (usuarioJson.senha === dataCompleta) {
            return true;
        }

        return false;
    }

    private formatData(data: string): {dataCompleta: string, dataAbreviada: string}{
        const dataCompleta = data.replace(/\//g, '');
        const dataAbreviada = dataCompleta.substring(0, 6) + dataCompleta.substring(8);
    
        return {dataCompleta, dataAbreviada};
    }
    
    public validaSenha(userData: UserModel): {result: boolean, erro: string} {
        const verifSenha = this.verificaSenha();
        const verifBranco = this.verificaBranco();
        const verificaLogin = this.verificarExistente('login', userData.login);
        const verificaCpf = this.verificarExistente('cpf', userData.cpf);
        const verificaEmail = this.verificarExistente('email', userData.email);
        if(!verificaLogin && !verificaCpf && !verificaEmail && !verifBranco && !verifSenha) {
            const result = false;
            const erro = '';
            return {result, erro};
        }
    
        const result = true;
        if(verificaLogin) {
            const erro = 'O Login já está sendo utilizado';
            return {result, erro};
        }
        if(verificaCpf) {
            const erro = 'O CPF já está sendo utilizado';
            return {result, erro};
        }
        if(verificaEmail) {
            const erro = 'O Email já está sendo utilizado';
            return {result, erro};
        }
        if(verifBranco) {
            const erro = 'O cadastro não pode ser concluído devido à falta de preenchimento de campo obrigatório';
            return {result, erro};
        }
        if(verifSenha) {
            const erro = 'O cadastro não pode ser concluído devido à senha inválida';
            return {result, erro};
        }

        return {result, erro: ''};
    }

    public async updateUserById(id: string, data: UserEntity): Promise<UserModel | null> {
        const userEntity = await this.userRepository.updateUserById(id, data);
        const userModel = userEntity ? new UserModel(userEntity) : null;

        return userModel;
    }

    public verificaURL(page: string, userId: string | null): string {
        switch (page) {
            case 'Cadastro de Usuário':
                page = '/api/users/cadastro';
                break;
            case 'Atualização do Cadastro':
                page = '/api/users/${userId}';
                break;
            default:
                page = '/api/users';
                break;
        } 
        return page;
    }

    public async trocarStatus(id: string){
        let usuariosJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        for (let i = 0; i < usuariosJson.length; i++) {
            if (usuariosJson[i].login === id) {
                usuariosJson[i].logado = !usuariosJson[i].logado;
                fs.writeFileSync('./src/models/users.json', JSON.stringify(usuariosJson));
            }
        }
    }

    public senhaCorresponde(login: string, senha: string): boolean {
        let usuariosJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        if (usuariosJson && Array.isArray(usuariosJson)) {
            for (const usuario of usuariosJson) {
                if (usuario.login === login) {
                    if (usuario.senha === senha) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

}
    
export default UserService;
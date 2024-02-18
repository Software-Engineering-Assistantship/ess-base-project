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

    private verificaBranco(userData: UserModel ): boolean {
        

        if (userData.nome === '') {
            return true;
        }
        if (userData.cpf === '') {
            return true;
        }
        if (userData.login === '') {
            return true;
        }
        if (userData.senha === '') {
            return true;
        }
        if (userData.email === '') {
            return true;
        }
    
        return false;
    }

    private verificaSenha(userData: UserModel): boolean {  

        let nom = userData.nome.replace(/\s/g, '');
        if (userData.senha === nom) {
            return true;
        }

        nom = nom.toLowerCase();
        if (userData.senha === nom) {
            return true;
        }

        nom = nom.toUpperCase();
        if (userData.senha === nom) {
            return true;
        }

        const {dataAbreviada} = this.formatData(userData.dataNascimento);
        const {dataCompleta} = this.formatData(userData.dataNascimento);

        if (userData.senha === dataAbreviada) {
            return true;
        }

        if (userData.senha === dataCompleta) {
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
        const verifSenha = this.verificaSenha(userData);
        const verifBranco = this.verificaBranco(userData);
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
            const erro = 'A operação não pode ser concluída devido à falta de preenchimento de campo obrigatório';
            return {result, erro};
        }
        if(verifSenha) {
            const erro = 'A operação não pode ser concluída devido à senha inválida';
            return {result, erro};
        }

        return {result, erro: ''};
    }

    public validaUpdate(userData: UserModel): {result: boolean, erro: string} {
        const verifBranco = this.verificaBranco(userData);
        const verifSenha = this.verificaSenha(userData);
        if(!verifBranco && !verifSenha) {
            const result = false;
            const erro = '';
            return {result, erro};
        }
    
        const result = true;
        if(verifBranco) {
            const erro = 'A operação não pode ser concluída devido à falta de preenchimento de campo obrigatório';
            return {result, erro};
        }
        if(verifSenha) {
            const erro = 'A operação não pode ser concluída devido à senha inválida';
            return {result, erro};
        }

        return {result, erro: ''};
    }

    public atualizaUsuario(userData: UserModel){
        let usuarioJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        usuarioJson.id = userData.login;
        usuarioJson.login = userData.login;
        usuarioJson.nome = userData.nome
        usuarioJson.senha = userData.senha;
        usuarioJson.dataNascimento = usuarioJson.dataNascimento;
        usuarioJson.email = usuarioJson.email;
        usuarioJson.cpf = usuarioJson.cpf;
        usuarioJson.logado = usuarioJson.logado;

        fs.writeFileSync('./src/models/users.json', JSON.stringify(usuarioJson));
    }

    public atualizaCampo(campo: string, valor: string){
        let usuarioJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        switch (campo) {
            case 'nome':
                usuarioJson.nome = valor;
                break;
            case 'cpf':
                usuarioJson.cpf = valor;
                break;
            case 'data de nascimento':
                usuarioJson.dataNascimento = valor;
                break;
            case 'e-mail':
                usuarioJson.email = valor;
                break;
            case 'login':
                usuarioJson.login = valor;
                break;
            case 'senha':
                usuarioJson.senha = valor;
                break;
            case 'logado':
                usuarioJson.logado = valor === 'true' ? true : false;
                break;
        }

        fs.writeFileSync('./src/models/users.json', JSON.stringify(usuarioJson));
    }

    public async updateUser(data: UserEntity): Promise<UserModel | null>{
        const userEntity = await this.userRepository.updateUser(data);
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
        let usuarioJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        if (usuarioJson.login === id) {
            usuarioJson.logado = !usuarioJson.logado;
            fs.writeFileSync('./src/models/users.json', JSON.stringify(usuarioJson));
        }
        
    }

    public senhaCorresponde(login: string, senha: string): boolean {
        let usuarioJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

        
        if (usuarioJson.login === login) {
            if (usuarioJson.senha === senha) {
                return true;
            }
        }
           
        return false;
    }

}
    
export default UserService;
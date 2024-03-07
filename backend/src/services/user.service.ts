import UserEntity from '../entities/user.entity'; // Importa a entidade de usuário
import UserModel from '../models/user.model'; // Importa o modelo de usuário
import UserRepository from '../repositories/user.repository'; // Importa o repositório de usuário
import fs from 'fs'; // Importa o módulo de manipulação de arquivos
const userJsonPath = './src/models/users.json'; // Caminho para o arquivo JSON de usuários

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async createUser(data: UserEntity): Promise<UserModel> {
        try {
            const userEntity = await this.userRepository.createUser(data);
            const userModel = new UserModel(userEntity);
            return userModel;
        } catch (error) {
            throw error;
        }
    }

    public async getUserById(id: string): Promise<UserModel | null> {
        const userEntity = await this.userRepository.getUserById(id);
        const userModel = userEntity ? new UserModel(userEntity) : null;

        return userModel;
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const userEntities = await this.userRepository.getAllUsers();
        const userModel: UserModel[] = [];
        
        let i = 0;
        const totalUsers = userEntities.length;
    
        for (i = 0; i < totalUsers; i++) {
            const user = new UserModel(userEntities[i]);
            userModel[i] = user;
        }
    
        return userModel;
    }

    public async updateUser(id: string, data: UserEntity): Promise<UserModel | null> {
        try{
            const userEntity = await this.userRepository.updateUser(id, data);
            const userModel = userEntity ? new UserModel(userEntity) : null;
        
            return userModel;
        } catch (error) {
            throw error;
        }
    }

    public async getUserByLogin(login: string): Promise<UserEntity | null> {
        const userEntity = await this.userRepository.getUserByLogin(login);

        return userEntity;
    }

    public async getUserByCpf(cpf: string): Promise<UserEntity | null> {
        const userEntity = await this.userRepository.getUserByCpf(cpf);

        return userEntity;
    }

    public async getUserByEmail(email: string): Promise<UserEntity | null> {
        const userEntity = await this.userRepository.getUserByEmail(email);

        return userEntity;
    }

    public verificarExistente(campo: string, valor: string): boolean {
        let usuarioJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

        switch (campo) {
            case 'nome':
                for(let i = 0; i < usuarioJson.length; i++)
                    if (usuarioJson[i].nome === valor) {
                        return true;
                    }
                break;
            case 'cpf':
                for(let i = 0; i < usuarioJson.length; i++)
                    if (usuarioJson[i].cpf === valor) {
                        return true;
                    }
                break;
            case 'data de nascimento':
                for(let i = 0; i < usuarioJson.length; i++)
                    if (usuarioJson[i].dataNascimento === valor) {
                        return true;
                    }
                break;
            case 'email':
                for(let i = 0; i < usuarioJson.length; i++)
                    if (usuarioJson[i].email === valor) {
                        return true;
                    }
                break;
            case 'login':
                for(let i = 0; i < usuarioJson.length; i++)
                    if (usuarioJson[i].login === valor) {
                        return true;
                    }
                break;
            case 'senha':
                for(let i = 0; i < usuarioJson.length; i++)
                    if (usuarioJson[i].senha === valor) {
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
    
    public async validaUsuario(userData: UserModel): Promise<{result: boolean, erro: string}> {
        const verifSenha = this.verificaSenha(userData);
        const verifBranco = this.verificaBranco(userData);
        const verificaLogin = await this.getUserByLogin(userData.login);
        const verificaCpf = await this.getUserByCpf(userData.cpf);
        const verificaEmail = await this.getUserByEmail(userData.email);
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

    public async trocarStatus(id: string){
        const user = await this.getUserById(id);

        if (user) {
            user.logado = !user.logado;
            await this.updateUser(id, user);
        }
    }

    public senhaCorresponde(login: string, senha: string): boolean {
        let usuarioJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

        for (let i = 0; i < usuarioJson.length; i++){
            if (usuarioJson[i].login === login) {
                if (usuarioJson[i].senha === senha) {
                    return true;
                }
            }
        }  

        return false;
    }

    public getUserId(login: string): string {
        let usuarioJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

        for (let i = 0; i < usuarioJson.length; i++){
            if (usuarioJson[i].login === login) {
                return usuarioJson[i].id;
            }
        }

        return '';
    }
}

export default UserService;
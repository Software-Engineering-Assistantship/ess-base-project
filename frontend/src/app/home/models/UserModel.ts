export default class UserModel {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    login: string;
    senha: string;
    logado: boolean;

    constructor (data: UserModel){
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
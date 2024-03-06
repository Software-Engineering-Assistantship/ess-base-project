class UserModel{
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

    preencherCampo(campo: string, valor: string) {
        switch (campo) {
            case 'nome':
                this.nome = valor;
                break;
            case 'cpf':
                this.cpf = valor;
                break;
            case 'data de nascimento':
                this.dataNascimento = valor;
                break;
            case 'e-mail':
                this.email = valor;
                break;
            case 'login':
                this.login = valor;
                break;
            case 'senha':
                this.senha = valor;
                break;
            case 'logado':
                this.logado = valor === 'true' ? true : false;
                break;
        }
    }
}
  
export default UserModel;
import UserEntity from '../entities/user.entity'; // Importa a entidade de usuário
import BaseRepository from './base.repository'; // Importa o repositório base
import fs from 'fs'; // Importa o módulo de manipulação de arquivos
const userJsonPath = './src/models/users.json'; // Caminho para o arquivo JSON de usuários

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('users'); // Define o prefixo para usuários
  }
  
  public async createUser(data: UserEntity): Promise<UserEntity> {
    if(!fs.existsSync(userJsonPath)){
      fs.writeFileSync(userJsonPath, '[]');
    }
    const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

    if (usersJson.find((user: UserEntity) => user.login === data.login)) {
      throw new Error('Login já cadastrado');
    }

    if (usersJson.find((user: UserEntity) => user.cpf === data.cpf)) {
      throw new Error('CPF já cadastrado');
    }

    if (usersJson.find((user: UserEntity) => user.email === data.email)) {
      throw new Error('Email já cadastrado');
    }

    const dataNasc = data.dataNascimento.replace(/\//g, '');
    const nomeForm = data.nome.replace(/\s/g, '').toLowerCase();
    const senhaMin = data.senha.toLowerCase();

    if(senhaMin.includes(dataNasc)){
      throw new Error('Senha com data');
    }

    if(senhaMin.includes(nomeForm)){
      throw new Error('Senha com nome');
    }

    const addData = [...usersJson, data];

    fs.writeFileSync(userJsonPath, JSON.stringify(addData));

    return data;
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

      for (let index = 0; index < usersJson.length; index++) {
        if (usersJson[index].id === id) {
          return usersJson[index];
        }
      }
    
    return null;
  }

  public async updateUser(id: string, data: UserEntity): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

    if (usersJson.find((user: UserEntity) => user.login === data.login && user.id != id)) {
      throw new Error('Login já cadastrado');
    }

    let nomeForm = '';
    let senhaMin = '';

    if(data.nome != ''){
      nomeForm = data.nome.replace(/\s/g, '').toLowerCase();
      senhaMin = data.senha.toLowerCase();

      if(senhaMin.includes(nomeForm)){
        throw new Error('Senha com nome');
      }
    }
    
    // Encontra o usuário no array pelo ID
    const userToUpdate = usersJson.find((user: UserEntity) => user.id === id);

    nomeForm = userToUpdate.nome.replace(/\s/g, '').toLowerCase();
    if(data.nome != '' && senhaMin.includes(nomeForm)){
      throw new Error('Senha com nome');
    }

    const dataNasc = userToUpdate.dataNascimento.replace(/\//g, '');
    if(senhaMin.includes(dataNasc)){
      throw new Error('Senha com data');
    }

    if(data.nome == ''){
      data.nome = userToUpdate.nome;
    }
    if(data.login == ''){
      data.login = userToUpdate.login;
    }

    if (userToUpdate) {
        // Atualiza apenas os campos relevantes do usuário
        userToUpdate.nome = data.nome ?? userToUpdate.nome;
        userToUpdate.login = data.login ?? userToUpdate.login;
        userToUpdate.senha = data.senha ?? userToUpdate.senha;
        userToUpdate.logado = data.logado ?? userToUpdate.logado;

        // Escreve a lista atualizada de usuários de volta no arquivo JSON
        fs.writeFileSync(userJsonPath, JSON.stringify(usersJson));

        return userToUpdate; // Retorna o usuário atualizado
    }

    return null; // Usuário não encontrado
}

  public async getAllUsers(): Promise<UserEntity[]> {
    const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

    return usersJson;
  }

  public async getUserByLogin(login: string): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

    for (let index = 0; index < usersJson.length; index++) {
      if (usersJson[index].login === login) {
        return usersJson[index];
      }
    }

    return null;
  }

  public async getUserByCpf(cpf: string): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

    for (let index = 0; index < usersJson.length; index++) {
      if (usersJson[index].cpf === cpf) {
        return usersJson[index];
      }
    }

    return null;
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

    for (let index = 0; index < usersJson.length; index++) {
      if (usersJson[index].email === email) {
        return usersJson[index];
      }
    }

    return null;
  }
}

export default UserRepository;
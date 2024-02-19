import UserEntity from '../entities/user.entity'; // Importa a entidade de usuário
import BaseRepository from './base.repository'; // Importa o repositório base
import fs from 'fs'; // Importa o módulo de manipulação de arquivos

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('users'); // Define o prefixo para usuários
  }
  
  public async createUser(data: UserEntity): Promise<UserEntity> {
    if(!fs.existsSync('./src/models/users.json')){
      fs.writeFileSync('./src/models/users.json', '[]');
    }
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    const addData = [...usersJson, data];

    fs.writeFileSync('./src/models/users.json', JSON.stringify(addData));

    return data;
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

      for (let index = 0; index < usersJson.length; index++) {
        if (usersJson[index].login === id) {
          return usersJson[index];
        }
      }
    
    return null;
  }

  public async updateUser(id: string, data: UserEntity): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    // Encontra o usuário no array pelo ID
    const userToUpdate = usersJson.find((user: UserEntity) => user.id === id);

    if (userToUpdate) {
        // Atualiza apenas os campos relevantes do usuário
        userToUpdate.nome = data.nome ?? userToUpdate.nome;
        userToUpdate.login = data.login ?? userToUpdate.login;
        userToUpdate.senha = data.senha ?? userToUpdate.senha;
        userToUpdate.logado = data.logado ?? userToUpdate.logado;

        // Escreve a lista atualizada de usuários de volta no arquivo JSON
        fs.writeFileSync('./src/models/users.json', JSON.stringify(usersJson));

        return userToUpdate; // Retorna o usuário atualizado
    }

    return null; // Usuário não encontrado
}

  public async getAllUsers(): Promise<UserEntity[]> {
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    return usersJson;
  }
}

export default UserRepository;
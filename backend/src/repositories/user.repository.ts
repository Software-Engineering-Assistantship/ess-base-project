import UserEntity from '../entities/user.entity'; // Importa a entidade de usuário
import BaseRepository from './base.repository'; // Importa o repositório base
import fs from 'fs'; // Importa o módulo de manipulação de arquivos

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('users'); // Define o prefixo para usuários
  }
  
  public async createUser(data: UserEntity): Promise<UserEntity> {
    fs.writeFileSync('./src/models/users.json', JSON.stringify(data));

    return data;
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

      if (usersJson.login === id) {
        
        return usersJson;
      }
    

    return null;
  }

  public async updateUser(data: UserEntity): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    if (usersJson.login === data.login) {
      fs.writeFileSync('./src/models/users.json', JSON.stringify(data));

      return data;
    }

    return null;
  }
}

export default UserRepository;
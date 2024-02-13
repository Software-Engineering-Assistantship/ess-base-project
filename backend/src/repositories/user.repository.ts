import UserEntity from '../entities/user.entity'; // Importa a entidade de usuário
import BaseRepository from './base.repository'; // Importa o repositório base

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('users'); // Define o prefixo para usuários
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.findAll();
  }

  public async getUserById(id: string): Promise<UserEntity | null> {
    return await this.findOne((user) => user.id === id);
  }

  public async createUser(data: UserEntity): Promise<UserEntity> {
    return await this.add(data);
  }

  public async updateUserById(id: string, data: UserEntity): Promise<UserEntity | null> {
    return await this.update((user) => user.id === id, data);
  }

}

export default UserRepository;
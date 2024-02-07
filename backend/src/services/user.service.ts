import UserEntity from '../entities/user.entity'; // Importa a entidade de usuário
import UserModel from '../models/user.model'; // Importa o modelo de usuário
import UserRepository from '../repositories/user.repository'; // Importa o repositório de usuário
import { HttpNotFoundError } from '../utils/errors/http.error'; // Importa o erro de não encontrado HTTP

class UserServiceMessageCode {
    public static readonly user_not_found = 'user_not_found';
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

public async getAllUsers(): Promise<UserModel[]> {
    const usersEntity = await this.userRepository.getAllUsers();

    const usersModel = usersEntity.map((user: UserEntity) => new UserModel(user));

    return usersModel;
}

  public async getUserById(id: string): Promise<UserModel> {
    const userEntity = await this.userRepository.getUserById(id);

    if (!userEntity) {
      throw new HttpNotFoundError({
        msg: 'User not found',
        msgCode: UserServiceMessageCode.user_not_found,
      });
    }

    const userModel = new UserModel(userEntity);

    return userModel;
  }

  public async createUser(data: UserEntity): Promise<UserModel> {
    const userEntity = await this.userRepository.createUser(data);
    const userModel = new UserModel(userEntity);

    return userModel;
  }

  public async updateUserById(id: string, data: UserEntity): Promise<UserModel> {
    const userEntity = await this.userRepository.updateUserById(id, data);

    if (!userEntity) {
      throw new HttpNotFoundError({
        msg: 'User not found',
        msgCode: UserServiceMessageCode.user_not_found,
      });
    }

    const userModel = new UserModel(userEntity);

    return userModel;
  }


}

export default UserService;
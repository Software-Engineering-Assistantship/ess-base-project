import LoginEntity from '../entities/login.entity';
import UserEntity from '../entities/user.entity';
import LoginRepository from '../repositories/login.repository';

class LoginService{
    private loginRepository: LoginRepository;

    constructor(loginRepository: LoginRepository){
        this.loginRepository = loginRepository;
    }

    public async login(data: LoginEntity): Promise<UserEntity> {
        try {
            const userEntity = await this.loginRepository.login(data);
            return userEntity;
        } catch (error) {
            throw error;
        }
    }

    public async logout(id: string): Promise<UserEntity> {
        try {
            const userEntity = await this.loginRepository.logout(id);
            return userEntity;
        } catch (error) {
            throw error;
        }
    }
}

export default LoginService;
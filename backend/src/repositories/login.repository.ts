import UserEntity from "../entities/user.entity";
import LoginEntity from "../entities/login.entity";
import BaseRepository from "./base.repository";
import fs from "fs";
const userJsonPath = "./src/models/users.json";

class LoginRepository extends BaseRepository<UserEntity> {
    constructor(){
        super('login');
    }

    public async login(data: LoginEntity): Promise<UserEntity> {
        const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

        const user = usersJson.find((user: UserEntity) => user.login === data.login);

        if(usersJson.find((user: UserEntity) => user.login === data.login)){
            if(usersJson.find((user: UserEntity) => user.login === data.login && user.senha === data.senha)){
                user.logado = true;
                return user;
            }else{
                throw new Error('Senha incorreta');
            }
        }
        throw new Error('Usuário não encontrado');
    }

    public async logout(id: string): Promise<UserEntity> {
        const usersJson = JSON.parse(fs.readFileSync(userJsonPath, 'utf-8'));

        const user = usersJson.find((user: UserEntity) => user.id === id);

        if(user){
            user.logado = false;
            return user;
        }

        throw new Error('Impossivel deslogar usuário');
    }
}

export default LoginRepository;
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

  public async updateUserById(id: string, updatedData: UserEntity): Promise<UserEntity | null> {
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    for (let i = 0; i < usersJson.length; i++) {
      if (usersJson[i].login === id) {
        usersJson[i].nome = updatedData.nome;
        usersJson[i].login = updatedData.login;
        usersJson[i].senha = updatedData.senha;
        usersJson[i].id = usersJson[i].login
        usersJson[i].cpf = usersJson[i].cpf
        usersJson[i].dataNascimento = usersJson[i].dataNascimento
        usersJson[i].email = usersJson[i].email
        usersJson[i].logado = usersJson[i].logado

        // Salva as alterações no arquivo JSON
        fs.writeFileSync('./src/models/users.json', JSON.stringify(usersJson));

        // Retorna o usuário atualizado
        return usersJson[i];
      }
    }

    // Se o usuário não for encontrado, retorna null
    return null;
  }

  public async trocarStatus(id: string){
    const usersJson = JSON.parse(fs.readFileSync('./src/models/users.json', 'utf-8'));

    for (let i = 0; i < usersJson.length; i++) {
      if (usersJson[i].login === id) {
        // Atualiza o campo logado
        usersJson[i].logado = !usersJson[i].logado;

        // Salva as alterações no arquivo JSON
        fs.writeFileSync('./src/models/users.json', JSON.stringify(usersJson));
      }
    }
  }
}

export default UserRepository;
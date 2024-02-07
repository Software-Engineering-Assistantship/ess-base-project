import { Router, Request, Response } from 'express';
import UserService from '../services/user.service'; // Importe o serviço de usuário
import { SuccessResult } from '../utils/result'; // Importe o objeto de resultado de sucesso, se necessário
import UserEntity from '../entities/user.entity';

class UserController {
  private prefix: string = '/users';
  public router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
    this.initRoutes();
  }

  private initRoutes() {
    // Rota para criar um novo usuário
    this.router.post(`${this.prefix}/cadastro`, (req: Request, res: Response) =>
        this.createUser(req, res)
    );
 }

 /*   // Rota para obter todos os usuários
    this.router.get(`${this.prefix}`, (req: Request, res: Response) =>
        this.getAllUsers(req, res)
    );

    // Rota para obter um usuário pelo ID
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.getUserById(req, res)
    );

    // Rota para atualizar um usuário pelo ID
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateUserById(req, res)
    );
  }*/

  private async createUser(req: Request, res: Response) {
    // Extrai os dados do corpo da requisição
    const user = await this.userService.createUser(new UserEntity(req.body));

    // Retorna o novo usuário criado
    return new SuccessResult({
        msg: 'O cadastro foi realizado com sucesso',
        data: user,
    }).handle(res);
  }

  private async getAllUsers(req: Request, res: Response) {
    try {
      // Chama o serviço para obter todos os usuários
      const users = await this.userService.getAllUsers();

      // Retorna a lista de usuários
      return new SuccessResult({
        msg: 'Lista de usuários',
        data: users,
      }).handle(res);
    } catch (error) {
      // Trata erros de forma adequada
      console.error('Erro ao obter usuários:', error);
      return res.status(500).json({ error: 'Erro ao obter usuários' });
    }
  }

  private async getUserById(req: Request, res: Response) {
    try {
      // Extrai o ID do parâmetro da requisição
      const userId = req.params.id;

      // Chama o serviço para obter o usuário pelo ID
      const user = await this.userService.getUserById(userId);

      // Verifica se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Retorna o usuário encontrado
      return new SuccessResult({
        msg: 'Usuário encontrado',
        data: user,
      }).handle(res);
    } catch (error) {
      // Trata erros de forma adequada
      console.error('Erro ao obter usuário pelo ID:', error);
      return res.status(500).json({ error: 'Erro ao obter usuário pelo ID' });
    }
  }

  private async updateUserById(req: Request, res: Response) {
    try {
      // Extrai o ID do parâmetro da requisição
      const userId = req.params.id;
      // Extrai os dados atualizados do corpo da requisição
      const updatedData = req.body;

      // Chama o serviço para atualizar o usuário pelo ID
      const updatedUser = await this.userService.updateUserById(userId, updatedData);

      // Retorna o usuário atualizado
      return new SuccessResult({
        msg: 'Usuário atualizado com sucesso',
        data: updatedUser,
      }).handle(res);
    } catch (error) {
      // Trata erros de forma adequada
      console.error('Erro ao atualizar usuário pelo ID:', error);
      return res.status(500).json({ error: 'Erro ao atualizar usuário pelo ID' });
    }
  }
}

export default UserController;
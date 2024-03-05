import { Router, Request, Response } from 'express';
import UserService from '../services/user.service'; // Importe o serviço de usuário
import { SuccessResult } from '../utils/result'; // Importe o objeto de resultado de sucesso, se necessário
import UserEntity from '../entities/user.entity';
import { get } from 'http';

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

    //Cria um GET para pagina de Cadastro 
    this.router.get(`${this.prefix}/cadastro`, (req: Request, res: Response) =>
      res.status(200).send({
        text: 'Cadastro de Usuário',
        msg: 'Cadastro de Usuário'
      })
    );

    // Rota para buscar um usuário pelo ID
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.getUserById(req, res)
    );

    // Rota para atualizar um usuário
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.updateUser(req, res)
    );

    // Rota para pegar todos os usuários
    this.router.get(`${this.prefix}`, (req: Request, res: Response) =>
        this.getAllUsers(req, res)
    );
 }

  private async createUser(req: Request, res: Response) {
    // Extrai os dados do corpo da requisição
    const user = await this.userService.createUser(new UserEntity(req.body));

    // Retorna o novo usuário criado
    return new SuccessResult({
        msg: 'O cadastro foi realizado com sucesso',
        data: user
    }).handle(res);
  }

  private async updateUser(req: Request, res: Response) {
    // Extrai o ID do usuário da URL
    const userId = req.params.id;
    
    // Extrai os dados do corpo da requisição
    const user = await this.userService.updateUser(userId, new UserEntity(req.body));
    
    if (!user) {
      // Retorna um erro caso o usuário não seja encontrado
      return new SuccessResult({
        msg: 'Usuário não encontrado',
        data: null,
        msgCode: 'user_not_found',
        code: 404
      }).handle(res);
    }
    // Retorna o usuário atualizado
    return new SuccessResult({
        msg: 'As Informações foram atualizadas com sucesso',
        data: user,
    }).handle(res);
  }

  private async getUserById(req: Request, res: Response) {
    // Extrai o ID da requisição
    const id = req.params.id;

    // Busca o usuário pelo ID
    const user = await this.userService.getUserById(id);

    if (!user) {
      // Retorna um erro caso o usuário não seja encontrado
      return new SuccessResult({
          msg: 'Usuário não encontrado',
          data: null,
          msgCode: 'user_not_found',
          code: 404
      }).handle(res);
    }

    // Retorna o usuário encontrado
    return new SuccessResult({
        msg: 'Usuário encontrado',
        data: user,
    }).handle(res);
  }

  private async getAllUsers(req: Request, res: Response) {
    // Busca todos os usuários
    const users = await this.userService.getAllUsers();

    if (!users) {
        // Retorna um erro caso não haja usuários
        return new SuccessResult({
            msg: 'Nenhum usuário encontrado',
            data: null,
            msgCode: 'users_not_found',
            code: 404
        }).handle(res);
    } 
    // Retorna todos os usuários
    return new SuccessResult({
        msg: 'Lista de todos os usuários',
        data: users,
    }).handle(res);
  }
}

export default UserController;
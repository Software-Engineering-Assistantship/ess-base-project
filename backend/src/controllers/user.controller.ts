import { Router, Request, Response } from 'express';
import UserService from '../services/user.service'; // Importe o serviço de usuário
import { SuccessResult } from '../utils/result'; // Importe o objeto de resultado de sucesso, se necessário
import UserEntity from '../entities/user.entity';
import CarrinhoService from '../services/carrinho.service';
import fs from 'fs'; // Importe o módulo de manipulação de arquivos
import CarrinhoEntity from '../entities/carrinho.entity';
const userJsonPath = './src/models/users.json'; // Caminho para o arquivo JSON de usuários

class UserController {
  private prefix: string = '/users';
  public router: Router;
  private userService: UserService;
  private carrinhoService: CarrinhoService;
  private idCount: number = 1;

  constructor(router: Router, userService: UserService, carrinhoService: CarrinhoService) {
    this.router = router;
    this.userService = userService;
    this.carrinhoService = carrinhoService;
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
    this.router.get(this.prefix, (req: Request, res: Response) =>
        this.getAllUsers(req, res)
    );
 }

  private async createUser(req: Request, res: Response) {
    try{
      //Gerar ID
      req.body.id = this.generateId();

      // Extrai os dados do corpo da requisição
      const user = await this.userService.createUser(new UserEntity(req.body));
      const carrinho = await this.carrinhoService.createCarrinho(new CarrinhoEntity({
        id: req.body.id,
        id_produtos: [],
        quantidade: 0,
        data_criacao: new Date(),
        data_atualizacao: new Date()
      }));

      // Retorna o novo usuário e carrinho criados
      return new SuccessResult({
        msg: 'O cadastro foi realizado com sucesso',
        data: user
      }).handle(res);
    }catch(error){
      if ((error as Error).message == 'Login já cadastrado'){
        return res.status(422).json({
          msgCode: 'login_already_exists',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }else if ((error as Error).message == 'CPF já cadastrado'){
        return res.status(422).json({
          msgCode: 'cpf_already_exists',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }else if ((error as Error).message == 'Email já cadastrado'){
        return res.status(422).json({
          msgCode: 'email_already_exists',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }else if ((error as Error).message == 'Senha com data'){
        return res.status(422).json({
          msgCode: 'password_with_date',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }else if ((error as Error).message == 'Senha com nome'){
        return res.status(422).json({
          msgCode: 'password_with_name',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }
    }
  }
  

  private async updateUser(req: Request, res: Response) {
    try{
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
    }catch(error){
      if ((error as Error).message == 'Login já cadastrado'){
        return res.status(422).json({
          msgCode: 'login_already_exists',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }else if ((error as Error).message == 'Senha com data'){
        return res.status(422).json({
          msgCode: 'password_with_date',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }else if ((error as Error).message == 'Senha com nome'){
        return res.status(422).json({
          msgCode: 'password_with_name',
          msg: 'Erro ao cadastrar usuário' + error
        });
      }
    }
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

  private generateId(): string {
    let id: string;
    try{
      const data = fs.readFileSync(userJsonPath, 'utf-8');
      const lastId = JSON.parse(data).pop();
      id = lastId.id.toString();
    }catch(err){
      id = '0';
    }
    
    this.idCount = parseInt(id) + 1;
    return this.idCount.toString();
  }
}

export default UserController;
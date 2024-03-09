import { Router, Request, Response } from 'express';
import LoginService from '../services/login.service';
import { SuccessResult } from '../utils/result';
import LoginEntity from '../entities/login.entity';

class LoginController {
    private prefix: string = '/login';
    public router: Router;
    private loginService: LoginService;

    constructor(router: Router, loginService: LoginService) {
        this.router = router;
        this.loginService = loginService;
        this.initRoutes();
    }

    private initRoutes() {
        // Rota para login de um usuário
        this.router.post(`${this.prefix}`, (req: Request, res: Response) =>
            this.loginUser(req, res)
        );

        // Rota para logout de um usuário
        this.router.post(`${this.prefix}/logout/:id`, (req: Request, res: Response) =>
            this.logoutUser(req, res)
        );
    }

    private async loginUser(req: Request, res: Response) {
        try{
            const login = await this.loginService.login(new LoginEntity(req.body));
            
            return new SuccessResult({
                msg: 'Usuário logado com sucesso',
                data: login
              }).handle(res);
        }catch (error) {
            if ((error as Error).message === 'Usuário não encontrado') {
                res.status(400).send({
                    text: 'Usuário não encontrado',
                    msg: 'Usuário não encontrado',
                    msgCode: 'user_not_found',
                });
            }else if ((error as Error).message === 'Senha incorreta') {
                res.status(400).send({
                    text: 'Senha incorreta',
                    msg: 'Senha incorreta',
                    msgCode: 'wrong_password',
                });
            }
        }
    }

    private async logoutUser(req: Request, res: Response) {
        try{
            const id = req.params.id;

            const logout = await this.loginService.logout(id);
            
            return new SuccessResult({
                msg: 'Usuário deslogado com sucesso',
                data: logout
              }).handle(res);
        }catch (error) {
            if ((error as Error).message === 'Impossivel deslogar usuário') {
                res.status(400).send({
                    text: 'Impossivel deslogar usuário',
                    msg: 'Impossivel deslogar usuário',
                    msgCode: 'impossible-logout',
                });
            }
        }
    }
}

export default LoginController;
import { Router, Request, Response } from 'express';
import CarrinhoService from '../services/carrinho.service';
import { FailureResult, SuccessResult } from '../utils/result';
import CarrinhoEntity from '../entities/carrinho.entity';
import { HttpBadRequestError } from '../utils/errors/http.error';

class CarrinhoController {
    private prefix: string = '/cart';
    public router: Router;
    private carrinhoService: CarrinhoService;

    constructor(router: Router, carrinhoService: CarrinhoService) {
        this.router = router;
        this.carrinhoService = carrinhoService;
        this.initRoutes();
    }

    private initRoutes() {
        // cria um carrinho
        this.router.post(`${this.prefix}/create`, (req: Request, res: Response) =>
            this.createCarrinho(req, res)
        );

        // busca um carrinho pelo id
        this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
            this.getCarrinhoById(req, res)
        );

        // adiciona um produto ao carrinho
        this.router.post(`${this.prefix}/addProduct`, (req: Request, res: Response) =>
            this.addProductToCarrinho(req, res)
        );
    }

    private async createCarrinho(req: Request, res: Response) {
        const cart = await this.carrinhoService.createCarrinho(new CarrinhoEntity(req.body));

        return new SuccessResult({
            msg: 'Carrinho criado com sucesso',
            data: cart
        }).handle(res);
    }

    private async getCarrinhoById(req: Request, res: Response) {
        // extrair ID da request
        const id = req.params.id;

        // buscar carrinho pelo ID
        const cart = await this.carrinhoService.getCarrinhoById(id);

        // retornar carrinho

        if (cart) {
            return new SuccessResult({
                msg: 'Carrinho encontrado',
                data: cart
            }).handle(res);
        }
        return new FailureResult
        ({msg: 'Carrinho não encontrado',
        msgCode: 'not_found',
        code: 404                
        }).handle(res);
    }

    private async addProductToCarrinho(req: Request, res: Response) {

        const id_carrinho: string = req.body.id_carrinho;
        const id_product: string = req.body.id_product;

        if (!id_carrinho || !id_product) {
            return new FailureResult({
                msg: 'Dados inválidos',
                msgCode: 'invalid_data',
                code: 400
            }).handle(res);
        }

        const carrinho = await this.carrinhoService.addProductToCarrinho(id_carrinho, id_product);

        return new SuccessResult({
            msg: 'Produto adicionado ao carrinho',
            data: carrinho,
        }).handle(res);
    }
}

export default CarrinhoController;
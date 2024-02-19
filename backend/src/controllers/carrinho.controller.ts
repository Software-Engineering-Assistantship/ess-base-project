import { Router, Request, Response } from 'express';
import CarrinhoService from '../services/carrinho.service';
import { SuccessResult } from '../utils/result';
import CarrinhoEntity from '../entities/carrinho.entity';
import { HttpBadRequestError } from '../utils/errors/http.error';

class CarrinhoController {
    private prefix: string = '/carrinho';
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

    private async addProductToCarrinho(req: Request, res: Response) {

        const id_carrinho: string = req.body.id_carrinho;
        const id_product: string = req.body.id_product;
        const valor: number = req.body.valor;

        if (!id_carrinho || !id_product || !valor) {
            return new HttpBadRequestError({msg: 'Dados inválidos',});
        }

        const carrinho = await this.carrinhoService.addProductToCarrinho(id_carrinho, id_product, valor);

        return new SuccessResult({
            msg: 'Produto adicionado ao carrinho',
            data: carrinho,
        }).handle(res);
    }

    private async createCarrinho(req: Request, res: Response) {
        const carrinho = await this.carrinhoService.createCarrinho(new CarrinhoEntity(req.body));

        return new SuccessResult({
            msg: 'Carrinho criado com sucesso',
            data: carrinho
        }).handle(res);
    }

    private async getCarrinhoById(req: Request, res: Response) {
        try {
            const id: string = req.params.id;

            if (!id) {
                return new HttpBadRequestError({msg: 'id não informado',});
            }

            const carrinho = await this.carrinhoService.getCarrinhoById(id);

            if (!carrinho) {
                return new HttpBadRequestError({msg: 'Carrinho não encontrado',});
            }

            return new SuccessResult({
                msg: 'Carrinho encontrado',
                data: carrinho,
            }).handle(res);
        }
        catch (e) {
            console.error('Erro ao obter o carrinho: ', e);
            return new HttpBadRequestError({msg: 'Erro ao obter o carrinho',});
        }
    }
}

export default CarrinhoController;
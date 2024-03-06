import {Router, Request, Response} from 'express';
import ProductService from '../services/product.service';
import {SuccessResult} from '../utils/result';
import ProductEntity from '../entities/product.entity';

class ProductController {
    private prefix: string = '/products';
    public router: Router;
    private productService: ProductService;
    
    constructor(router: Router, productService: ProductService) {
        this.router = router;
        this.productService = productService;
        this.initRoutes();
    }
    
    private initRoutes() {
        // Rota para criar um novo produto
        this.router.post(`${this.prefix}/create`, (req: Request, res: Response) =>
            this.createProduct(req, res)
        );

        this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
        this.getProductById(req, res)
        );
    }
    
    private async createProduct(req: Request, res: Response) {
        // Extrai os dados do corpo da requisição
        const product = await this.productService.createProduct(new ProductEntity(req.body));
    
        // Retorna o novo produto criado
        return new SuccessResult({
        msg: 'O cadastro foi realizado com sucesso',
        data: product,
        }).handle(res);
    }

    private async getProductById(req: Request, res: Response) {
        const id = req.params.id;
        const product = await this.productService.getProductById(id);

        if (!product) {
            return new SuccessResult({
            msg: 'produto não encontrado',
            data: null,
            msgCode: 'product_not_found',
            code: 404
            }).handle(res);
        }

        else {
            return new SuccessResult({
                msg: 'produto encontrado',
                data: product
            }).handle(res);
        }
    }
}

export default ProductController;
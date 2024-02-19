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
        this.router.post(`${this.prefix}/cadastro`, (req: Request, res: Response) =>
            this.createProduct(req, res)
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
}

export default ProductController;
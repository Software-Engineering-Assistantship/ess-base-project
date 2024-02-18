import ProductEntity from "../entities/product.entity";
import ProductModel from "../models/product.model";
import { ProductRepository } from "../repositories/product.repository";
import { HttpNotFoundError } from "../utils/errors/http.error";

class ProductServiceMessageCode {
    public static readonly product_not_found = 'product_not_found';
}

class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
    }

    public async getAllProducts(): Promise<ProductModel[]> {
        const productsEntity = await this.productRepository.getAllProducts();

        const productsModel = productsEntity.map((product: ProductEntity) => new ProductModel(product.nome, product.id, product.quantidade, product.preco, product.Local));

        return productsModel;
    }

    public async getProductById(id: string): Promise<ProductModel> {
        const productEntity = await this.productRepository.getProductById(id);

        if (!productEntity) {
            throw new HttpNotFoundError({
                msg: 'Product not found',
                msgCode: ProductServiceMessageCode.product_not_found,
            });
        }

        const productModel = new ProductModel(productEntity.nome, productEntity.id, productEntity.quantidade, productEntity.preco, productEntity.Local);

        return productModel;
    }

    public async createProduct(data: ProductEntity): Promise<ProductModel> {
        const productEntity = await this.productRepository.createProduct(data);
        const productModel = new ProductModel(productEntity.nome, productEntity.id, productEntity.quantidade, productEntity.preco, productEntity.Local);

        return productModel;
    }
}



export default ProductService;
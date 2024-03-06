import ProductEntity from "../entities/product.entity";
import ProductModel from "../models/product.model";
import ProductRepository from "../repositories/product.repository";
import { HttpNotFoundError } from "../utils/errors/http.error";

class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
    }

    public async createProduct(data: ProductEntity): Promise<ProductModel> {
        const productEntity = await this.productRepository.createProduct(data);
        const productModel = new ProductModel(productEntity);

        return productModel;
    }

    public async getProductById(id: string): Promise<ProductModel | null> {
        const productEntity = await this.productRepository.getProductById(id);
        const productModel = productEntity ? new ProductModel(productEntity) : null;
        return productModel;
    }

    public async getAllProducts(): Promise<ProductModel[]> {
        const productsEntity = await this.productRepository.getAllProducts();
        
        const productsModel = productsEntity.map((product: ProductEntity) => new ProductModel(product));

        return productsModel;
    }

    public static verificaURL(page: string, id: string): string {
        if (page === 'produto') {
            return `/produto/${id}`;
        } else {
            return `/carrinho/${id}`;
        }
    }
}



export default ProductService;
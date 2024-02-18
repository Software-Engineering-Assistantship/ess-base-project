import ProductEntity from "../entities/product.entity";
import ProductModel from "../models/product.model";
import { ProductRepository } from "../repositories/product.repository";

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

        const productsModel = productsEntity.map((product: ProductEntity) => new ProductModel(product.props));

        return productsModel;
    }
}



export default ProductService;
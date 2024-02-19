import ProductEntity from "../entities/product.entity";
import BaseRepository from "./base.repository";

export default class ProductRepository extends BaseRepository<ProductEntity> {
  constructor() {
    super('products');
  }

  public async getAllProducts(): Promise<ProductEntity[]> {
    return await this.findAll();
  }

  public async getProductById(id: string): Promise<ProductEntity | null> {
    return await this.findOne((product) => product.id === id);
  }

  public async createProduct(data: ProductEntity): Promise<ProductEntity> {
    return await this.add(data); 
  }

  public async updateProductById(id: string, data: ProductEntity): Promise<ProductEntity | null> {
    return await this.update((product) => product.id === id, data);
  }
}
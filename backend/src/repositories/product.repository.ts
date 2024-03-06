import ProductEntity from "../entities/product.entity";
import BaseRepository from "./base.repository";
import fs from 'fs';
const productJsonPath = './src/models/products.json';

export default class ProductRepository extends BaseRepository<ProductEntity> {
  constructor() {
    super('products');
  }

  public async createProduct(data: ProductEntity): Promise<ProductEntity> {
    if(!fs.existsSync(productJsonPath)){
      fs.writeFileSync(productJsonPath, '[]');
    }
    const usersJson = JSON.parse(fs.readFileSync(productJsonPath, 'utf-8'));

    const addData = [...usersJson, data];

    fs.writeFileSync(productJsonPath, JSON.stringify(addData));

    return data;
  }

  public async getAllProducts(): Promise<ProductEntity[]> {
    return await this.findAll();
  }

  public async getProductById(id: string): Promise<ProductEntity | null> {
    const productJson = JSON.parse(fs.readFileSync(productJsonPath, 'utf-8'));

      for (let index = 0; index < productJson.length; index++) {
        if (productJson[index].id === id) {
          return productJson[index];
        }
      }
    
    return null;
  }
}
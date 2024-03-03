import CarrinhoEntity from "../entities/carrinho.entity";
import BaseRepository from "./base.repository";
import fs from 'fs';

const carrinhoJsonPath = './src/models/carrinho.json'

export default class CarrinhoRepository extends BaseRepository<CarrinhoEntity> {
    constructor() {
        super('carrinho');
    }

    public async createCarrinho(data: CarrinhoEntity): Promise<CarrinhoEntity> {
        if (!fs.existsSync(carrinhoJsonPath)) {
            fs.writeFileSync(carrinhoJsonPath, '[]');
        } 

        const carrinhoJson = JSON.parse(fs.readFileSync(carrinhoJsonPath, 'utf-8'));

        const addData = [...carrinhoJson, data];

        fs.writeFileSync(carrinhoJsonPath, JSON.stringify(addData));
        return data;
    }

    public async getCarrinhoById(id: string): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));

        if (carrinhoJson.id === id) {
            return carrinhoJson;
        }

        return null;
    }

    public async updateCarrinho(data: CarrinhoEntity): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync(carrinhoJsonPath, 'utf-8'));

        if (carrinhoJson.id === data.id) {
            fs.writeFileSync(carrinhoJsonPath, JSON.stringify(data));

            return data;
        }

        return null;
    }

    public async addProductToCarrinho(id_carrinho : string, id_product: string, valor: number): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));

        if (carrinhoJson.id === id_carrinho) {
            if(!carrinhoJson.produtos) {
                carrinhoJson.produtos = [];
            }
            carrinhoJson.produtos.push({
                id: id_product,
                valor: valor
            });
            fs.writeFileSync('./src/models/carrinho.json', JSON.stringify(carrinhoJson));

            return carrinhoJson;
        }

        return null;
    }
}